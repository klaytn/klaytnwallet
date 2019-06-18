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
    <div className="Inner__Box">
      <header className="TransferComplete__title">
        Transaction Request Complete
      </header>
      <p className="TransferComplete__description">
        Your transaction transfer request is complete. <br />
        More information regarding your transaction can be found on Klaytnscope.
      </p>
      <Button
        title="Send KLAY & Token"
        className="TransferComplete__button"
        gray
        onClick={changeView('form')}
      />
      <a 
        className="TransferComplete__link"
        target="self"
        href={`${KLAYTN_SCOPE_URL}/tx/${transactionHash}`}
      >
        <Button
          title="View Transaction Info"
          className="TransferComplete__button"
        />
      </a>
    </div>  
    
  </div>
)

export default TransferComplete
