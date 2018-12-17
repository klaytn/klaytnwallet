import React, { Component, Fragment } from 'react'

import Modal from 'components/Modal'
import LandingItem from 'components/LandingItem'

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
          <label className="Landing__label">Aspen net</label>
          <header className="Landing__title">Welcome to Klaytn Wallet</header>
          <LandingItem
            title="The Klaytn Network does not store your private key on the server."
            description="Your private key is stored only in the browser’s storage and is automatically deleted when you close the browser."
            img="/static/images/illust-not-db.svg"
          />
          <LandingItem
            title="The Klaytn Network recommends that you download the Keystore file and save it securely."
            description="The Klaytn Wallet shall NOT BE HELD RESPONSIBLE for the loss of your password for the private key or keystore file."
            img="/static/images/illust-save-key.svg"
          />
          <LandingItem
            title="The Klaytn Network recommends  that you use the Testnet-based Klaytn Wallet for testing purpose ONLY."
            description="Klaytn Wallet has no obligation to compensate or assume liability for any financial loss arising out of its use for any other purpose."
            img="/static/images/illust-never-send.svg"
          />
        </div>
      </Fragment>
    )
  }
}

export default Landing
