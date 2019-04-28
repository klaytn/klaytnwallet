import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import Lottie from 'react-lottie'
import cx from 'classnames'

import { caver } from 'klaytn/caver'
import Input from 'components/Input'
import LodingButton from 'components/LodingButton'
import FaucetHowItWork from 'components/FaucetHowItWork'
import FaucetWarningModal from 'components/FaucetWarningModal'
import APIEntry from 'constants/network'


import './KlayFaucet.scss'

const FAUCET_SUCCESS = 0
const FAUCET_FAILED = 900

type Props = {

}

class KlayFaucet extends Component<Props> {
  constructor() {
    super()
    this.wallet = caver.klay.accounts.wallet[0]
    
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
    const currentBlockNumber = await caver.klay.getBlockNumber()
    this.setState({
      leftBlock: (faucetableBlockNumber > currentBlockNumber)
        ? faucetableBlockNumber - currentBlockNumber
        : 0,
    })
  }

  updateBalance = () => {
    caver.klay.getBalance(this.wallet.address)
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
      .then(({ status }) => {
        console.log('status', status)
        // if (code === FAUCET_FAILED) {
        //   this.setState({
        //     isShowingModal: true,
        //   })
        // }

        if (status === 'success') {
          this.getFaucetableBlock()
          this.updateBalance()
        }

        return status
      })
      .catch(err => console.log(`Error catch: ${err}`))
      .finally(() => {
        this.setState({ isRunning: false })
        // loding end

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
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      }
    }

    return (
      <div className="KlayFaucet">
        {isShowingModal && <FaucetWarningModal closeModal={this.closeModal} />}
        <div className="KlayFaucet__content">
          
          <div className="KlayFaucet__head">
            <div className="KlayFaucet__point">Only for Baobab</div>
            <header className="KlayFaucet__title">Test_KLAY Faucet</header>
            <p className="KlayFaucet__text">The Test_KLAY Faucet runs on Baobab Network.</p>
          </div>
          
          <Input
            value={this.wallet && this.wallet.address}
            readOnly
            label="Wallet Address"
            className="KlayFaucet__input KlayFaucet__address"
          />
          <Input
            value={caver.utils.fromWei(balance, 'ether')}
            readOnly
            label="Test_KLAY Balance"
            className="KlayFaucet__input KlayFaucet__balance"
            unit="Test_KLAY"
            leftBlock={leftBlock}
          />
          <LodingButton
            title="Run Faucet"
            className="KlayFaucet__button"
            onClick={this.runFacuet}
            disabled={isLoadingFaucetableBlock || leftBlock !== 0}
            loadingSet={isRunning}
          />
          <FaucetHowItWork leftBlock={leftBlock} />
        </div>
        
      </div>
    )
  }
}

export default KlayFaucet
