import React, { Component } from 'react'
import classNames from 'classnames'
import { caver } from 'klaytn/caver'

import Input from 'components/Input'
import AccessReminder from 'components/AccessReminder'
import Button from 'components/Button'
import { isValidPrivateKey, klayKeyDecomulation, encryptAction } from 'utils/crypto'
import './AccessByPrivatekey.scss'

type Props = {

}

class AccessByPrivateKey extends Component<Props> {
  state = {
    privatekey: '',
    isValid: null,
    isReminderChecked: false
  }

  handleChange = (e) => {
    let walletData = e.target.value
    let inputValue, address
    if(walletData.indexOf('.') >=0){
      walletData = walletData.split('.')
      inputValue = walletData[0]
      address = walletData[1].length === 42 ? walletData[1] : null
      sessionStorage.setItem('address', caver.utils.hexToUtf8(address))
    }else{
      inputValue = walletData
    }
    this.setState({
      [e.target.name]: inputValue,
      isValid: inputValue.length === 0
        ? null
        : isValidPrivateKey(inputValue),
    })
  }

  toggleChecking = () => {
    this.setState({
      isReminderChecked: !this.state.isReminderChecked
    })
  }
  access = () => {
    const { privatekey } = this.state
    const { accessTo } = this.props
    const wallet = caver.klay.accounts.wallet.add(privatekey)

    // WARNING: sessionStorage has private key. it expired when window tab closed.
    const privateKeyencrypt = encryptAction(wallet.privateKey)
    sessionStorage.setItem('was', privateKeyencrypt)
    if (typeof accessTo === 'function') accessTo(wallet.address)
  }

  render() {
    const { 
      isValid,
      isReminderChecked,
    } = this.state
    return (
      <div className="AccessByPrivatekey">
        <Input
          label="Private Key"
          type="text"
          autoFocus
          name="privatekey"
          className="AccessByPrivatekey__input"
          placeholder="Enter the private key"
          onChange={this.handleChange}
          isValid={isValid}
          autocomplete="off"
          errorMessage={isValid === false && 'Invalid key'}
        />
        <AccessReminder 
          isChecked={isReminderChecked}
          onClick={this.toggleChecking}
        />
        <Button
          className="AccessByPrivatekey__button"
          disabled={!isValid || !isReminderChecked}
          onClick={this.access}
          title="Access"
        />
      </div>
    )
  }
}

export default AccessByPrivateKey
