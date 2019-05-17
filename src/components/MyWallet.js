import React, { Component, Fragment } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import cx from 'classnames'
import jsonFormat from 'json-format'
import { caver } from 'klaytn/caver'
import { pipe } from 'utils/Functional'
import Input from 'components/Input'
import InputCopy from 'components/InputCopy'
import MyToken from 'components/MyToken'
import Button from 'components/Button'
import ui from 'utils/ui'
import { RegisterTokenButton } from 'components/RegisterToken'
import { download } from 'utils/misc'
import { KLAYTN_SCOPE_URL } from 'constants/url'

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
    hidePrivateKey: true,
    klayAccounts : sessionStorage.getItem('address')
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
      klayAccounts = klayAccounts ? caver.utils.humanReadableStringToHexAddress(klayAccounts) : caver.klay.accounts.wallet[0].address
    }
    if (walletAddress && klayAccounts !== walletAddress) {
      browserHistory.replace('/ErrorPage')
    }
    
  }
  // HRAChange(address) {
  //   console.log(address)
  //   return caver.utils.hexToUtf8(address)
  // }
  togglePrivateKey = () => {
    this.setState({ hidePrivateKey: !this.state.hidePrivateKey })
  }
  HRADataChange = () => {
    const address = sessionStorage.getItem('address')
    if(address){
      return address
    }else if(this.wallet && this.wallet.address){
      return this.wallet.address
    }
    return ''
  }
  HRAChangeHex = () => {
    const address = sessionStorage.getItem('address')
    if(address){
      return caver.utils.humanReadableStringToHexAddress(address)
    }else if(this.wallet && this.wallet.address){
      return this.wallet.address
    }
    return ''
  }
  privatekeySet = () => {
    const address = sessionStorage.getItem('address')
    if(address){
      return this.wallet.privateKey+'0x01'+caver.utils.humanReadableStringToHexAddress(address)
    }
    return this.wallet.privateKey
  }
  
  render() {
    const { hidePrivateKey, klayAccounts } = this.state
    const { isTokenAddMode } = this.props
    return !!this.wallet && (
      <div className={cx('MyWallet', {
        'MyWallet--addingToken': isTokenAddMode,
      })}
      >
        <div className="MyWallet__info">
          <header className="Contents__title">My Wallet Info</header>
          <div className="Inner__Box">
            {klayAccounts && 
            <InputCopy
              className="MyWallet__Input not__margin"
              label="Address"
              name="address"
              value={this.HRADataChange() }
              subName="Custom"
            />}
            <InputCopy
              className="MyWallet__Input"
              label={!klayAccounts && 'Address'}
              value={this.wallet.address }
              subName="Hex"
            />
            
            <InputCopy
              className="MyWallet__Input"
              name="privateKey"
              label="Private Key"
              onLabelClick={this.togglePrivateKey}
              labelClassName="MyWallet__hideButton"
              type={hidePrivateKey ? 'password' : 'text'}
              value={this.wallet.privateKey}
              isTooltip={true}
              tooltipText={(
                <Fragment>This refers to the 32 byte private key commonly used in public key cryptography (following the same format as in Ethereum); it is used for transaction signing.<br />
                Please store your private key securely, as its compromise can lead to loss of control of your account and assets within the account.</Fragment>
              )}
              readOnly
              autoFocus
              eye
            />
            {klayAccounts && 
            <InputCopy
              className="MyWallet__Input"
              name="Klaytn HRA Private Key"
              label="Klaytn HRA Private Key"
              onLabelClick={this.togglePrivateKey}
              labelClassName="MyWallet__hideButton"
              type={hidePrivateKey ? 'password' : 'text'}
              value={this.privatekeySet()}
              isTooltip={true}
              tooltipText={(
                <Fragment>Klaytn HRA Private Key contains important information that users need in order to access their account: the private key AND the account address. Users with custom-address Klaytn accounts are required to use Klaytn HRA Private Key when signing in to services on Klaytn. <br />
                Please note that Klaytn HRA Private Key should NOT be used for transaction signing; it is for sign-in purpose only.</Fragment>
              )}
              readOnly
              autoFocus
              eye
            />
            }
            <div className="MyWallet__viewTransation">
              <p className="MyWallet__transactionListTitle">Transaction List</p>
              <p className="MyWallet__transactionListDescription">
                Explore all transactions involving your account<br />
                with Klaytn Scope.
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
          </div>
          
        </div>
        <div className="MyWallet__token">
          <MyToken title="Balance" addClassName="infoList"/>
          <RegisterTokenButton />
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
