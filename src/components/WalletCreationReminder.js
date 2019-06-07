import React from 'react'
import './WalletCreationReminder.scss'
import { KLAYTN_KLAY_UINT, KLAYTN_URL_NAME } from 'constants/url'
const WalletCreationReminder = () => (
  <div className="WalletCreationReminder">
    {KLAYTN_URL_NAME == 'Main Network' ? (
        <p>
          Klaytn Wallet is for development purpose only. Do not be used for personal or commercial use.<br />
          Klaytn Wallet은 개발 용도로만 사용 가능합니다. 상용 목적의 사용을 금합니다.
        </p>
      ):(
        <p>
          Klaytn Wallet is for development purpose only. {KLAYTN_KLAY_UINT} on test has no financial value.<br />
          Klaytn Wallet은 개발 용도로만 사용 가능합니다. Testnet의 {KLAYTN_KLAY_UINT}는 금전적 가치가 없습니다.  
        </p>
      )
    }
  </div>
)

export default WalletCreationReminder
