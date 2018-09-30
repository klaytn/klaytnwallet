import React, { Component } from 'react'
import { onit } from 'klaytn/onit'
import classNames from 'classnames'

import InputFile from 'components/InputFile'
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
    error: '',
  }

  handleImport = (e) => {
    const keystore = e.target.files[0]
    const fileName = keystore && keystore.name
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
          fileName,
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
      error: '',
    })
  }

  access = () => {
    const { fileName, keystore, password } = this.state
    const { accessTo } = this.props
    // Wallet instance will be addded to onit.klay.accounts.wallet
    try {
      const wallet = onit.klay.accounts.wallet.decrypt([keystore], password)[0]
      // WARNING: sessionStorage has private key. it expired when window tab closed.
      sessionStorage.setItem('prv', wallet.privateKey)
      if (typeof accessTo === 'function') accessTo(wallet.address)
    } catch (e) {
      this.setState({
        error: 'Does not Match with your Keystore Account',
      })
    }
  }

  render() {
    const {
        fileName,
        keystore,
        keystoreAddress,
        isValidPassword,
        error,
       } = this.state
    return (
      <div className="AccessByKeystore">
        <InputFile
          label="Import Keystore File (.json)"
          value={fileName}
          onChange={this.handleImport}
          placeholder="Search..."
        />
        <Input
          autoFocus
          label="Password"
          placeholder="Enter the password"
          key="password"
          className="AccessByKeystore__password"
          name="password"
          type="password"
          onChange={this.handleChange}
          isValid={isValidPassword}
          errorMessage={error}
        />
        <Button
          className="AccessByKeystore__button"
          onClick={this.access}
          disabled={!isValidPassword}
          title="Access"
        />
      </div>
    )
  }
}

export default AccessByKeystore
