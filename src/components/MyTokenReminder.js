import React from 'react'

import './MyTokenReminder.scss'
import { KLAYTN_KLAY_UINT, KLAYTN_URL_NAME } from 'walletConstants/url'
const MyTokenReminder = () => (
  <div className="MyTokenReminder">
    {KLAYTN_URL_NAME == 'Main Network' ? (
        <p>
          Klaytn Wallet is for development purpose only.<br />Do not use it for personal or commercial use.
        </p>
      ):(
        <p>
          Klaytn Wallet is for development purpose only.<br />{KLAYTN_KLAY_UINT} on testnet has no financial value.
        </p>
      )
    }
  </div>
)

export default MyTokenReminder
