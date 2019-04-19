import React from 'react'
import cx from 'classnames'

import './FaucetHowItWork.scss'

const FaucetHowItWork = ({ leftBlock }) => (
  <div className="FaucetHowItWork">
    <header className="FaucetHowItWork__howItWorkTitle">
      How does the Klay Faucet work?
    </header>
    <p className="FaucetHowItWork__howItWorkDescription">
      Please run the Test_KLAY Faucet to receive a small amount of Test_KLAY for testing.
      For the purpose of preserving enough Test_KLAY for its community users,
      Test_KLAYs may not be further distributed if you have recently used the Test_KLAY Faucet.
      The Test_KLAY Faucet is replenished per every 86,400 blocks(24 hours).
    </p>
    
  </div>
)

export default FaucetHowItWork
