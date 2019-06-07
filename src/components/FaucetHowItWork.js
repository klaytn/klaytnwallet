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
      {KLAYTN_KLAY_UINT} Faucet sends a small amount of {KLAYTN_KLAY_UINT} to the designated address for testing.
      To ensure fair distribution to the community, you can run {KLAYTN_KLAY_UINT} Faucet only once every 24 hours.
      The {KLAYTN_KLAY_UINT} reserve in Faucet is replinished every 24 hours.
    </p>
    
  </div>
)

export default FaucetHowItWork
