import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import BN from 'bignumber.js'
import Lottie from 'react-lottie'

import { onit } from 'klaytn/onit'
import Input from 'components/Input'
import Button from 'components/Button'
import APIEntry from 'constants/network'

import * as animationData from '../../static/images/data.json'

import './KlayFaucet.scss'

type Props = {

}

const FaucetHowItWork = () => (
  <div className="KlayFaucet__howItWork">
    <header className="KlayFaucet__howItWorkTitle">
      How does this work?
    </header>
    <p className="KlayFaucet__howItWorkDescription">
      This Ether faucet is running on the Rinkeby network.
      To prevent malicious actors from exhausting all available funds or
      accumulating enough Ether to mount long running spam attacks, requests are
       tied to common 3rd party social network accounts.
    </p>
  </div>
)

class KlayFaucet extends Component<Props> {
  constructor() {
    super()
    this.wallet = onit.klay.accounts.wallet[0]
    this.state = {
      balance: '0',
      isRunning: false,
      isRunningComplete: true,
    }
  }

  componentDidMount() {
    if (!this.wallet) {
      browserHistory.push('/access?next=faucet')
      return
    }

    this.updateBalance()
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
    fetch(`${APIEntry}/example/faucet/?address=${this.wallet && this.wallet.address}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'API_VERSION': '1.0',
      },
    })
      .then(res => res.json())
      .then(({ code }) => {
        if (code == 0) {
          this.updateBalance()
        }
        return code
      })
      .catch(err => console.log(`Error catch: ${err}`))
      .finally(() => {
        this.setState({ isRunning: false })
      })
  }

  render() {
    const { balance, isRunning, isRunningComplete } = this.state

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
        <div className="KlayFaucet__content">
          <Lottie options={defaultOptions}
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
              }
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
            label="KLAY Balance"
            className="KlayFaucet__input KlayFaucet__balance"
            unit="KLAY"
          />
          <Button
            title="Run Faucet"
            className="KlayFaucet__button"
            onClick={this.runFacuet}
          />
        </div>
        <FaucetHowItWork />
      </div>
    )
  }
}

export default KlayFaucet
