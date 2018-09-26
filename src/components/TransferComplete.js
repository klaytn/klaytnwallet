import React from 'react'

import Button from 'components/Button'
import { KLAYTN_SCOPE_URL } from 'constants/url'

import './TransferComplete.scss'

type Props = {

}

const TransferComplete = ({
  changeView,
  transactionHash = '',
}) => (
  <div className="TransferComplete">
    <img
      className="TransferComplete__img"
      src="/static/images/icon-transfer-complete.svg"
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
      gray
      onClick={changeView('form')}
    />
    <a
      target="self"
      href={`${KLAYTN_SCOPE_URL}/transaction/${transactionHash}`}
    >
      <Button
        title="View Transaction Info"
        className="TransferComplete__button"
      />
    </a>
  </div>
)

export default TransferComplete
