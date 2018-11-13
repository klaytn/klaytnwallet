import React, { Component, Fragment } from 'react'
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
    // If user clicked download, clear previous wallet instance.
    onit.klay.accounts.wallet.clear() && sessionStorage.removeItem('prv')
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
        title={(
          <Fragment>
            Please Download<br/>
            Keystore File
          </Fragment>
        )}
        description={(
          <Fragment>
            The password for your keystore file for a new wallet has been set.<br/>
            Please click the tab below to download your keystore to setup your wallet and move on to the last step.
          </Fragment>
        )}
        nextStepButtons={[{ title: 'Download & Next Step', onClick: pipe(this.handleDownload, handleStepMove(3)) }]}
      />
    )
  }
}

export default WalletCreationStep2
