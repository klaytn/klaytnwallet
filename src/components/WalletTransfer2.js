import React, { Component, Fragment } from 'react'

import MyToken from 'components/MyToken'
import TransferForm from 'components/TransferForm'
import TransferTotal from 'components/TransferTotal'
import TransferComplete from 'components/TransferComplete'

type Props = {

}

import './WalletTransfer2.scss'

class WalletTransfer2 extends Component<Props> {
  state = {
    view: 'complete', // 'form' || 'total' || 'complete'
  }

  renderTransferView = () => {
    const { view } = this.state
    switch (view) {
      case 'form':
        return (
          <div className="WalletTransfer2">
            <MyToken
              className="WalletTransfer2__myToken"
              title="Step1. Select Tokens"
            />
            <TransferForm
              className="WalletTransfer2__transferForm"
              changeView={this.changeView}
            />
          </div>
        )
      case 'total':
        return <TransferTotal />
      case 'complete':
        return <TransferComplete />
    }
  }

  changeView = (view) => () => {
    this.setState({
      view,
    })
  }

  render() {
    return this.renderTransferView()
  }
}

export default WalletTransfer2
