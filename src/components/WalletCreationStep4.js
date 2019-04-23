
import React, { Component, Fragment } from 'react'
import jsonFormat from 'json-format'

import WalletCreationStepPlate from 'components/WalletCreationStepPlate'
import { pipe } from 'utils/Functional'
import { download } from 'utils/misc'
import { onit } from 'klaytn/onit'
type Props = {

}

class WalletCreationStep4 extends Component<Props> {
  constructor(props) {
    super(props)
    const { privateKey } = onit.klay.accounts.create()
    this.state = {
      privateKey,
    }
  }


  handleDownload = () => {
    const { privateKey } = this.state
    const { password, receiptWallet,walletDataUpdate, pageType, madePrivateKey} = this.props
    const HRAaddress = {}
    if(pageType == 'HRAType'){
      this.setState({privateKey: madePrivateKey  })
      HRAaddress.address = onit.utils.hexToUtf8(receiptWallet.to)
    }
    const keystore = onit.klay.accounts.encrypt(privateKey, password, HRAaddress)
    if(HRAaddress.address){
      walletDataUpdate({
        HRAaddress: HRAaddress.address
      })
    }
    
    // If user clicked download, clear previous wallet instance.
    onit.klay.accounts.wallet.clear()
    sessionStorage.removeItem('prv')
    this.downloadKeystore(keystore)
    sessionStorage.removeItem('address')
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
            Please Download Keystore File
          </Fragment>
        )}
        description={(
          <Fragment>
            The password for your keystore file for a new wallet has been set.<br/>
            Please click the tab below to download your keystore to setup your wallet and move on to the last step.
          </Fragment>
        )}
        nextStepButtons={[
          { title: 'Download & Next Step', onClick: pipe(this.handleDownload,handleStepMove(5))}
        ]}
      />
    )
  }
}

export default WalletCreationStep4
