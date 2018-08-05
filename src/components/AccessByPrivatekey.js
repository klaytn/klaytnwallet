import React, { Component } from 'react'
import { onitSocket } from 'klaytn/onit'

import ui from 'utils/ui'

type Props = {

}

class AccessByPrivateKey extends Component<Props> {
  state = {
    privatekey: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  access = () => {
    const { privatekey } = this.state
    const { accessTo } = this.props
    try {
      const wallet = onitSocket.klay.accounts.wallet.add(privatekey)
      ui.showToast({ msg: `${wallet.address} 지갑으로 로그인되었습니다.` })
      if (typeof accessTo === 'function') accessTo(wallet.address)
    } catch (e) {
      ui.showToast({ msg: '올바르지 않은 개인 키 입니다.' })
    }
  }

  render() {
    return (
      <div className="AccessByPrivatekey">
        <input
          type="text"
          name="privatekey"
          onChange={this.handleChange}
        />
        <button onClick={this.access}>접근</button>
      </div>
    )
  }
}

export default AccessByPrivateKey
