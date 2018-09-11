import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { keyBy } from 'lodash'

import { onit } from 'klaytn/onit'
import MyToken from 'components/MyToken'
import TransferForm from 'components/TransferForm'
import TransferTotal from 'components/TransferTotal'
import TransferComplete from 'components/TransferComplete'

type Props = {

}

import './WalletTransfer2.scss'

const KLAY_GAS_PRICE = '25'

class WalletTransfer2 extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      view: 'form',
      isLoading: false,
      to: '',
      value: '',
      type: 'KLAY', // default type is KLAY.
      fee: 0,
      isValidTransaction: false,
      myTokenBalances: [],
      gas: '21000',
      gasPrice: KLAY_GAS_PRICE,
      totalGasFee: 21000 * KLAY_GAS_PRICE,
    },
    this.wallet = onit.klay.accounts.wallet[0]
  }

  componentWillMount() {
    if (!onit.klay.accounts || !onit.klay.accounts.wallet[0]) {
      ui.showToast({ msg: '로그인을 해주세요.' })
      new Audio('/sound/error.ogg').play()
      browserHistory.replace('/access?next=transfer')
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSelect = (tokenSymbol) => {
    this.setState({
      type: tokenSymbol,
    })
  }

  handleEdit = () => {
    this.setState({ valueBeforeEdit: this.state.totalGasFee })
  }

  handleEditCancel = () => {
    this.setState({ totalGasFee: this.state.valueBeforeEdit })
  }

  transfer = () => {
    const { type } = this.state
    switch (type) {
      case 'KLAY':
        this.transferCoin()
        break
      default:
        this.transferToken()
    }
  }

  transferCoin = () => {
    const { to, value, gas } = this.state
    console.log(value)
    onit.klay.sendTransaction({
      from: this.wallet.address,
      to,
      value: onit.utils.toWei(value, 'ether'),
      gas: gas || '21000',
      chainId: '2018',
    })
      .on('transactionHash', () => {
        ui.showToast({ msg: `${to} 주소로 ${value} klay를 전송합니다.` })
      })
      .on('receipt', () => {
        new Audio('/sound/transfer.mp3').play()
        ui.showToast({ msg: `${to} 주소로 ${value} klay 전송에 성공했습니다.` })
        this.getTokenBalances()
        this.changeView('complete')()
      })
      .on('error', (e) => {
        console.log(e)
        new Audio('/sound/error.ogg').play()
        ui.showToast({ msg: '오류가 발생했습니다.' })
      })
  }

  transferToken = () => {
    const { to, value, type } = this.state
    const { tokenByName } = this.props
    const contractInstance = new onit.klay.Contract(krc20ABI, tokenByName[type].contractAddress)
    contractInstance.accounts = onit.klay.accounts
    contractInstance.methods.transfer(to, value).send({
      from: this.wallet.address,
      gas: '300000',
      gasPrice: '25',
    })
    .on('transactionHash', () => {
      ui.showToast({ msg: `${to} 주소로 ${value} ${type}를 전송합니다.` })
    })
    .on('receipt', () => {
      new Audio('/sound/transfer.mp3').play()
      ui.showToast({ msg: `${to} 주소로 ${value} ${type} 전송에 성공했습니다.` })
      this.getTokenBalances()
    })
    .on('error', (e) => {
      console.log(e)
      new Audio('/sound/error.ogg').play()
      ui.showToast({ msg: '오류가 발생했습니다.' })
    })
  }

  renderTransferView = () => {
    const {
      view,
      to,
      value,
      type, // default type is KLAY.
      fee,
      gas,
      gasPrice,
      totalGasFee,
    } = this.state

    console.log(this.state.myTokenBalances, 'this.state.myTokenBalances')

    const from = this.wallet && this.wallet.address

    switch (view) {
      case 'form':
        return (
          <div className="WalletTransfer2">
            <MyToken
              className="WalletTransfer2__myToken"
              title="Step1. Select Tokens"
              selectedTokenName={type}
              handleSelect={this.handleSelect}
              selectable
            />
            <TransferForm
              className="WalletTransfer2__transferForm"
              from={from}
              to={to}
              value={value}
              type={type}
              changeView={this.changeView}
              onChange={this.handleChange}
              totalGasFee={totalGasFee}
              gasPrice={gasPrice}
              handleEdit={this.handleEdit}
              handleEditCancel={this.handleEditCancel}
            />
          </div>
        )
      case 'total':
        return (
          <TransferTotal
            transfer={this.transfer}
            from={from}
            to={to}
            value={value}
            type={type}
            fee={fee}
            gas={gas}
            changeView={this.changeView}
          />
        )
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

const mapStateToProps = (state) => {

  const tokenByName = state.token.tokenList.reduce((acc, cur) => {
    acc[cur.name] = cur
    return acc
  }, {})

  return {
    tokenList: state.token.tokenList,
    tokenByName,
  }
}

export default connect(mapStateToProps)(WalletTransfer2)
