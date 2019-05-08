import React, { Component } from 'react'
import { caver } from 'klaytn/caver'
import classNames from 'classnames'

import InputFile from 'components/InputFile'
import Input from 'components/Input'
import File from 'components/File'
import AccessReminder from 'components/AccessReminder'
import Button from 'components/Button'
import { checkValidPassword, encryptAction } from 'utils/crypto'
import './AccessByKeystore.scss'

type Props = {

}

class AccessByKeystore extends Component<Props> {
  state = {
    keystore: '',
    keystoreAddress: '',
    // isValidPassword: null,
    isValidPassword: true,
    error: '',
    passwordError: '',
    password: '',
    isReminderChecked: false,
    fileName: '',
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
          this.setState({
            error: 'Keystore file is invalid.',
            fileName: ''
          })
          return
        }

        this.setState({
          fileName,
          keystore: target.result,
          error: '',
          keystoreAddress: parsedKeystore.address,
        }, () => document.querySelector('#input-password').focus())
      } catch (e) {
        this.setState({
          error: 'Keystore file is invalid.',
          fileName: ''
        })
        return
      }
    }
    fileReader.readAsText(keystore)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      // isValidPassword: e.target.value.length === 0 ? null : checkValidPassword(e.target.value),
      error: '',
    })
  }

  toggleChecking = () => {
    this.setState({
      isReminderChecked: !this.state.isReminderChecked
    })
  }

  access = () => {
    const { fileName, keystore, password } = this.state
    const { accessTo } = this.props
    // Wallet instance will be addded to caver.klay.accounts.wallet
      // WARNING: sessionStorage has private key. it expired when window tab closed.
     
    try {
      const wallet = caver.klay.accounts.decrypt(keystore, password)
      caver.klay.accounts.wallet.add(wallet.privateKey)
      // WARNING: sessionStorage has private key. it expired when window tab closed.
      const privateKeyencrypt = encryptAction(wallet.privateKey)
      sessionStorage.setItem('was', privateKeyencrypt)
      if (typeof accessTo === 'function') accessTo(wallet.address)
      if (wallet.address.indexOf('0000') > 0 ) sessionStorage.setItem('address', caver.utils.hexToUtf8(wallet.address))
    } catch (e) {
      this.setState({
        passwordError: 'Does not match with your keystore file.',
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
        password,
        isReminderChecked,
        passwordError,
       } = this.state 
    return (
      <div className="AccessByKeystore">
        <InputFile
          label="Import Keystore File (.json)"
          value={fileName}
          onChange={this.handleImport}
          placeholder="Search..."
          errorMessage={error}
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
          errorMessage={passwordError}
        />
        <AccessReminder 
          isChecked={isReminderChecked}
          onClick={this.toggleChecking}
        />
        <Button 
          className="AccessByKeystore__button"
          onClick={this.access}
          disabled={!keystore || !password || !isReminderChecked}
          title="Access"
        />
      </div>
    )
  }
}

export default AccessByKeystore
