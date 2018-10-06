import React, { Component } from 'react'
import classNames from 'classnames'
import { onit } from 'klaytn/onit'

import Input from 'components/Input'
import Button from 'components/Button'
import { isValidPrivateKey } from 'utils/crypto'

import './AccessByPrivatekey.scss'

type Props = {

}

class AccessByPrivateKey extends Component<Props> {
  state = {
    privatekey: '',
    isValid: null,
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      isValid: e.target.value.length === 0
        ? null
        : isValidPrivateKey(e.target.value),
    })
  }

  access = () => {
    const { privatekey } = this.state
    const { accessTo } = this.props
    const wallet = onit.klay.accounts.wallet.add(privatekey)
    // WARNING: sessionStorage has private key. it expired when window tab closed.
    sessionStorage.setItem('prv', privatekey)
    if (typeof accessTo === 'function') accessTo(wallet.address)
  }

  render() {
    const { isValid } = this.state
    return (
      <div className="AccessByPrivatekey">
        <Input
          label="Private Key"
          type="text"
          autoFocus
          name="privatekey"
          className="AccessByPrivatekey__input"
          placeholder="Enter the private key"
          onChange={this.handleChange}
          isValid={isValid}
          autocomplete="off"
          errorMessage={isValid === false && 'Invalid key'}
        />
        <Button
          className="AccessByPrivatekey__button"
          disabled={!isValid}
          onClick={this.access}
          title="Access"
        />
      </div>
    )
  }
}

export default AccessByPrivateKey
