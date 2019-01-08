import React from 'react'

import withModal from 'enhancers/withModal'
import Button from './Button'

import './FaucetWarningModal.scss'

const FaucetWarningModal = ({ onCloseModal }) => (
  <div className="FaucetWarningModal">
    <h1 className="FaucetWarningModal__title">This Klaytn Wallet is for testing.</h1>
    <article className="FaucetWarningModal__content">
      The KLAY Faucet can only be used for development<br />
      purpose by authorized developers.<br />
      If you need the KLAY faucet for development purpose,<br />
      please contact us with your name/company/purpose at<br />
      <span className="FaucetWarningModal__mailAddress">
        contact@klaytn.com.
      </span>
    </article>
    <a href="mailto:contact@klaytn.com">
      <Button className="FaucetWarningModal__sendMailButton">Send E-mail</Button>
    </a>
    <Button
      className="FaucetWarningModal__closeButton"
      title="Close"
      onClick={onCloseModal}
    />
  </div>
)

export default withModal(FaucetWarningModal, true)
