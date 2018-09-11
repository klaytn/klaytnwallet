import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { keyBy } from 'lodash'
import BN from 'bignumber.js'

import { onit } from 'klaytn/onit'
import MyToken from 'components/MyToken'
import TransferForm from 'components/TransferForm'
import TransferTotal from 'components/TransferTotal'
import TransferComplete from 'components/TransferComplete'
import { krc20ABI } from 'utils/crypto'

type Props = {

}

import './WalletTransfer2.scss'

const KLAY_GAS_PRICE = onit.utils.toWei('25', 'shannon')
const DEFAULT_KLAY_TRANSFER_GAS = 21000
const DEFAULT_TOKEN_TRANSFER_GAS = 100000

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
      totalGasFee: onit.utils.fromWei(`${DEFAULT_KLAY_TRANSFER_GAS * KLAY_GAS_PRICE}`),
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
    if (e.target.name === 'totalGasFee') {
      this.setState({
        [e.target.name]: e.target.value,
        gas: new BN(onit.utils.toWei(e.target.value, 'ether')).dividedBy(new BN(this.state.gasPrice)).toString(),
      })
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      })
    }
  }

  handleSelect = (tokenSymbol) => {
    const _totalGasFee = onit.utils.fromWei(
      `${(tokenSymbol === 'KLAY'
        ? DEFAULT_KLAY_TRANSFER_GAS
        : DEFAULT_TOKEN_TRANSFER_GAS
      ) * KLAY_GAS_PRICE}`)
    console.log(_totalGasFee, '_totalGasFee')
    console.log(this.state.gasPrice, 'this.state.gasPrice')
    this.setState({
      type: tokenSymbol,
      totalGasFee: _totalGasFee,
      gas: new BN(onit.utils.toWei(_totalGasFee, 'ether')).dividedBy(new BN(this.state.gasPrice)).toString(),
    })
  }

  handleEdit = () => {
    this.setState({ valueBeforeEdit: this.state.totalGasFee })
  }

  handleEditCancel = () => {
    this.setState({ totalGasFee: this.state.valueBeforeEdit })
  }

  changeView = (view) => () => {
    this.setState({
      view,
    })
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

    onit.klay.sendTransaction({
      from: this.wallet.address,
      to,
      value: onit.utils.toWei(value, 'ether'),
      gas: gas || '21000',
      chainId: '2018',
    })
      .once('transactionHash', () => {
        ui.showToast({ msg: `${to} 주소로 ${value} klay를 전송합니다.` })
      })
      .once('receipt', () => {
        new Audio('/sound/transfer.mp3').play()
        ui.showToast({ msg: `${to} 주소로 ${value} klay 전송에 성공했습니다.` })
        this.changeView('complete')()
      })
      .on('error', (e) => {
        console.log(e)
        new Audio('/sound/error.ogg').play()
        ui.showToast({ msg: '오류가 발생했습니다.' })
      })
  }

  transferToken = () => {
    const { to, value, type, gas } = this.state
    const { tokenByName } = this.props
    const contractInstance = new onit.klay.Contract(krc20ABI, tokenByName[type].contractAddress)
    contractInstance.accounts = onit.klay.accounts
    contractInstance.methods.transfer(to, value).send({
      from: this.wallet.address,
      gas: gas || '21000',
      chainId: '2018',
    })
    .once('transactionHash', () => {
      ui.showToast({ msg: `${to} 주소로 ${value} ${type}를 전송합니다.` })
    })
    .once('receipt', () => {
      new Audio('/sound/transfer.mp3').play()
      ui.showToast({ msg: `${to} 주소로 ${value} ${type} 전송에 성공했습니다.` })
      this.changeView('complete')()
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

    const from = this.wallet && this.wallet.address

    console.log(view, 'view')

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
              gas={gas}
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
            totalGasFee={totalGasFee}
            changeView={this.changeView}
          />
        )
      case 'complete':
        return <TransferComplete changeView={this.changeView} />
    }
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