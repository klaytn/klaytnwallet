import React, { Component } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import ReactTooltip from 'react-tooltip'

import Input from 'components/Input'
import Button from 'components/Button'
import { XButton } from 'components/PlusButton'
import { krc20ABI } from 'utils/crypto'
import { onit } from 'klaytn/onit'
import { registerToken } from 'actions/token'
import { pipe } from 'utils/Functional'
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
    })
  }

  handleDecimalChange = (e) => {
    const isNumberString = /^[0-9]*$/.test(e.target.value)
    if (!isNumberString) return
    this.setState({ [e.target.name]: e.target.value })
  }

  add = async () => {
    const { name, address, decimal } = this.state
    const contractInstance = new onit.klay.Contract(krc20ABI, address)
    console.log(contractInstance)
    const fullname = await contractInstance.methods.name().call()
    contractInstance.methods.balanceOf(this.wallet && this.wallet.address).call()
      .then(balance => {
        if (typeof balance === 'undefined') {
          ui.showToast({ msg: `Invalid token contract.`})
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
        ui.closePopup()
      })
      .catch((e) => {
        ui.showToast({ msg: `Invalid token contract.`})
        console.log(e)
      })
  }

  render() {
    const { name, address, decimal } = this.state
    const { onClick, className, toggleTokenAddMode } = this.props
    return (
      <div className={cx('AddToken', className)}>
        <div className="AddToken__topBlock">
          <header className="AddToken__header">
            <span className="AddToken__title">Add Tokens</span>
            <XButton onClick={onClick} className="AddToken__xButton" />
          </header>
          <p className="AddToken__description">
            Tokens registered in Testnet are<br />
            only visible in the currently<br />
            active wallet. &nbsp;
            <span
              className="AddToken__more"
              data-tip
              data-for="more-tooltip"
            >
              more
            </span>
          </p>
          <ReactTooltip
            id="more-tooltip"
            className="AddToken__moreTooltip"
            effect="solid"
            place="bottom"
          >
            The registered token is stored in the browser repository,
            so when you delete the cookie, the records of all registered tokens
            are also deleted.
          </ReactTooltip>
        </div>
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
            onClick={pipe(this.add, onClick)}
            disabled={!name || !address || !decimal}
          />
        </div>
      </div>
    )
  }
}

export default AddToken
