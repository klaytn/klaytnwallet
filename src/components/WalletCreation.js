import React, { Component } from 'react'
import { fromEvent } from 'rxjs'

import { onitSocket } from 'klaytn/onit'
import Input from 'components/Input'
import Panel from 'components/Panel'
import Button from 'components/Button'
import SaveKeyStore from 'components/SaveKeyStore'
import { getRandomBytes, checkValidPassword } from 'utils/crypto'
import ui from 'utils/ui'
import { isMobile } from 'utils/misc'

import './WalletCreation.scss'

type Props = {

}

const MINIMUM_PASSWORD_LENGTH = 9

class WalletCreation extends Component<Props> {
  state = {
    privateKey: null,
    password: '',
    isValidPassword: null,
    isWalletCreated: false,
  }

  componentWillMount() {
    onitSocket.klay.accounts.wallet.clear()
  }

  handleCreate = () => {
    const { isValidPassword } = this.state

    if (isMobile) {
      this.setState({
        privateKey: getRandomBytes(),
        isWalletCreated: true,
      }, () => ui.showToast({ msg: '지갑이 생성되었습니다!' }))
      return
    }

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
      isValidPassword: e.target.value.length === 0 ? null : checkValidPassword(e.target.value),
    })
  }

  render() {
    const { isWalletCreated, privateKey, password, isValidPassword } = this.state

    if (isWalletCreated) {
      return <SaveKeyStore privateKey={privateKey} password={password} />
    }

    return (
      <div className="WalletCreation">
        <p className="WalletCreation__title">지갑 생성</p>
        <p className="WalletCreation__description">
          비밀번호를 생성해주세요. <br/>
          - 생성하신 <span className="WalletCreation__description--highlight">비밀번호</span>는 키스토어와 함께 지갑에 접근하기 위해 사용됩니다. <br />
          - 지갑에 접근하는 방법은 두 가지로, <br />
          - 1) 개인 키를 이용한 접근 <br />
          <span className="WalletCreation__description--highlight">- 2) 키스토어와 비밀번호를 통한 접근</span> - 비밀번호는 이 방법을 통해 접근하기 위해 필요합니다. <br />
          {isMobile && '*모바일 환경에서는 키스토어를 통한 접근을 지원되지 않습니다.'}
        </p>
        <div className="WalletCreation__content">
          {!isMobile && (
            <Input
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요. (9 자리 이상)"
              autoFocus
              className="WalletCreation__passwordInput"
              onChange={this.handlePasswordChange}
              isValid={isValidPassword}
            />
          )}
          <Button
            onClick={this.handleCreate}
            className="WalletCreation__button"
            title="지갑 생성하기"
            disabled={isMobile ? false : !isValidPassword}
          />
        </div>
        {isMobile
          ? <WalletCreationPrivateKey privateKey={privateKey} />
          : privateKey && <WalletCreationPrivateKey privateKey={privateKey} />
        }
      </div>
    )
  }
}

const WalletCreationPrivateKey = ({ privateKey }) => (
  <div className="WalletCreation__privateKey">
    {privateKey}
  </div>
)

export default WalletCreation
