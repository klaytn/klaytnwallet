import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { keyBy } from 'lodash'

import { onitSocket } from 'klaytn/onit'
import Dropdown from 'components/Dropdown'
import Input from 'components/Input'
import Button from 'components/Button'
import { RegisterToken, RegisterTokenButton } from 'components/RegisterToken'
import ui from 'utils/ui'
import { krc20ABI } from 'utils/crypto'

import './WalletTransfer.scss'

type Props = {

}

class WalletTransfer extends Component<Props> {
  constructor(props) {
    super(props)
    this.wallet = onitSocket.klay.accounts.wallet[0]
  }

  state = {
    isLoading: false,
    to: '',
    value: '',
    type: 'KLAY', // default type is KLAY.
    isValidTransaction: false,
    myTokenBalances: [],
  }

  componentWillMount() {
    if (!onitSocket.klay.accounts || !onitSocket.klay.accounts.wallet[0]) {
      ui.showToast({ msg: '로그인을 해주세요.' })
      new Audio('/sound/error.ogg').play()
      browserHistory.replace('/access?next=transfer')
    }
  }

  componentDidMount() {
    if (this.wallet) {
      this.getTokenBalances()
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tokenList.length !== this.props.tokenList.length) {
      this.getTokenBalances()
    }
  }

  getTokenBalances = () => {
    const { tokenList } = this.props
    Promise.all(
      [
        onitSocket.klay.getBalance(this.wallet.address),
        ...tokenList.map(({ name, contractAddress }) => {
          const contractInstance = new onitSocket.klay.Contract(krc20ABI, contractAddress)
          contractInstance.accounts = onitSocket.klay.accounts
          return Promise.resolve(contractInstance.methods.balanceOf(this.wallet.address).call())
        }),
      ])
      .then(balances => {
        const myTokenBalances = balances.map((balance, idx) => {
          const isNativeCoin = idx === 0
          if (isNativeCoin) {
            return {
              value: 'KLAY',
              label: `KLAY 코인 (보유량: ${balance})`,
            }
          } else {
            return {
              value: tokenList[idx - 1].name,
              label: `${tokenList[idx - 1].name} 토큰 (보유량: ${balance})`,
            }
          }
        })
        this.setState({
          isLoading: false,
          myTokenBalances: myTokenBalances,
          tokenBalanceByName: keyBy(myTokenBalances, ({ value }) => value),
        })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSelect = (token) => {
    this.setState({
      type: token.value,
      token,
    })
  }

  transfer = () => {
    const { type } = this.state
    console.log(type)
    switch (type) {
      case 'KLAY':
        this.transferCoin()
        break
      default:
        this.transferToken()
    }
  }

  transferCoin = () => {
    const { to, value } = this.state
    onitSocket.klay.sendTransaction({
      from: this.wallet.address,
      to,
      value,
      gasPrice: '0',
      gas: '200000',
    })
      .on('transactionHash', () => {
        ui.showToast({ msg: `${to} 주소로 ${value} klay를 전송합니다.` })
      })
      .on('receipt', () => {
        new Audio('/sound/transfer.mp3').play()
        ui.showToast({ msg: `${to} 주소로 ${value} klay 전송에 성공했습니다.` })
        this.getTokenBalances()
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
    const contractInstance = new onitSocket.klay.Contract(krc20ABI, tokenByName[type].contractAddress)
    contractInstance.accounts = onitSocket.klay.accounts
    contractInstance.methods.transfer(to, value).send({
      from: this.wallet.address,
      gas: '300000',
      gasPrice: '0',
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

  render() {
    const { to, value, type, myTokenBalances, tokenBalanceByName } = this.state
    if (!tokenBalanceByName) return 'loading...'
    return (
      <div className="WalletTransfer">
        <p className="WalletTransfer__title">코인 및 토큰 전송</p>
        <p className="WalletTransfer__description">
          - 보유한 코인 및 토큰을 전송합니다.<br />
          - 보내고자하는 토큰의 종류가 목록에 없다면 우측의 토큰 등록 버튼을 눌러 등록해주세요.<br />
        </p>
        <Input
          id="from"
          className="WalletTransfer__input"
          title="보내는 사람:"
          name="from"
          value={this.wallet && this.wallet.address}
          readOnly
        />
        <Input
          id="to"
          className="WalletTransfer__input"
          title="받는 사람:"
          name="to"
          onChange={this.handleChange}
        />
        <Input
          id="value"
          className="WalletTransfer__input"
          title="보낼 양:"
          name="value"
          onChange={this.handleChange}
        />
        <Dropdown
          options={myTokenBalances}
          onChange={this.handleSelect}
          value={tokenBalanceByName[type]}
        />
        <RegisterTokenButton />
        <Button
          title="전송"
          onClick={this.transfer}
          className="WalletTransfer__button"
          disabled={!to || !value || !type}
        />
        {/* <RegisterToken /> */}
      </div>
    )
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

export default connect(mapStateToProps)(WalletTransfer)
