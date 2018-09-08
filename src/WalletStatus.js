import React from 'react'
import classNames from 'classnames'

import './WalletStatus.scss'

type Props = {
  address: string,
}

/**
 * Show current connected wallet address (only in DEV environment)
 * @param {string} address current wallet address
 */
const WalletStatus = ({ address }: Props) => (
  <div className="WalletStatus">
    <div className={classNames('WalletStatus__statusCircle', {
      'WalletStatus__statusCircle--injected': address,
    })}
    />
    {address
      ? <span className="WalletStatus__msg">지갑주소: {address}</span>
      : <span className="WalletStatus__msg">지갑을 불러오는중...</span>
    }
  </div>
)

export default WalletStatus
