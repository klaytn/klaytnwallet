import React from 'react'

import './MyTokenReminder.scss'
import { KLAYTN_KLAY_UINT } from 'constants/url'
const MyTokenReminder = () => (
  <div className="MyTokenReminder">
    The Klaytn Wallet is for testing, and the {KLAYTN_KLAY_UINT} has no
    financial value.
  </div>
)

export default MyTokenReminder
