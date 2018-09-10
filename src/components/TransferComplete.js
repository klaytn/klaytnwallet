import React from 'react'

import Button from 'components/Button'

import './TransferComplete.scss'

type Props = {

}

const TransferComplete = () => (
  <div className="TransferComplete">
    <img
      className="TransferComplete__img"
      src="/images/icon-transfer-complete.svg"
    />
    <header className="TransferComplete__title">
      Complete<br />
      Transaction Request
    </header>
    <p className="TransferComplete__description">
      The transaction transfer request is complete. <br />
      More information about this transaction can be found at Klaytnscope.
    </p>
    <Button
      title="Send KLAY & Tokens"
      className="TransferComplete__button" 
    />
    <Button
      title="View Transaction Info"
      className="TransferComplete__button"
    />
  </div>
)

export default TransferComplete
