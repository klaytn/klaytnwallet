import React, { Component } from 'react'
import cx from 'classnames'
import Button from 'components/Button'
import { checkValidPassword } from 'utils/crypto'
import InputPassword from 'components/InputPassword'
import { caver } from 'klaytn/caver'
import { download } from 'utils/misc'
import jsonFormat from 'json-format'
import './KeystorePopup.scss'

class KeystorePopup extends Component<Props> {
  
  constructor() {
    super()
  }
  state = {
    balance: null,
    hidePrivateKey: true,
    klayAccounts : sessionStorage.getItem('address'),
    showPopup: false,
    password: '',
    isValidPassword: null,

  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      isValidPassword: e.target.value.length === 0 ? null : checkValidPassword(e.target.value),
    })
  }
  handleDownload = () => {
    const { password } = this.state
    const { privateKey, address, wallerKey } = this.props
    const option ={
      address :address
    }
    const keystore = caver.klay.accounts.encrypt(privateKey, password, option)
    // If user clicked download, clear previous wallet instance.
    this.downloadKeystore(keystore)
  }

  downloadKeystore = (keystore) => {
    const {
      closePopup,
    } = this.props
    const date = new Date()
    const fileName = `keystore-${keystore.address}-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.json`
    download(jsonFormat(keystore), fileName)
    closePopup()
    this.setState({
      password : '',
    })
  }
  render() {
    const {
      popupShow,
      closePopup
    } = this.props
    const { password,isValidPassword } = this.state

    return (
      <div className={cx('createMainPopup keystore_down_popup', {
        'show': popupShow
      })}>
          <div className="createMainPopup__inner">
            <span  className="popup__title">Please set password for your keystore file</span>
            <div className="popup__message2">
              Your keystore file’s security depends on the strength of the password.
              Please set a secure password to protect your account.
            </div>
            <InputPassword
              value={password}
              name="password"
              placeholder="Enter the password"
              label="Password"
              onChange={this.handleChange}
            />
            <div className="popup__bottom__box">
              <Button
                className="popup__btn gery"
                key={'cancel'}
                title={'cancel'}
                onClick={closePopup}
                gray={true}
              />
              <Button
                className="popup__btn download__btn"
                key={'Download'}
                title={'Download'}
                onClick={this.handleDownload}
                disabled={!isValidPassword}
              />
            </div>
          </div>           
     </div>
    )
  }
}


export default KeystorePopup
