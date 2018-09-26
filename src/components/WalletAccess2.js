import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import classNames from 'classnames'

import { onit } from 'klaytn/onit'
import TabRadio from 'components/TabRadio'
import AccessByKeystore from 'components/AccessByKeystore'
import AccessByPrivatekey from 'components/AccessByPrivatekey'

import './WalletAccess2.scss'

type Props = {

}

const radioItems = [{
  title: 'Private Key',
  value: 'privatekey',
  attribute: 'accessMethod',
}, {
  title: 'Keystore File',
  value: 'keystore',
  attribute: 'accessMethod',
}]

class WalletAccess2 extends Component<Props> {
  state = {
    accessMethod: 'privatekey' // default value : privatekey
  }

  componentWillMount() {
    // Clear whole wallet instances when we get in '/access' route.
    if (sessionStorage.getItem('prv') && onit.klay.accounts.wallet[0]) {
      browserHistory.push(`/access/${onit.klay.accounts.wallet[0].address}`)
      return
    }
    onit.klay.accounts.wallet.clear()
  }

  handleAccess = (accessMethod) => () => {
    this.setState({
      accessMethod,
    })
  }

  accessTo = (address) => {
    const { location } = this.props
    if (!location.query.next) {
      browserHistory.push(`/access/${address}`)
    } else {
      browserHistory.push(`/${location.query.next}/${address}`)
    }
  }

  render() {
    const { accessMethod } = this.state
    return (
      <div className="WalletAccess2">
        <div className="WalletAccess2__inner">
          <header className="WalletAccess2__title">Access Existing Wallet</header>
          <p className="WalletAccess2__description">
            You can access your wallet either with your private key or <br />
            with your keystore file and keystore file password.
          </p>
          <TabRadio
            className="WalletAcess2__tabRadio"
            tabs={radioItems}
            selectedValue={accessMethod}
            onClick={this.handleAccess}
          />
          <AccessSide
            accessMethod={accessMethod}
            accessTo={this.accessTo}
          />
        </div>
      </div>
    )
  }
}

const AccessSide = ({ accessMethod, accessTo }) => (
  <div className="WalletAccess2__accessSide">
    {accessMethod && (accessMethod === 'keystore')
      ? <AccessByKeystore accessTo={accessTo} />
      : <AccessByPrivatekey accessTo={accessTo} />
    }
  </div>
)

export default WalletAccess2
