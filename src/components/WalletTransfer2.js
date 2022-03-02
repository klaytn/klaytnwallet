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
import { krc20ABI, humanReadableChange } from 'utils/crypto'
import { limit6Decimal } from 'utils/misc'
import { KLAYTN_KLAY_UINT } from 'walletConstants/url'

import './WalletTransfer2.scss'

type Props = {

}

var KLAY_GAS_PRICE = caver.utils.toWei('25', 'shannon')
const DEFAULT_KLAY_TRANSFER_GAS = 100000
const DEFAULT_TOKEN_TRANSFER_GAS = 100000
const MAX_INTEGER_LENGTH = 14
const DEFAULTTYPE = KLAYTN_KLAY_UINT
class WalletTransfer2 extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      view: 'form',
      isLoading: false,
      to: '',
      value: '',
      type: KLAYTN_KLAY_UINT, // default type is KLAY.
      fee: 0,
      isValidTransaction: false,
      myTokenBalances: [],
      gas: DEFAULT_KLAY_TRANSFER_GAS,
      gasPrice: KLAY_GAS_PRICE,
      totalGasFee: caver.utils.fromWei(`${DEFAULT_KLAY_TRANSFER_GAS * KLAY_GAS_PRICE}`) || '',
      tokenColorIdx: 1,
      transactionHash: '',
      humanReadableCreated: null,
      popupShow: false,
      buttonName: 'BACK',
      errorMessage: '',
    },
    this.wallet = caver.klay.accounts.wallet[0]
  }

  componentWillMount() {
    const walletAddress = window.location.pathname.indexOf('/transfer/') > -1 ? window.location.pathname.split('/transfer/')[1] : ''
    const pathname = window.location.pathname
    let klayAccounts = sessionStorage.getItem('address')
    klayAccounts = humanReadableChange(klayAccounts)

    this.updateGasPrice()

    if (caver.klay.accounts.wallet[0]) {
      klayAccounts = klayAccounts || caver.klay.accounts.wallet[0].address
    }

    if (walletAddress && klayAccounts !== walletAddress) {
      browserHistory.replace('/ErrorPage')
      return
    }
    if (!caver.klay.accounts || !caver.klay.accounts.wallet[0]) {
      browserHistory.replace('/access?next=transfer')
      return
    }
    if (pathname !== '/transfer' && pathname.indexOf('/transfer/') < 0) {
      browserHistory.replace('/ErrorPage')
    }
  }

  updateGasPrice = async () => {
    const gp = await caver.rpc.klay.getGasPrice()
    KLAY_GAS_PRICE = caver.utils.toBN(gp).toString()
    this.setState({
      gasPrice: KLAY_GAS_PRICE,
      totalGasFee: caver.utils.fromWei(`${DEFAULT_KLAY_TRANSFER_GAS * KLAY_GAS_PRICE}`) || '',
    })
    console.log('gas price updated', KLAY_GAS_PRICE)
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
          this.setState({ [e.target.name]: limit6Decimal(`${e.target.value}.`) })
          return
        }
        this.setState({
          [e.target.name]: limit6Decimal(e.target.value),
          gas: new BN(caver.utils.toWei(limit6Decimal(e.target.value) || '0', 'ether')).dividedBy(new BN(this.state.gasPrice)).toString(),
        })
        break
      case 'to':
        this.setState({
          humanReadableCreated: null,
        })
        this.setState({
          [e.target.name]: e.target.value,
        })
        break
      case 'value':

        const valueArray = e.target.value.indexOf('.') >= 0 ? e.target.value.split('.')[0] === '' : true
        if (e.target.value !== '' && !isNumberStringWithDot) {
          if (!valueArray) return
        }

        this.setState({ [e.target.name]: limit6Decimal(e.target.value) })
        break
      default:
        this.setState({ [e.target.name]: limit6Decimal(e.target.value) })
    }
  }

  handleSelect = ({ tokenSymbol, tokenColorIdx }) => {
    const _totalGasFee = caver.utils.fromWei(
      `${(tokenSymbol === KLAYTN_KLAY_UINT
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
  buttonClick = () => {
    this.setState({
      view: 'form',
      popupShow: false,
    })
  }

  transfer = () => {
    const { type } = this.state
    switch (type) {
      case KLAYTN_KLAY_UINT:
        this.transferCoin()
        break
      default:
        this.transferToken()
    }
  }
  HRADataChange = () => {
    const address = sessionStorage.getItem('address')
    if (address) {
      return address
    } else if (this.wallet && this.wallet.address) {
      return this.wallet.address
    }
    return ''
  }
  formReset = () => {
    this.setState({
      to: '',
      value: '',
      totalGasFee: caver.utils.fromWei(`${DEFAULT_KLAY_TRANSFER_GAS * KLAY_GAS_PRICE}`) || '',
      humanReadableCreated: null,
      gas: DEFAULT_KLAY_TRANSFER_GAS,
      gasPrice: KLAY_GAS_PRICE,
    })
  }
  transferCoin = async () => {
    const { to, value, gas } = this.state
    const root = this
    const setType = await caver.klay.isContractAccount(to) ? 'SMART_CONTRACT_EXECUTION' : 'VALUE_TRANSFER'

    await caver.klay.sendTransaction({
      type: setType,
      from: this.HRADataChange(),
      to,
      value: caver.utils.toWei(value, 'ether'),
      gas: gas || DEFAULT_KLAY_TRANSFER_GAS,
    })
      .once('transactionHash', (transactionHash) => {
        this.setState({ transactionHash }, this.changeView('complete'))
        this.formReset()
      })
      // .once('receipt', () => {
      // })
      .on('error', (e) => {
        console.log(e.message)
        this.setState({
          popupShow: true,
          errorMessage: e.message,
        })
        // ui.showToast({ msg: 'Error occurred.' })
      })
  }
  transferToken = () => {
    const {
      to, value, type, gas,
    } = this.state
    const { tokenByName } = this.props
    const contractInstance = new caver.klay.Contract(krc20ABI, tokenByName[type].contractAddress)
    const decimalProcessedTokenAmount = `0x${new BN(value).multipliedBy(10 ** tokenByName[type].decimal).toString(16)}`
    const toAddress = to.indexOf('.klaytn') >= 0 ? caver.utils.humanReadableStringToHexAddress(to) : to
    const fromAddress = this.HRADataChange().indexOf('.klaytn') >= 0 ? caver.utils.humanReadableStringToHexAddress(this.HRADataChange()) : this.HRADataChange()

    contractInstance.accounts = caver.klay.accounts
    contractInstance.methods.transfer(toAddress, decimalProcessedTokenAmount).send({
      from: fromAddress,
      gas: gas || DEFAULT_TOKEN_TRANSFER_GAS,
    }).then((value) => {
      const transactionHash = value.transactionHash
      this.setState({ transactionHash }, this.changeView('complete'))
      this.formReset()
    }).catch((reason) =>{
      console.log(reason)
        this.setState({
          popupShow: true,
          errorMessage: reason,
        })
    });
  
  }
  humanReadableCreatedCheck = (isCreated) => {
    this.setState({ humanReadableCreated: isCreated })
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
      humanReadableCreated,
      popupShow,
      buttonName,
      errorMessage,
    } = this.state

    const { isTokenAddMode, myBalancesByName } = this.props

    switch (view) {
      case 'form':
        return (
          <div className="WalletTransfer2">
            <MyToken
              className="WalletTransfer2__myToken"
              title="Step 1. Select Token"
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
              klayBalance={myBalancesByName && myBalancesByName[DEFAULTTYPE]}
              humanReadableCreatedCheck={this.humanReadableCreatedCheck}
              humanReadableCreated={humanReadableCreated}
            />
          </div>
        )
      case 'total':
        return (
          <TransferTotal
            transfer={this.transfer}
            from={this.HRADataChange()}
            to={to}
            value={Number(value)}
            type={type}
            fee={fee}
            gas={gas}
            totalGasFee={totalGasFee}
            changeView={this.changeView}
            popupShow={popupShow}
            buttonName={buttonName}
            buttonClick={this.buttonClick}
            errorMessage={errorMessage}
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
