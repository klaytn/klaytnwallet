import React from 'react'
import cx from 'classnames'

import './FaucetHowItWork.scss'

const FaucetHowItWork = ({ leftBlock }) => (
  <div className="FaucetHowItWork">
    <header className="FaucetHowItWork__howItWorkTitle">
      How does this work?
    </header>
    <p className="FaucetHowItWork__howItWorkDescription">
      The Test_KLAY Faucet runs on Baobab Network.<br />
      Please run the Test_KLAY Faucet to receive a small amount of Test_KLAY for testing.<br />
      For the purpose of preserving enough Test_KLAY for its community users, Test_KLAYs may not be further distributed if you have recently used the Test_KLAY Faucet.
      The Test_KLAY Faucet is replenished per every 900 blocks.
    </p>
    <div className={cx('FaucetHowItWork__faucetableBlock', {
      'FaucetHowItWork__faucetableBlock--visible': leftBlock,
    })}
    >
      <p className="FaucetHowItWork__faucetableBlockTitle">You can run faucet after</p>
      <p className="FaucetHowItWork__faucetableBlockNumber">{leftBlock} blocks.</p>
    </div>
  </div>
)

export default FaucetHowItWork
