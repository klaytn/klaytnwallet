import React, { Component } from 'react'
import cx from 'classnames'
import ReactTooltip from 'react-tooltip'

import Input from 'components/Input'
import Button from 'components/Button'
import { XButton } from 'components/PlusButton'
import { krc20ABI } from 'utils/crypto'
import { onit } from 'klaytn/onit'
import { registerToken } from 'actions/token'

import store from '../store'

type Props = {

}

import './AddToken.scss'

class AddToken extends Component<Props> {
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

  add = () => {
    const { name, address, decimal } = this.state
    const contractInstance = new onit.klay.Contract(krc20ABI, address)
    contractInstance.methods.balanceOf('0x006056d2F4C68233F1AE99364445D7b587ef6642').call()
      .then(balance => {
        if (typeof balance === 'undefined') {
          ui.showToast({ msg: `올바르지 않은 토큰 컨트랙트입니다.`})
          return
        }
        store.dispatch(
          registerToken({
            name,
            address,
            decimal,
          })
        )
        ui.closePopup()
        ui.showToast({ msg: `${name} 토큰이 등록되었습니다.`})
      })
      .catch((e) => {
        ui.showToast({ msg: `올바르지 않은 토큰 컨트랙트입니다.`})
        console.log(e)
      })
  }

  render() {
    const { name, address, decimal } = this.state
    const { onClick, className } = this.props
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
            onChange={this.handleChange}
          />
          <Button
            title="Save"
            className="AddToken__saveButton"
            onClick={this.add}
            disabled={!name || !address || !decimal}
          />
        </div>
      </div>
    )
  }
}

export default AddToken
