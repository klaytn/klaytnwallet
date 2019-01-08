import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import Lottie from 'react-lottie'

import { onit } from 'klaytn/onit'
import Input from 'components/Input'
import Button from 'components/Button'
import FaucetHowItWork from 'components/FaucetHowItWork'
import FaucetWarningModal from 'components/FaucetWarningModal'
import APIEntry from 'constants/network'

import * as animationData from '../../static/images/data.json'

import './KlayFaucet.scss'

const FAUCET_SUCCESS = 0
const FAUCET_FAILED = 900

type Props = {

}

class KlayFaucet extends Component<Props> {
  constructor() {
    super()
    this.wallet = onit.klay.accounts.wallet[0]
    this.state = {
      balance: '0',
      isRunning: false,
      isRunningComplete: true,
      leftBlock: null,
      isLoadingFaucetableBlock: true,
      isShowingModal: false,
    }
  }

  componentDidMount() {
    if (!this.wallet) {
      browserHistory.push('/access?next=faucet')
      return
    }

    this.getFaucetableBlock()
    this.updateBalance()
  }

  componentWillUnmount() {
    this.intervalId && clearInterval(this.intervalId)
  }

  intervalId = null

  getFaucetableBlock = () => {
    fetch(`${APIEntry}/faucet/nextblocknumber?address=${this.wallet.address}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(({ result }) => {
        if (this.intervalId) clearInterval(this.intervalId)
        // set interval for checking left block to run faucet.
        this.intervalId = setInterval(
          () => this.showLeftBlockToFaucet(result && result.nextBlockNumber),
          1000
        )
        this.setState({
          isLoadingFaucetableBlock: false,
        })
      })
  }

  showLeftBlockToFaucet = async (faucetableBlockNumber) => {
    const currentBlockNumber = await onit.klay.getBlockNumber()
    this.setState({
      leftBlock: (faucetableBlockNumber > currentBlockNumber)
        ? faucetableBlockNumber - currentBlockNumber
        : 0,
    })
  }

  updateBalance = () => {
    onit.klay.getBalance(this.wallet.address)
      .then((balance) => {
        this.setState({
          balance,
        })
      })
  }

  runFacuet = () => {
    this.setState({ isRunning: true, isRunningComplete: false })
    fetch(`${APIEntry}/faucet/?address=${this.wallet && this.wallet.address}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(({ code }) => {
        if (code === FAUCET_FAILED) {
          this.setState({
            isShowingModal: true,
          })
        }

        if (code === FAUCET_SUCCESS) {
          this.getFaucetableBlock()
          this.updateBalance()
        }

        return code
      })
      .catch(err => console.log(`Error catch: ${err}`))
      .finally(() => {
        this.setState({ isRunning: false })
      })
  }

  closeModal = () => {
    this.setState({
      isShowingModal: false,
    })
  }

  render() {
    const {
      balance,
      isRunning,
      isRunningComplete,
      leftBlock,
      isLoadingFaucetableBlock,
      isShowingModal,
    } = this.state

    const defaultOptions = {
      loop: true,
      autoplay: false,
      animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      }
    }

    return (
      <div className="KlayFaucet">
        {isShowingModal && <FaucetWarningModal closeModal={this.closeModal} />}
        <div className="KlayFaucet__content">
          <Lottie
            options={defaultOptions}
            className="KlayFaucet__img"
            height={160}
            width={160}
            isStopped={!isRunning && isRunningComplete}
            eventListeners={[{
              eventName: 'loopComplete',
              callback: () => {
                if (!isRunning) {
                  this.setState({ isRunningComplete: true })
                }
              },
            }]}
          />
          <header className="KlayFaucet__title">KLAY Faucet</header>
          <Input
            value={this.wallet && this.wallet.address}
            readOnly
            label="Wallet Address"
            className="KlayFaucet__input KlayFaucet__address"
          />
          <Input
            value={onit.utils.fromWei(balance, 'ether')}
            readOnly
            label="KLAY Balance"
            className="KlayFaucet__input KlayFaucet__balance"
            unit="KLAY"
          />
          <Button
            title="Run Faucet"
            className="KlayFaucet__button"
            onClick={this.runFacuet}
            disabled={isLoadingFaucetableBlock || leftBlock !== 0}
          />
        </div>
        <FaucetHowItWork leftBlock={leftBlock} />
      </div>
    )
  }
}

export default KlayFaucet
