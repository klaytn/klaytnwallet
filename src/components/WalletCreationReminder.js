import React from 'react'
import './WalletCreationReminder.scss'
import { KLAYTN_KLAY_UINT, KLAYTN_URL_NAME } from 'constants/url'
const WalletCreationReminder = () => (
  <div className="WalletCreationReminder">
    {KLAYTN_URL_NAME == 'Main Network' ? (
        <p>
          Klaytn Wallet is for development purpose only. Do not use it for personal or commercial use.
        </p>
      ):(
        <p>
          Klaytn Wallet is for development purpose only. {KLAYTN_KLAY_UINT} on test has no financial value.
        </p>
      )
    }
  </div>
)

export default WalletCreationReminder
