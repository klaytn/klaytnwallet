import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

import { onitSocket } from 'klaytn/onit'
import Dropdown from 'components/Dropdown'
import Panel from 'components/Panel'
import RegisterToken from 'components/RegisterToken'
import ui from 'utils/ui'
import { krc20ABI } from 'utils/crypto'

type Props = {

}

class WalletTransfer extends Component<Props> {
  constructor() {
    super()
    this.wallet = onitSocket.klay.accounts.wallet[0]
  }

  state = {
    isLoading: false,
    to: '',
    value: '',
    type: 'KLAY', // default type is KLAY.
  }

  componentWillMount() {
    if (!onitSocket.klay.accounts.wallet[0]) {
      ui.showToast({ msg: '로그인을 해주세요.' })
      browserHistory.replace('/access?next=transfer')
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSelect = (token) => {
    this.setState({ token })
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
        ui.showToast({ msg: `${to} 주소로 ${value} klay 전송에 성공했습니다.` })
      })
      .on('error', (e) => {
        console.log(e)
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
      ui.showToast({ msg: `${to} 주소로 ${value} ${type} 전송에 성공했습니다.` })
    })
    .on('error', (e) => {
      console.log(e)
      ui.showToast({ msg: '오류가 발생했습니다.' })
    })
  }

  render() {
    const { tokenList } = this.props
    return (
      <Panel>
        <div className="WalletTransfer">
          <label for="to">
          받는사람 주소:
          </label>
          <input id="to" name="to" onChange={this.handleChange} />
          <label for="value">
          보낼 양:
          </label>
          <input id="value" name="value" onChange={this.handleChange} />
          <label for="type">종류: </label>
          <select name="type" onChange={this.handleChange} id="type">
            <option selected value="KLAY">KLAY</option>
            {tokenList.map(({ name }) => <option value={name}>{name}</option>)}
          </select>
          <button onClick={this.transfer}>전송</button>
        </div>
        <RegisterToken />
      </Panel>
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
