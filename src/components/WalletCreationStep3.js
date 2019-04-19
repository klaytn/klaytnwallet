import React, { Component, Fragment } from 'react'

import WalletCreationStepPlate from 'components/WalletCreationStepPlate'
import InputPassword from 'components/InputPassword'
import WalletCreationReminder from 'components/WalletCreationReminder'
import { closeBrowser } from 'utils/ui'
import { checkValidPassword } from 'utils/crypto'

class WalletCreationStep3 extends Component<Props> {
  state = {
    password: '',
    isValidPassword: null,
  }
  constructor() {
    super()
    this.state = {
      password: '',
      isValidPassword: null,
    }
    window.addEventListener("beforeunload", closeBrowser);
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      isValidPassword: e.target.value.length === 0 ? null : checkValidPassword(e.target.value),
    })
  }

  render() {
    const { password, isValidPassword } = this.state
    const { handleStepMove } = this.props

    return (
      <WalletCreationStepPlate
        stepName="STEP 3"
        title="Please Set Password for your Keystore File"
        description={(
          <Fragment>
            This is your first step in creating your Klaytn Wallet.<br />
            Please set the password for the keystore file for your new wallet.
          </Fragment>
        )}
        render={() => (
          <InputPassword
            value={password}
            name="password"
            placeholder="Enter the password"
            label="Password"
            onChange={this.handleChange}
          />
        )}
        reminder={() => (
          <WalletCreationReminder />
        )}
        nextStepButtons={[{ title: 'Next Step', onClick: handleStepMove(4), disabled: !isValidPassword }]}
      />
    )
  }
}

export default WalletCreationStep3