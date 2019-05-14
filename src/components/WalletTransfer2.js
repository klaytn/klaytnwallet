import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { keyBy } from 'lodash'
import BN from 'bignumber.js'
import ui from 'utils/ui'

import { caver } from 'klaytn/caver'
import MyToken from 'components/MyToken'
import TransferForm from 'components/TransferForm'
import TransferTotal from 'components/TransferTotal'
import TransferComplete from 'components/TransferComplete'
import { krc20ABI } from 'utils/crypto'
import { limit6Decimal } from 'utils/misc'

type Props = {

}

import './WalletTransfer2.scss'

const KLAY_GAS_PRICE = caver.utils.toWei('25', 'shannon')
const DEFAULT_KLAY_TRANSFER_GAS = 25000
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
      type: 'Test_KLAY', // default type is KLAY.
      fee: 0,
      isValidTransaction: false,
      myTokenBalances: [],
      gas: DEFAULT_KLAY_TRANSFER_GAS,
      gasPrice: KLAY_GAS_PRICE,
      totalGasFee: caver.utils.fromWei(`${DEFAULT_KLAY_TRANSFER_GAS * KLAY_GAS_PRICE}`) || '',
      tokenColorIdx: 1,
      transactionHash: '',
    },
    this.wallet = caver.klay.accounts.wallet[0]
  }

  componentWillMount() {
    const walletAddress = window.location.pathname.indexOf('/transfer/') > -1 ? window.location.pathname.split('/transfer/')[1] : ''
    const pathname = window.location.pathname
    let klayAccounts = sessionStorage.getItem('address')
    if(caver.klay.accounts.wallet[0]){
      klayAccounts = klayAccounts ? caver.utils.humanReadableStringToHexAddress(klayAccounts) : caver.klay.accounts.wallet[0].address
    }
    if (walletAddress && klayAccounts !== walletAddress) {
      browserHistory.replace('/ErrorPage')
      return
    }
    if (!caver.klay.accounts || !caver.klay.accounts.wallet[0]) {
      browserHistory.replace('/access?next=transfer')
      return
    }
    if ('/transfer' !== pathname && pathname.indexOf('/transfer/') < 0) {   
      browserHistory.replace('/ErrorPage')
      return
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
          gas: new BN(caver.utils.toWei(limit6Decimal(e.target.value) || '0', 'ether')).dividedBy(new BN(this.state.gasPrice)).toString(),
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
    const _totalGasFee = caver.utils.fromWei(
      `${(tokenSymbol === 'Test_KLAY'
        ? DEFAULT_KLAY_TRANSFER_GAS
        : DEFAULT_TOKEN_TRANSFER_GAS
      ) * KLAY_GAS_PRICE}`)

    this.setState({
      type: tokenSymbol,
      totalGasFee: _totalGasFee,
      gas: new BN(caver.utils.toWei(_totalGasFee, 'ether')).dividedBy(new BN(this.state.gasPrice)).toString(),
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
      case 'Test_KLAY':
        this.transferCoin()
        break
      default:
        this.transferToken()
    }
    this.setState({
      to: '',
      value: '',
      totalGasFee: caver.utils.fromWei(`${DEFAULT_KLAY_TRANSFER_GAS * KLAY_GAS_PRICE}`) || '',
    })
  }
  HRADataChange = () => {
    const address = sessionStorage.getItem('address')
    if(address){
      return address
    }else if(this.wallet && this.wallet.address){
      return this.wallet.address
    }
    return ''
  }
  transferCoin = () => {
    const { to, value, gas } = this.state
    
    caver.klay.accounts.wallet.add(this.wallet.privateKey, this.HRADataChange())
    caver.klay.sendTransaction({
      type: 'VALUE_TRANSFER',
      from: this.HRADataChange(),
      to,
      value: caver.utils.toWei(value, 'ether'),
      gas: gas || DEFAULT_KLAY_TRANSFER_GAS,
    })
      .once('transactionHash', (transactionHash) => {
        this.setState({ transactionHash }, this.changeView('complete'))
      })
      // .once('receipt', () => {
      // })
      .on('error', (e) => {
        console.log(e)
        ui.showToast({ msg: 'Error occurred.' })
      })
  }

  transferToken = () => {
    const { to, value, type, gas } = this.state
    const { tokenByName } = this.props
    const contractInstance = new caver.klay.Contract(krc20ABI, tokenByName[type].contractAddress)
    const decimalProcessedTokenAmount = '0x' + new BN(value).multipliedBy(10 ** tokenByName[type].decimal).toString(16)
    contractInstance.accounts = caver.klay.accounts
    contractInstance.methods.transfer(to, decimalProcessedTokenAmount).send({
      from: this.HRADataChange(),
      gas: gas || DEFAULT_TOKEN_TRANSFER_GAS,
    })
    .once('transactionHash', (transactionHash) => {
      this.setState({ transactionHash }, this.changeView('complete'))
    })
    // .once('receipt', () => {
    // })
    .on('error', (e) => {
      console.log(e)
      ui.showToast({ msg: 'Error occurred.' })
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

    const { isTokenAddMode, myBalancesByName } = this.props

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
              from={this.HRADataChange()}
              to={to}
              value={value}
              type={type}
              myBalance={myBalancesByName
                  && myBalancesByName[type]
                  && myBalancesByName[type].balance}
              changeView={this.changeView}
              onChange={this.handleChange}
              totalGasFee={totalGasFee}
              gasPrice={gasPrice}
              handleEdit={this.handleEdit}
              handleEditCancel={this.handleEditCancel}
              gas={gas}
              tokenColorIdx={tokenColorIdx}
              isTokenAddMode={isTokenAddMode}
            />
          </div>
        )
      case 'total':
        return (
          <TransferTotal
            transfer={this.transfer}
            from={this.HRADataChange()}
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
    isTokenAddMode: state.token.isTokenAddMode,
    myBalancesByName: state.token.balancesByName,
  }
}

export default connect(mapStateToProps)(WalletTransfer2)
