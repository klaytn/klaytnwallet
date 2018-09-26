import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import jsonFormat from 'json-format'
import { onit } from 'klaytn/onit'

import Input from 'components/Input'
import InputCopy from 'components/InputCopy'
import MyToken from 'components/MyToken'
import Button from 'components/Button'
import ui from 'utils/ui'
import { RegisterTokenButton } from 'components/RegisterToken'
import { download } from 'utils/misc'
import { KLAYTN_SCOPE_URL } from 'constants/url'

import './MyWallet.scss'

const GET_BALANCE_INTERVAL = 3000

type Props = {

}

class MyWallet extends Component<Props> {
  constructor() {
    super()
    this.wallet = onit.klay.accounts.wallet[0]
    this.getBalanceInterval = null
  }

  state = {
    balance: null,
    hidePrivateKey: true,
  }

  componentWillMount() {
    if (!onit.klay.accounts.wallet[0]) {
      browserHistory.replace('/access')
    }
  }

  togglePrivateKey = () => {
    this.setState({ hidePrivateKey: !this.state.hidePrivateKey })
  }

  render() {
    const { hidePrivateKey } = this.state

    return !!this.wallet && (
      <div className="MyWallet">
        <div className="MyWallet__info">
          <header className="MyWallet__title">My Wallet Info</header>
          <hr className="MyWallet__hr" />
          <InputCopy
            className="MyWallet__Input"
            label="Wallet Address"
            name="address"
            value={this.wallet.address}
          />
          <InputCopy
            className="MyWallet__Input"
            name="privateKey"
            label="Private Key"
            onLabelClick={this.togglePrivateKey}
            labelClassName="MyWallet__hideButton"
            type={hidePrivateKey ? 'password' : 'text'}
            value={this.wallet.privateKey}
            readOnly
            autoFocus
            eye
          />
          <p className="MyWallet__transactionListTitle">Transaction List</p>
          <p className="MyWallet__transactionListDescription">
            All transactions transferred or received<br />
            via the currently active wallet can be viewed at Klaytnscope.
          </p>
          <a
            target="self"
            href={`${KLAYTN_SCOPE_URL}/transactions?account=${this.wallet.address}`}
          >
            <Button
              title="View Transaction List"
              className="MyWallet__viewTransationListButton"
              gray
            />
          </a>
        </div>
        <div className="MyWallet__token">
          <MyToken title="Balance" />
          <RegisterTokenButton />
        </div>
      </div>
    )
  }
}

export default MyWallet
