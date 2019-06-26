import React, { Component, Fragment } from 'react'

import WalletCreationStepPlate from 'components/WalletCreationStepPlate'
import InputPassword from 'components/InputPassword'
import WalletCreationReminder from 'components/WalletCreationReminder'
import { checkValidPassword } from 'utils/crypto'
import { pipe } from 'utils/Functional'
import { caver } from 'klaytn/caver'
import { download } from 'utils/misc'
import jsonFormat from 'json-format'
class WalletHRACreationStep3 extends Component<Props> {

  constructor() {
    super()
    this.state = {
      password: '',
      isValidPassword: null,
    }
    
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      isValidPassword: e.target.value.length === 0 ? null : checkValidPassword(e.target.value),
    })
  }
  enterKeySelcet = (e)=>{
    const { handleStepMove } = this.props
    const { isValidPassword } = this.state
    const handleStepMoveSet = handleStepMove(4)
    if(e.keyCode ===13 && isValidPassword){
      handleStepMoveSet()
      
    }
  }
  handleDownload = () => {
    const { password } = this.state
    const { privateKey, receiptWallet, walletDataUpdate} = this.props
    const HRAaddress = {}
    HRAaddress.address = caver.utils.hexToUtf8(receiptWallet.to)
    const keystore = caver.klay.accounts.encrypt(privateKey, password, HRAaddress)
    walletDataUpdate({
      HRAaddress: HRAaddress.address
    })
    // If user clicked download, clear previous wallet instance.
    
    this.downloadKeystore(keystore)

  }

  downloadKeystore = (keystore) => {
    const date = new Date()
    const address = keystore.addressAsHumanReadableString ? keystore.addressAsHumanReadableString : keystore.address
    const fileName = `keystore-${address}-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.json`
    download(jsonFormat(keystore), fileName)
  }
  render() {
    const { password, isValidPassword } = this.state
    const { handleStepMove } = this.props
    return (
      <WalletCreationStepPlate
        stepName="STEP 3"
        title="Please Set Password for Your Keystore File"
        description={(
          <Fragment>
            Your keystore file contains your account’s private key and its address.<br /> 
            Please protect your keystore file with a strong password.
          </Fragment>
        )}
        render={() => (
          <InputPassword
            value={password}
            name="password"
            placeholder="Enter the password"
            label="Password"
            onChange={this.handleChange}
            onKeyUp={this.enterKeySelcet}
          />
        )}
        reminder={() => (
          <WalletCreationReminder />
        )}
        nextStepButtons={[{ title: 'Download & Next Step', onClick: pipe(this.handleDownload, handleStepMove(4)), disabled: !isValidPassword }]}
      />
    )
  }
}

export default WalletHRACreationStep3