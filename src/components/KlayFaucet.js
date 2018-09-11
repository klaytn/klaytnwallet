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
    this.state = {
      balance: '0',
      address: onit.klay.accounts && onit.klay.accounts.wallet[0]
    }
  }

  componentDidMount() {
    const { address } = this.state
    if (address) {
      this.updateBalance()
    }
  }

  updateBalance = () => {
    const { address } = this.state
    console.log('updating...')
    onit.klay.getBalance(address)
      .then((balance) => this.setState({ balance }))
  }

  handleAddressChange = (e) => {
    this.setState({ address: e.target.value }, () => {
      if (this.state.address.length == 42) {
        this.updateBalance()
      } else {
        this.setState({
          balance: '0',
        })
      }
    })
  }

  runFacuet = () => {
    const { address } = this.state
    if (!address) return

    fetch(`http://54.64.39.248:8989/example/faucet?address=${address}`, {
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
  }

  render() {
    const { address, balance } = this.state
    return (
      <div className="KlayFaucet">
        <div className="KlayFaucet__content">
          <img className="KlayFaucet__img" src="/images/icon-faucet.svg" />
          <header className="KlayFaucet__title">KLAY Faucet</header>
          <Input
            name="address"
            defaultValue={address}
            label="Wallet Address"
            className="KlayFaucet__input"
            onChange={this.handleAddressChange}
          />
          <Input
            value={onit.utils.fromWei(balance, 'ether')}
            label="KLAY Balance"
            className="KlayFaucet__input"
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
