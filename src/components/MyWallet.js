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

  componentDidMount() {
    if (this.wallet) {
      this.getBalance()
      this.getBalanceInterval = setInterval(this.getBalance, GET_BALANCE_INTERVAL)
    }
  }

  getBalance = () => {
    onit.klay.getBalance(this.wallet.address)
      .then(balance => {
        if (balance !== this.state.balance) {
          ui.showToast({ msg: '잔액이 업데이트 되었습니다.' })
          this.setState({ balance })
        }
      })
  }

  togglePrivateKey = () => {
    this.setState({ hidePrivateKey: !this.state.hidePrivateKey })
  }

  // handleDownload = () => {
  //   // const { privateKey, password } = this.props
  //   const keystore = onit.klay.accounts.encrypt(privateKey, password)
  //   this.downloadKeystore(keystore)
  // }

  // downloadKeystore = (keystore) => {
  //   const date = new Date()
  //   const fileName = `keystore-${keystore.address}-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.json`
  //   download(jsonFormat(keystore), fileName)
  //   ui.showToast({ msg: '키스토어 파일이 저장되었습니다!' })
  // }

  componentWillUnmount() {
    if (this.getBalanceInterval) {
      clearInterval(this.getBalanceInterval)
    }
  }

  render() {
    const { balance, hidePrivateKey } = this.state

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
          <Button
            title="View Transaction List"
            className="MyWallet__viewTransationListButton"
            gray
          />
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
