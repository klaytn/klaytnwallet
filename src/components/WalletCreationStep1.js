import React, { Component, Fragment } from 'react'

import WalletCreationStepPlate from 'components/WalletCreationStepPlate'
import InputPassword from 'components/InputPassword'
import WalletCreationReminder from 'components/WalletCreationReminder'
import { checkValidPassword } from 'utils/crypto'

class WalletCreationStep1 extends Component<Props> {

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
    const handleStepMoveSet = handleStepMove(2)
    if(e.keyCode ===13 && isValidPassword){
      handleStepMoveSet()
      
    }
  }

  render() {
    const { password, isValidPassword, nameSet } = this.state
    const { handleStepMove, pageType } = this.props
    return (
      <WalletCreationStepPlate
        stepName="STEP 1"
        title="Please Set Password for Your Keystore File"
        description={(
          <Fragment>
            This is the first step of creating your new Klaytn account.<br />
            Please set the password for the keystore file storing your account’s private key.
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
        nextStepButtons={[{ title: 'Next Step', onClick: handleStepMove(2), disabled: !isValidPassword }]}
      />
    )
  }
}

export default WalletCreationStep1