import React, { Component, Fragment } from 'react'
import { browserHistory } from 'react-router'
import jsonFormat from 'json-format'

import InputCopy from 'components/InputCopy'
import WalletCreationStepPlate from 'components/WalletCreationStepPlate'

type Props = {

}

import './WalletCreationStep3.scss'

class WalletCreationStep3 extends Component<Props> {
  render() {
    const { privateKey } = this.props
    return (
      <WalletCreationStepPlate
        className="WalletCreationStep3"
        stepName="FINAL"
        title="Save Private Key"
        description={`
          A new wallet has been created.
          Finally, please copy the private key below and save it.
        `}
        render={() => (
          <InputCopy
            value={privateKey}
            label="Private Key"
          />
        )}
        nextStepButtons={[
          {
            title: 'View Wallet Info',
            onClick: () => browserHistory.push('/access'),
            className: 'WalletCreationStep3__button',
            gray: true,
          },
          {
            title: 'Send KLAY & Tokens',
            onClick: () => browserHistory.push('/transfer'),
            className: 'WalletCreationStep3__button',
          },
        ]}
      />
    )
  }
}

export default WalletCreationStep3
