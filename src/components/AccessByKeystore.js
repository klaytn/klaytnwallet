import React, { Component } from 'react'
import { onitSocket } from 'klaytn/onit'
import classNames from 'classnames'

import Input from 'components/Input'
import File from 'components/File'
import Button from 'components/Button'
import ui from 'utils/ui'
import { checkValidPassword } from 'utils/crypto'

import './AccessByKeystore.scss'

type Props = {

}

class AccessByKeystore extends Component<Props> {
  state = {
    keystore: '',
    keystoreAddress: '',
    isValidPassword: null,
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
        this.setState({
          keystore: target.result,
          keystoreAddress: parsedKeystore.address,
        }, () => document.querySelector('#input-password').focus())
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
      isValidPassword: e.target.value.length === 0 ? null : checkValidPassword(e.target.value),
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
    const { keystore, keystoreAddress, isValidPassword } = this.state
    return (
      <div className="AccessByKeystore">
        <File
          className={classNames({
            'File--imported': keystore,
          })}
          title={keystore ? `키스토어: ${keystoreAddress.slice(0, 7)}...` : "키스토어 파일첨부" }
          onChange={this.handleImport}
        />
        <div className={classNames('AccessByKeystore__form', {
          'AccessByKeystore__form--hide': !keystore,
        })}
        >
          <Input
            autoFocus
            key="privatekey"
            className="AccessByKeystore__privateKey"
            name="password"
            type="password"
            onChange={this.handleChange}
            isValid={isValidPassword}
          />
          <Button
            key="access"
            className="AccessByKeystore__button"
            onClick={this.access}
            disabled={!isValidPassword}
            title="접근"
          />
        </div>
      </div>
    )
  }
}

export default AccessByKeystore
