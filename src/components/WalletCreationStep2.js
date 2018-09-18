import React, { Component } from 'react'
import jsonFormat from 'json-format'

import WalletCreationStepPlate from 'components/WalletCreationStepPlate'
import { pipe } from 'utils/Functional'
import { download } from 'utils/misc'
import { onit } from 'klaytn/onit'

type Props = {

}

class WalletCreationStep2 extends Component<Props> {
  constructor() {
    super()
    const { privateKey } = onit.klay.accounts.create()
    this.state = {
      privateKey,
    }
  }

  handleDownload = () => {
    const { privateKey } = this.state
    const { password } = this.props
    const keystore = onit.klay.accounts.encrypt(privateKey, password)
    this.downloadKeystore(keystore)
  }

  downloadKeystore = (keystore) => {
    const date = new Date()
    const fileName = `keystore-${keystore.address}-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.json`
    download(jsonFormat(keystore), fileName)
  }

  render() {
    const { handleStepMove } = this.props
    return (
      <WalletCreationStepPlate
        stepName="STEP 2"
        title="Keystore File Download"
        description={`
          Password setting of key store file for new wallet is completed.
          Now click on the button below to download
          the keystore to complete your wallet creation
          and move on to the last step.
        `}
        nextStepButtons={[{ title: 'Download & Next Step', onClick: pipe(this.handleDownload, handleStepMove(3)) }]}
      />
    )
  }
}

export default WalletCreationStep2
