import React, { Component } from 'react'
import { fromEvent } from 'rxjs'

import { onitSocket } from 'klaytn/onit'
import Panel from 'components/Panel'
import SaveKeyStore from 'components/SaveKeyStore'
import { getRandomBytes } from 'utils/crypto'
import ui from 'utils/ui'

import './WalletCreation.scss'

const MINIMUM_PASSWORD_LENGTH = 9

type Props = {

}

class WalletCreation extends Component<Props> {
  state = {
    privateKey: null,
    password: '',
    isValidPassword: false,
    isWalletCreated: false,
  }

  componentWillMount() {
    onitSocket.klay.accounts.wallet.clear()
  }

  handleCreate = () => {
    const { isValidPassword } = this.state

    if (!isValidPassword) {
      ui.showToast({ msg: `패스워드는 ${MINIMUM_PASSWORD_LENGTH}자리 이상이어야 합니다.` })
      return
    }

    this.setState({
      privateKey: getRandomBytes(),
      isWalletCreated: true,
    }, () => ui.showToast({ msg: '지갑이 생성되었습니다!' }))
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
      isValidPassword: e.target.value.length >= MINIMUM_PASSWORD_LENGTH,
    })
  }

  render() {
    const { isWalletCreated, privateKey, password, isValidPassword } = this.state

    if (isWalletCreated) {
      return <SaveKeyStore privateKey={privateKey} password={password} />
    }

    return (
      <Panel>
        <div className="WalletCreation">
          <p className="WalletCreation__title">지갑 생성</p>
          <div className="WalletCreation__passwordInput">
            <p>비밀번호를 입력하세요.</p>
            <input
              name="password"
              type="password"
              className="WalletCreation__passwordInput"
              onChange={this.handlePasswordChange}
            />
          </div>
          <button onClick={this.handleCreate}>지갑 생성하기</button>
          {privateKey && <WalletCreationPrivateKey privateKey={privateKey} />}
        </div>
      </Panel>
    )
  }
}

const WalletCreationPrivateKey = ({ privateKey }) => (
  <div className="WalletCreation__privateKey">
    {privateKey}
  </div>
)

export default WalletCreation
