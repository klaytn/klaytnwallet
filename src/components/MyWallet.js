import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { onitSocket } from 'klaytn/onit'

import Panel from 'components/Panel'

import './MyWallet.scss'

const GET_BALANCE_INTERVAL = 3000

type Props = {

}

class MyWallet extends Component<Props> {
  constructor() {
    super()
    this.wallet = onitSocket.klay.accounts.wallet[0]
    this.getBalanceInterval = null
  }

  state = {
    balance: null,
  }

  componentWillMount() {
    if (!onitSocket.klay.accounts.wallet[0]) {
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
    onitSocket.klay.getBalance(this.wallet.address)
      .then(balance => {
        if (balance !== this.state.balance) {
          ui.showToast({ msg: '잔액이 업데이트 되었습니다.' })
          this.setState({ balance })
        }
      })
  }

  componentWillUnmount() {
    if (this.getBalanceInterval) {
      clearInterval(this.getBalanceInterval)
    }
  }

  render() {
    const { balance } = this.state

    return !!this.wallet && (
      <Panel>
        <div className="MyWallet">
          <p>address: {this.wallet.address}</p>
          <p>privatekey: {this.wallet.privateKey}</p>
          <p>balance: {balance === null ? '불러오는 중...' : balance}</p>
        </div>
      </Panel>
    )
  }
}

export default MyWallet
