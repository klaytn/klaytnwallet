import React, { Component } from 'react'
import etherUtil from 'ethereumjs-util'
import { browserHistory } from 'react-router'

import privateKeyGen from 'klaytn/privateKeyGenerator'
import { initWalletSuccess } from 'actions/wallet'
import ui from 'utils/ui'
import store from '../store'

import './Login.scss'

type Props = {
  
}

class Login extends Component<Props> {
  state = {
    id: '',
    password: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  login = () => {
    const { id, password } = this.state

    const signToken = `${id}${password}`
    const existPrivateKey = window.localStorage.getItem(signToken)

    if (!existPrivateKey) {
      const privateKey = privateKeyGen.generate()
      window.localStorage.setItem(`${id}${password}`, privateKey)
      const walletAddress = '0x' + etherUtil.privateToAddress(etherUtil.toBuffer('0x' + privateKey)).toString('hex')
      store.dispatch(initWalletSuccess(walletAddress, privateKey))
      ui.closePopup()
      browserHistory.push(`/profile/${walletAddress}`)
    } else {
      const walletAddress = '0x' + etherUtil.privateToAddress(etherUtil.toBuffer('0x' + existPrivateKey)).toString('hex')
      store.dispatch(initWalletSuccess(walletAddress, existPrivateKey))
      ui.closePopup()
      browserHistory.push(`/profile/${walletAddress}`)
    }
  }

  render() {
    return (
      <div className="Login">
        <img className="Login__img" src="/images/kakaotalk.png" />
        <input
          onChange={this.handleChange}
          className="Login__input"
          name="id"
          type="text"
          placeholder="카카오계정(이메일)"
        />
        <input
          onChange={this.handleChange}
          className="Login__input"
          name="password"
          type="password"
          placeholder="비밀번호"
        />
        <button onClick={this.login} className="Login__button">로그인</button>
      </div>
    )
  }
}

export default Login
