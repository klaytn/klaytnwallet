import React, { Component } from 'react'
import classNames from 'classnames'
import { onit } from 'klaytn/onit'

import Input from 'components/Input'
import Button from 'components/Button'
import ui from 'utils/ui'
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
    try {
      const wallet = onit.klay.accounts.wallet.add(privatekey)
      if (typeof accessTo === 'function') accessTo(wallet.address)
    } catch (e) {
      ui.showToast({ msg: '올바르지 않은 개인 키 입니다.' })
    }
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
