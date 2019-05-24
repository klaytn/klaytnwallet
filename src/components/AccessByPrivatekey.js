import React, { Component } from 'react'
import classNames from 'classnames'
import { caver } from 'klaytn/caver'

import Input from 'components/Input'
import AccessReminder from 'components/AccessReminder'
import Button from 'components/Button'
import { isValidPrivateKey, klayKeyDecomulation, encryptAction, klaytnKeyCheck} from 'utils/crypto'
import './AccessByPrivatekey.scss'

type Props = {

}

class AccessByPrivateKey extends Component<Props> {
  state = {
    privatekey: '',
    isValid: null,
    isValidWalletKey: null,
    isReminderChecked: false,
    address: '',
  }

  handleChange = async (e) => {
    let walletData = e.target.value
    let inputValue, address
    const addressCheck = klaytnKeyCheck(e.target.value)
    this.setState({address: '' })
    this.setState({isValidWalletKey: addressCheck == '0x00' && await !caver.utils.isConvertableToHRA(address) })
    if(addressCheck){
      walletData = walletData.split(addressCheck)
      inputValue = walletData[0]
      address = walletData[1].length === 42 ? walletData[1] : null      
      this.setState({address: address })
    }else{
      inputValue = walletData
    }
    this.setState({
      [e.target.name]: inputValue,
      isValid: inputValue.length === 0
        ? null
        : inputValue.length == 66 && isValidPrivateKey(inputValue),
    })
  }

  toggleChecking = () => {
    this.setState({
      isReminderChecked: !this.state.isReminderChecked
    })
  }
  access = async () => {
    const { privatekey, address } = this.state
    const { accessTo } = this.props
    let wallet, isHumanReadable
    caver.klay.accounts.wallet.clear()
    isHumanReadable = await caver.utils.isConvertableToHRA(address)
    if(address){
      wallet = caver.klay.accounts.wallet.add(privatekey,address)
      sessionStorage.setItem('address', isHumanReadable ? caver.utils.hexToUtf8(address):address )
    }else{
      wallet = caver.klay.accounts.wallet.add(privatekey)
    }
    // WARNING: sessionStorage has private key. it expired when window tab closed.
    const privateKeyencrypt = encryptAction(wallet.privateKey)
    sessionStorage.setItem('was', privateKeyencrypt)
    if (typeof accessTo === 'function') accessTo(address? address : wallet.address)
  }

  render() {
    const { 
      isValid,
      isReminderChecked,
      isValidWalletKey,
    } = this.state
    return (
      <div className="AccessByPrivatekey">
        <Input
          label="Private Key or HRA Private Key"
          type="text"
          autoFocus
          name="privatekey"
          className="AccessByPrivatekey__input"
          placeholder="Enter the private key or HRA Private Key"
          onChange={this.handleChange}
          isValid={isValid }
          autoComplete="off"
          errorMessage={(isValid === false || isValidWalletKey) && 'Invalid key'}
          isSuccess={isValid}
        />
        <AccessReminder 
          isChecked={isReminderChecked}
          onClick={this.toggleChecking}
        />
        <Button
          className="AccessByPrivatekey__button"
          disabled={!isValid || !isReminderChecked || isValidWalletKey}
          onClick={this.access}
          title="Access"
        />
      </div>
    )
  }
}

export default AccessByPrivateKey
