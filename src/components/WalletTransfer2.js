import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { keyBy } from 'lodash'
import BN from 'bignumber.js'
import ui from 'utils/ui'

import { onit } from 'klaytn/onit'
import MyToken from 'components/MyToken'
import TransferForm from 'components/TransferForm'
import TransferTotal from 'components/TransferTotal'
import TransferComplete from 'components/TransferComplete'
import { krc20ABI } from 'utils/crypto'
import { limit6Decimal } from 'utils/misc'

type Props = {

}

import './WalletTransfer2.scss'

const KLAY_GAS_PRICE = onit.utils.toWei('25', 'shannon')
const DEFAULT_KLAY_TRANSFER_GAS = 21000
const DEFAULT_TOKEN_TRANSFER_GAS = 100000
const MAX_INTEGER_LENGTH = 14

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
      totalGasFee: onit.utils.fromWei(`${DEFAULT_KLAY_TRANSFER_GAS * KLAY_GAS_PRICE}`) || '',
      tokenColorIdx: 1,
      transactionHash: '',
    },
    this.wallet = onit.klay.accounts.wallet[0]
  }

  componentWillMount() {
    if (!onit.klay.accounts || !onit.klay.accounts.wallet[0]) {
      new Audio('/static/sound/error.ogg').play()
      browserHistory.replace('/access?next=transfer')
    }
  }

  handleChange = (e) => {
    const isStartWithZero = (inputValue) => inputValue == '' && e.target.value == '0'
    const isNumberStringWithDot = /^\d+(\.)?\d{0,6}$/.test(e.target.value)

    switch (e.target.name) {
      case 'totalGasFee':
        if (e.target.value !== '' && !isNumberStringWithDot) return
        const [integer, decimal] = e.target.value && e.target.value.split('.')
        if (integer && integer.length == MAX_INTEGER_LENGTH) return
        // If input value starts with 0, should trail it with '.'
        if (isStartWithZero(this.state.totalGasFee)) {
          this.setState({ [e.target.name]: limit6Decimal(e.target.value + '.') })
          return
        }
        this.setState({
          [e.target.name]: limit6Decimal(e.target.value),
          gas: new BN(onit.utils.toWei(limit6Decimal(e.target.value) || '0', 'ether')).dividedBy(new BN(this.state.gasPrice)).toString(),
        })
        break
      case 'to':
        this.setState({
          [e.target.name]: e.target.value,
        })
        break
      case 'value':
        if (e.target.value !== '' && !isNumberStringWithDot) return
        // If input value starts with 0, should trail it with '.'
        if (isStartWithZero(this.state.value)) {
          this.setState({ [e.target.name]: limit6Decimal(e.target.value + '.') })
          return
        }
        this.setState({ [e.target.name]: limit6Decimal(e.target.value) })
        break
      default:
        this.setState({ [e.target.name]: limit6Decimal(e.target.value) })
    }
  }

  handleSelect = ({ tokenSymbol, tokenColorIdx }) => {
    const _totalGasFee = onit.utils.fromWei(
      `${(tokenSymbol === 'KLAY'
        ? DEFAULT_KLAY_TRANSFER_GAS
        : DEFAULT_TOKEN_TRANSFER_GAS
      ) * KLAY_GAS_PRICE}`)

    this.setState({
      type: tokenSymbol,
      totalGasFee: _totalGasFee,
      gas: new BN(onit.utils.toWei(_totalGasFee, 'ether')).dividedBy(new BN(this.state.gasPrice)).toString(),
      tokenColorIdx,
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
      .once('transactionHash', (transactionHash) => {
        new Audio('/static/sound/transfer.mp3').play()
        this.setState({ transactionHash }, this.changeView('complete'))
      })
      // .once('receipt', () => {
      // })
      .on('error', (e) => {
        console.log(e)
        new Audio('/static/sound/error.ogg').play()
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
      new Audio('/static/sound/transfer.mp3').play()
      this.changeView('complete')()
    })
    // .once('receipt', () => {
    // })
    .on('error', (e) => {
      console.log(e)
      new Audio('/static/sound/error.ogg').play()
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
      tokenColorIdx,
      transactionHash,
    } = this.state

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
              gas={gas}
              tokenColorIdx={tokenColorIdx}
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
        return <TransferComplete transactionHash={transactionHash} changeView={this.changeView} />
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
