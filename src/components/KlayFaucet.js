import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import BN from 'bignumber.js'

import { onit } from 'klaytn/onit'
import Input from 'components/Input'
import Button from 'components/Button'

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
    }
  }

  componentDidMount() {
    if (!this.wallet) {
      browserHistory.push('/access?next=faucet')
      return
    }

    onit.klay.getBalance(this.wallet.address)
      .then((balance) => {
        this.setState({
          balance,
        })
      })
  }

  render() {
    const { balance } = this.state
    return (
      <div className="KlayFaucet">
        <div className="KlayFaucet__content">
          <img className="KlayFaucet__img" src="/images/icon-faucet.svg" />
          <header className="KlayFaucet__title">KLAY Faucet</header>
          <Input
            value={this.wallet && this.wallet.address}
            readOnly
            label="Wallet Address"
            className="KlayFaucet__input"
          />
          <Input
            value={onit.utils.fromWei(balance, 'ether')}
            label="KLAY Balance"
            className="KlayFaucet__input"
          />
          <Button
            title="Run Faucet"
            className="KlayFaucet__button"
          />
        </div>
        <FaucetHowItWork />
      </div>
    )
  }
}

export default KlayFaucet
