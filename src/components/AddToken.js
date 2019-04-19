import React, { Component } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'

import Input from 'components/Input'
import Button from 'components/Button'
import { XButton } from 'components/PlusButton'
import { krc20ABI } from 'utils/crypto'
import { onit } from 'klaytn/onit'
import { registerToken } from 'actions/token'
import ui from 'utils/ui'

import store from '../store'

import * as tokenActions from 'actions/token'

type Props = {

}

import './AddToken.scss'

class AddToken extends Component<Props> {
  constructor() {
    super()

    this.wallet = onit.klay.accounts && onit.klay.accounts.wallet[0]
  }
  state = {
    name: '',
    address: '',
    decimal: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      errorMessage: e.target.name === 'address'
        && !onit.utils.isAddress(e.target.value)
        && 'Invalid address'
    })
  }

  handleDecimalChange = (e) => {
    const isNumberString = /^[0-9]*$/.test(e.target.value)
    if (!isNumberString) return
    this.setState({ [e.target.name]: e.target.value })
  }

  add = (callback) => {
    const { name, address, decimal } = this.state
    const contractInstance = new onit.klay.Contract(krc20ABI, address)
    let fullname
    contractInstance.methods.name().call()
      .then((fullname) => fullname = fullname)
      .catch(e => {
        this.setState({ errorMessage: 'Token contract address is invalid' })
        return
      })
    contractInstance.methods.balanceOf(this.wallet && this.wallet.address).call()
      .then(balance => {
        if (typeof balance === 'undefined') {
          this.setState({ errorMessage: 'Token contract address is invalid' })
          return
        }
        store.dispatch(
          registerToken({
            fullname: fullname || name,
            name,
            address,
            decimal,
          })
        )
        typeof callback === 'function' && callback()
        ui.closePopup()
      })
      .catch((e) => {
        this.setState({ errorMessage: 'Token contract address is invalid' })
        console.log(e)
      })
  }

  render() {
    const { name, address, decimal, errorMessage } = this.state
    const { onClick, className, toggleTokenAddMode } = this.props
    return (
      <div className={cx('AddToken', className)}>
        
        <div className="AddToken__downBlock">
          <Input
            name="name"
            className="AddToken__input"
            label="Token Symbol"
            placeholder="Enter new token name"
            autoComplete="off"
            onChange={this.handleChange}
          />
          <Input
            name="address"
            className="AddToken__input"
            label="Token Contract Address"
            placeholder="Enter token contract address"
            autoComplete="off"
            onChange={this.handleChange}
            errorMessage={address && errorMessage}
          />
          <Input
            name="decimal"
            className="AddToken__input"
            label="Decimals"
            placeholder="Enter decimals"
            autoComplete="off"
            value={decimal}
            onChange={this.handleDecimalChange}
          />
          <Button
            title="Save"
            className="AddToken__saveButton"
            onClick={() => this.add(onClick)}
            disabled={!name || !address || !decimal}
          />
        </div>
        <div className="AddToken__topBlock">

          <div className="AddToken__message">
            Tokens registered on Testnet are only visible at your currently active wallet.<br/>
            Official registration of tokens are not supported on testnet at the moment. (to be provided soon)<br/>
            Your registered token is stored in the browser repository; all registration history for your token shall be deleted if you delete your cookie.

          </div>
          <XButton onClick={onClick} className="AddToken__xButton" />
          
        </div>
      </div>
    )
  }
}

export default AddToken
