import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import { onitSocket } from 'klaytn/onit'
import Dropdown from 'components/Dropdown'
import Panel from 'components/Panel'
import ui from 'utils/ui'

type Props = {

}

const tokenList = [
  {
    name: 'LAS',
    contractAddress: '',
    decimal: 18,
  }
]

class WalletTransfer extends Component<Props> {
  constructor() {
    super()
    this.wallet = onitSocket.klay.accounts.wallet[0]
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

  render() {
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
          {/*<Dropdown items={tokenList} />*/}
          <button onClick={this.transfer}>전송</button>
        </div>
      </Panel>
    )
  }
}

export default WalletTransfer
