import React, { Component } from 'react'
import { onitSocket } from 'klaytn/onit'

import ui from 'utils/ui'

type Props = {

}

class AccessByKeystore extends Component<Props> {
  state = {
    keystore: '',
  }

  handleImport = (e) => {
    const keystore = e.target.files[0]
    const fileReader = new FileReader()
    fileReader.onload = ({ target }) => {
      try {
        const parsedKeystore = JSON.parse(target.result)

        const isValidKeystore = parsedKeystore.version &&
          parsedKeystore.id &&
          parsedKeystore.address &&
          parsedKeystore.crypto

        if (!isValidKeystore) {
          ui.showToast({ msg: '올바르지 않은 키스토어입니다.' })
          return
        }

        ui.showToast({ msg: '올바른 키스토어 파일입니다. 패스워드를 입력해주세요.' })
        this.setState({ keystore: target.result })
      } catch (e) {
        ui.showToast({ msg: '올바른 키스토어 파일 (JSON)이 아닙니다.' })
        return
      }
    }
    fileReader.readAsText(keystore)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  access = () => {
    const { keystore, password } = this.state
    const { accessTo } = this.props
    // Wallet instance will be addded to onit.klay.accounts.wallet
    try {
      const wallet = onitSocket.klay.accounts.wallet.decrypt([keystore], password)[0]
      ui.showToast({ msg: `${wallet.address} 지갑으로 로그인되었습니다.` })
      if (typeof accessTo === 'function') accessTo(wallet.address)
    } catch (e) {
      ui.showToast({ msg: '패스워드가 올바르지 않습니다.' })
    }
  }

  render() {
    const { keystore } = this.state
    return (
      <div className="AccessByKeystore">
        <input
          className="AccessByKeystore__keystore"
          type="file"
          onChange={this.handleImport}
        />
        {keystore && [
          <input
            key="privatekey"
            className="AccessByKeystore__privateKey"
            name="password"
            type="password"
            onChange={this.handleChange}
          />,
          <button
            key="access"
            onClick={this.access}
          >
            접근
          </button>
        ]}
      </div>
    )
  }
}

export default AccessByKeystore
