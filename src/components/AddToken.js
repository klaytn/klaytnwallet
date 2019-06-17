import React, { Component } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'

import Input from 'components/Input'
import Button from 'components/Button'
import { XButton } from 'components/PlusButton'
import { krc20ABI, onlyAlphabet12Max, humanReadableChange } from 'utils/crypto'
import { caver } from 'klaytn/caver'
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

    this.wallet = caver.klay.accounts && caver.klay.accounts.wallet[0]
  }
  state = {
    name: '',
    address: '',
    decimal: '',
    errorMessage: '',
    symbolErrorMessage: '',
  }

  handleNameChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      symbolErrorMessage: e.target.name === 'name'
        && !onlyAlphabet12Max(e.target.value)
        && 'Length 1~12, alphabet only'
    })
  }
  handleAddressChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      errorMessage: e.target.name === 'address'
        && !caver.utils.isAddress(e.target.value)
        && 'Invalid address',
    })
  }
  handleDecimalChange = (e) => {
    const isNumberString = /^[0-9]*$/.test(e.target.value)
    if (!isNumberString) return
    this.setState({ [e.target.name]: e.target.value })
  }

  add = (callback) => {
    const { name, decimal } = this.state
    let { address } = this.state
    address = humanReadableChange(address)
    const contractInstance = new caver.klay.Contract(krc20ABI, address)
    let fullname
    
    contractInstance.methods.name().call()
      .then((fullname) => fullname = fullname)
      .catch(e => {
        this.setState({ errorMessage: 'Invalid address' })
        return
      })
    contractInstance.methods.balanceOf(this.wallet && this.wallet.address).call()
      .then(balance => {
        if (typeof balance === 'undefined') {
          this.setState({ errorMessage: 'Invalid address' })
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
        this.setState({ errorMessage: 'Invalid address' })
        console.log(e)
      })
  }

  render() {
    const { name, address, decimal, errorMessage, symbolErrorMessage } = this.state
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
            onChange={this.handleNameChange}
            errorMessage={name && symbolErrorMessage}
          />
          <Input
            name="address"
            className="AddToken__input"
            label="Token Contract Address"
            placeholder="Enter token contract address"
            autoComplete="off"
            onChange={this.handleAddressChange}
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
            disabled={!name || !address || !decimal || errorMessage || symbolErrorMessage }
          />
        </div>
        <div className="AddToken__topBlock">

          <div className="AddToken__message">
            <p>Klaytn Wallet supports token transactions for development purposes only.</p>
            <p>Added tokens are stored in your local browser, and persist for the current session; if you close your browser tab or clear your private key, added tokens will also be removed.</p>
          </div>
          <XButton onClick={onClick} className="AddToken__xButton" />
          
        </div>
      </div>
    )
  }
}

export default AddToken
