import React, { Component } from 'react'
import { connect } from 'react-redux'
import { caverSocket } from 'klaytn/caver'

import Input from 'components/Input'
import Button from 'components/Button'
import ui from 'utils/ui'
import { krc20ABI } from 'utils/crypto'
import store from '../store'

import { registerToken } from 'actions/token'

type Props = {

}

import './RegisterToken.scss'

class RegisterToken extends Component<Props> {
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  register = () => {
    const { name, address, decimal } = this.state
    const contractInstance = new caverSocket.klay.Contract(krc20ABI, address)
    contractInstance.methods.balanceOf('0x006056d2F4C68233F1AE99364445D7b587ef6642').call()
      .then(balance => {
        if (typeof balance === 'undefined') {
          ui.showToast({ msg: `Invalid token contract.`})
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
      })
      .catch((e) => {
        ui.showToast({ msg: `Invalid token contract.`})
        console.log(e)
      })
  }

  render() {
    return (
      <div className="RegisterToken">
        <Input className="RegisterToken__input" title="token name" name="name" onChange={this.handleChange} />
        <Input className="RegisterToken__input" title="token contract address" name="address" onChange={this.handleChange} />
        <Input className="RegisterToken__input" title="Number of digits (decimal)" name="decimal" onChange={this.handleChange} />
        <Button title="등록" onClick={this.register} className="RegisterToken__register" />
      </div>
    )
  }
}

export default RegisterToken
