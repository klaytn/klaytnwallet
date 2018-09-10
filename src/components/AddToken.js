import React, { Component } from 'react'
import cx from 'classnames'

import Input from 'components/Input'
import { XButton } from 'components/PlusButton'

type Props = {

}

import './AddToken.scss'

class AddToken extends Component<Props> {
  render() {
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
            active wallet.
          </p>
        </div>
        <div className="AddToken__downBlock">
          <Input
            className="AddToken__input"
            label="Token Symbol"
            placeholder="Enter new token name"
          />
          <Input
            className="AddToken__input"
            label="Token Contract Address"
            placeholder="Enter token contract address"
          />
          <Input
            className="AddToken__input"
            label="Decimals"
            placeholder="Enter decimals"
          />
        </div>
      </div>
    )
  }
}

export default AddToken
