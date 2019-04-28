
import React, { Component, Fragment } from 'react'
import jsonFormat from 'json-format'

import WalletCreationStepPlate from 'components/WalletCreationStepPlate'
import { pipe } from 'utils/Functional'
import { download } from 'utils/misc'
import { caver } from 'klaytn/caver'
type Props = {

}

class WalletCreationStep4 extends Component<Props> {
  constructor(props) {
    super(props)
    const { privateKey } = caver.klay.accounts.create()
    this.state = {
      privateKey,
      nameSet: {
        'normal': {
          stepName:'STEP 2',
        },
        'HRAType': {
          stepName:'STEP 4',
        }
      },
    }
  }


  handleDownload = () => {
    const { privateKey} = this.state
    const { password, receiptWallet,walletDataUpdate, pageType, madePrivateKey} = this.props
    
    const HRAaddress = {}
    if(pageType == 'HRAType'){
      this.setState({privateKey: madePrivateKey  })
      HRAaddress.address = caver.utils.hexToUtf8(receiptWallet.to)
    }
    const keystore = caver.klay.accounts.encrypt(privateKey, password, HRAaddress)
    if(HRAaddress.address){
      walletDataUpdate({
        HRAaddress: HRAaddress.address
      })
    }
    
    // If user clicked download, clear previous wallet instance.
    caver.klay.accounts.wallet.clear()
    sessionStorage.removeItem('was')
    this.downloadKeystore(keystore)
    sessionStorage.removeItem('address')
  }

  downloadKeystore = (keystore) => {
    const date = new Date()
    const address = keystore.addressAsHumanReadableString ? keystore.addressAsHumanReadableString : keystore.address
    const fileName = `keystore-${address}-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.json`
    download(jsonFormat(keystore), fileName)
  }

  render() {
    const { nameSet} = this.state
    const { handleStepMove, pageType } = this.props
    const { stepName } = nameSet[pageType]
    return (
      <WalletCreationStepPlate
        stepName={stepName}
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
