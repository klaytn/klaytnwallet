import React, { Component, Fragment } from 'react'
import { browserHistory } from 'react-router'
import jsonFormat from 'json-format'
import { Link } from 'react-router'
import InputCopy from 'components/InputCopy'
import WalletCreationStepPlate from 'components/WalletCreationStepPlate'
import { klayKeyMade } from 'utils/crypto'
import { KLAYTN_SCOPE_URL } from 'walletConstants/url'
import cx from 'classnames'
import { caver } from 'klaytn/caver'
import { pipe } from 'utils/Functional'
import ui from 'utils/ui'
type Props = {

}


class WalletCreationStep3 extends Component<Props> {

  constructor(props) {
    super(props)
    const { privateKey } = this.props
    this.state = {
      userPrivateKey:'',
      hidePrivateKey: false,
    }
  }
  removeData = () => {
    caver.klay.accounts.wallet.clear()
    sessionStorage.removeItem('was')
    sessionStorage.removeItem('address')
    sessionStorage.removeItem('disclaimers')
    ui.keyRemove()
  }
  movePageInfo = () => {
    browserHistory.push('/access')
  }
  movePageTransfer = () => {
    browserHistory.push('/access?next=transfer')
  }
  togglePrivateKey = () => {
    this.setState({ hidePrivateKey: !this.state.hidePrivateKey })
  }
  madeWalletKey = () => {
    const { walletData } = this.props
    return (walletData.privateKey+'0x00'+walletData.address).toLowerCase()
  }
  render() {
    const { privateKey, pageType, receiptWallet, walletData, hidePrivateKey } = this.props
    let buttonList
    if(sessionStorage.getItem('was')){
      buttonList =[{ title: 'Sign in with New Account', gray: true, onClick: pipe(this.removeData, this.movePageInfo), className: 'WalletCreationStep3__button'},
      { title: 'View My Current Account', onClick: this.movePageInfo, className: 'WalletCreationStep3__button'}] 
    }else{
      buttonList = [{ title: 'View Account Info', onClick: pipe(this.removeData, this.movePageInfo), className: 'WalletCreationStep3__button', gray: true},
      { title: 'Send KLAY & Token', onClick: pipe(this.removeData, this.movePageTransfer), className: 'WalletCreationStep3__button'},]
    }
    return (
      <WalletCreationStepPlate
        className="WalletCreationStep5"
        stepName="STEP 3"
        title="Please Save Your Klaytn Wallet Key"
        description={(
          <Fragment>
            Your new account has been created.<br />
            Please copy and securely store the Klaytn Wallet Key below.
          </Fragment>
        )}
        render={() => (
          <div className="WalletCreationStep3__Info">
            <InputCopy
              className="WalletCreationStep3__Input"
              name="privateKey"
              label="Private Key"
              value={privateKey}
              isTooltip={true}
              tooltipText={(
                <Fragment>
                  <p>This refers to the 32 byte private key commonly used in public key cryptography (following the same format as in Ethereum); it is used for transaction signing.</p>
                  <p>Please store your private key securely, as its compromise can lead to loss of control of your account and assets within the account.</p>
                </Fragment>
              )}
              styleType="oneLine"
              readOnly
              eye
            />
            <InputCopy
              className="WalletCreationStep3__Input"
              name="Klaytn Wallet Key"
              label="Klaytn Wallet Key"
              value={this.madeWalletKey()}
              isTooltip={true}
              tooltipText={(
                <Fragment>
                  <p>Klaytn Wallet Key contains important information that users need in order to access their account: the private key AND the account address. Users with custom address accounts are required to use Klaytn Wallet Key when signing in to services on Klaytn.</p>
                  <p>Please note that Klaytn Wallet Key should NOT be used for transaction signing; it is for sign-in purpose only.</p>
                </Fragment>
              )}
              styleType="twoLine"
              readOnly
              eye
            />
            </div>
        )}
        nextStepButtons={buttonList}
      />
    )
  }
}

export default WalletCreationStep3
