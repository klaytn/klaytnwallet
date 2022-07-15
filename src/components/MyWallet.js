import React, { Component, Fragment } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import cx from 'classnames'
import jsonFormat from 'json-format'
import { caver } from 'klaytn/caver'
import { pipe } from 'utils/Functional'
import Input from 'components/Input'
import InputCopy from 'components/InputCopy'
import KeystorePopup from 'components/KeystorePopup'
import MyToken from 'components/MyToken'
import Button from 'components/Button'
import ui from 'utils/ui'
import { download } from 'utils/misc'
import { KLAYTN_SCOPE_URL } from 'walletConstants/url'
import { isHRA, humanReadableChange } from 'utils/crypto'
import './MyWallet.scss'

type Props = {

}

class MyWallet extends Component<Props> {
  constructor() {
    super()
    this.wallet = caver.klay.accounts.wallet[0]
  }

  state = {
    balance: null,
    klayAccounts : sessionStorage.getItem('address'),
    showPopup: false,

  }

  componentWillMount() {
    
    if (!caver.klay.accounts.wallet[0]) {
      browserHistory.replace('/access')
      return
    }
    

  }
  componentDidMount() {
    const walletAddress = window.location.pathname.indexOf('/access/') > -1 ? window.location.pathname.split('/access/')[1] : ''
    let klayAccounts = sessionStorage.getItem('address')
    if(caver.klay.accounts.wallet[0]){
      klayAccounts = klayAccounts ? humanReadableChange(klayAccounts) : caver.klay.accounts.wallet[0].address
    }
    if (walletAddress && klayAccounts !== walletAddress) {
      browserHistory.replace('/ErrorPage')
    }
    
  }
  // HRAChange(address) {
  //   console.log(address)
  //   return caver.utils.hexToUtf8(address)
  // }
  HRADataChange = () => {
    let address = sessionStorage.getItem('address')
    if(address){
      return address
    }else if(this.wallet && this.wallet.address){
      return this.wallet.address
    }
    return ''
  }
  HRAChangeHex = () => {
    let address = sessionStorage.getItem('address')
    if(address && isHRA(address)){
      return humanReadableChange(address)
    }else if(address){
      return address
    }else{  
      return this.wallet.address
    }
  }
  privatekeySet = () => {
    let address = sessionStorage.getItem('address') ? sessionStorage.getItem('address') : this.wallet.address
    return this.wallet.privateKey+'0x00'+address
  }
  openPopup = () => {
    this.setState({ showPopup: true })
  }
  closePopup  = () => {
    this.setState({ showPopup: false })
  }
  render() {
    const { klayAccounts, showPopup } = this.state
    const { isTokenAddMode } = this.props
    return !!this.wallet && (
      <div className={cx('MyWallet', {
        'MyWallet--addingToken': isTokenAddMode,
      })}
      >
        <KeystorePopup
          popupShow={showPopup}
          privateKey={this.wallet.privateKey}
          address={sessionStorage.getItem('address') ? sessionStorage.getItem('address') : this.wallet.address }
          wallerKey={this.privatekeySet()}
          closePopup={this.closePopup}
        />
        <div className="MyWallet__info">
          <header className="Contents__title">My Account Info</header>
          <div className="Inner__Box">
            {/* {klayAccounts && 
            <InputCopy
              className="MyWallet__Input not__margin"
              label="Address"
              name="address"
              value={this.HRADataChange() }
              subName="Custom"
            />} */}
            <InputCopy
              className="MyWallet__Input"
              label={'Address'}
              value={this.wallet.address }
              subName="Hex"
            />
            
            <InputCopy
              className="MyWallet__Input"
              name="privateKey"
              label="Private Key"
              labelClassName="MyWallet__hideButton"
              value={this.wallet.privateKey}
              isTooltip={true}
              tooltipText={(
                <Fragment>
                  <p>This refers to the 32 byte private key commonly used in public key cryptography (following the same format as in Ethereum); it is used for transaction signing.</p>
                  <p>Please store your private key securely, as its compromise can lead to loss of control of your account and assets within the account.</p>
                </Fragment>
              )}
              styleType="pullSize"
              readOnly
              eye
            />
            <InputCopy
              className="MyWallet__Input"
              name="Klaytn Wallet Key"
              label="Klaytn Wallet Key"
              labelClassName="MyWallet__hideButton"
              value={this.privatekeySet()}
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
            <div className="MyWallet__bottom">
              <div className="MyWallet__bottom__box">
                <p className="MyWallet__bottom__title">Transaction List</p>
                <p className="MyWallet__bottom__description">
                  Explore all transactions involving<br />
                  your account with Klaytnscope.
                </p> 
                <a
                  className="scope__transaction"
                  target="self"
                  href={`${KLAYTN_SCOPE_URL}/account/${this.HRAChangeHex()}`}
                >
                  <Button
                    title="View Transaction List"
                    className="MyWallet__viewTransationListButton"
                    gray
                  />
                </a>
              </div>
              <div className="MyWallet__bottom__box">
                <p className="MyWallet__bottom__title">Download Keystore File</p>
                <p className="MyWallet__bottom__description">
                  Keystore file securely stores your<br /> 
                  private key and account address.
                </p> 
                <Button
                  title="keystore Download"
                  className="MyWallet__keyStoreMade"
                  onClick={this.openPopup}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="MyWallet__token">
          <MyToken title="Balance" addClassName="infoList"/>
          
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isTokenAddMode: state.token.isTokenAddMode,
})

export default connect(
  mapStateToProps
)(MyWallet)
