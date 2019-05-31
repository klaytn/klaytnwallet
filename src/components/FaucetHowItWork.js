import React from 'react'
import cx from 'classnames'

import './FaucetHowItWork.scss'
import { KLAYTN_KLAY_UINT } from 'constants/url'
const FaucetHowItWork = ({ leftBlock }) => (
  <div className="FaucetHowItWork">
    <header className="FaucetHowItWork__howItWorkTitle">
      How does the Klay Faucet work?
    </header>
    <p className="FaucetHowItWork__howItWorkDescription">
      Please run the {KLAYTN_KLAY_UINT} Faucet to receive a small amount of {KLAYTN_KLAY_UINT} for testing.
      For the purpose of preserving enough {KLAYTN_KLAY_UINT} for its community users,
      {KLAYTN_KLAY_UINT} may not be further distributed if you have recently used the {KLAYTN_KLAY_UINT} Faucet.
      The {KLAYTN_KLAY_UINT} Faucet is replenished per every 86,400 blocks(24 hours).
    </p>
    
  </div>
)

export default FaucetHowItWork
