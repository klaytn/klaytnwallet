import React, { Component, Fragment } from 'react'

import Modal from 'components/Modal'
import LandingItem from 'components/LandingItem'
import { Link } from 'react-router'
import cookie from 'utils/cookie'

import './Landing.scss'

class Landing extends Component {
  state = {
    isShowingModal: false,
  }

  componentDidMount() {
    this.showModal()
  }

  showModal = () => {
    if (cookie.get('hideWalletScamPopup')) return
    this.setState({ isShowingModal: true })
  }

  closeModal = () => {
    this.setState({ isShowingModal: false })
  }

  render() {
    const { isShowingModal } = this.state
    return (
      <Fragment>
        <Modal
          closeModal={this.closeModal}
          isShowingModal={isShowingModal}
        />
        <div className="Landing">     
          <header className="Landing__title">Welcome to Klaytn Wallet</header>
          <p className="Landing__label">B a o b a b  N e t w o r k</p>
          <div className="main__link_list">
            <ul>
              <li><Link to={'/create'}><button className="create"><img className="TabItem__icon" src="/static/images/icon-create-on.svg"/>Create Account</button></Link></li>
              <li><Link to={'/access'}><button className="info"><img className="TabItem__icon" src="/static/images/icon-info-on.svg"/>View Account Info</button></Link></li>
              <li><Link to={'/transfer'}><button className="send"><img className="TabItem__icon" src="/static/images/icon-send-on.svg"/>Send KLAY &amp; Tokens</button></Link></li>
            </ul>
          </div>
          <div className="main__text__box">
            <div className="main__text__title">About Klaytn Wallet :-)</div>
            <ul className="main__text__list">
              <li>
                Klaytn network does not store your private key on its servers.
                Your private key is stored only in your browser’s local storage and is automatically deleted when you close the browser or when you click the Clear Private Key button.
              </li>
              <li>
                Klaytn recommends that you use Klaytn Wallet on the Baobab testnet for TESTING ONLY, and NOT for any other purpose.
              </li>
              <li>
                Klaytn recommends that you save your downloaded keystore file securely. Klaytn Wallet shall NOT BE HELD RESPONSIBLE for the loss of your password or your keystore file.
              </li>
            </ul>


          </div>
        </div>
      </Fragment>
    )
  }
}

export default Landing
