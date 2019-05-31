import React from 'react'
import cx from 'classnames'

import './AccessReminder.scss'
import { KLAYTN_KLAY_UINT } from 'constants/url'
const AccessReminder = ({ isChecked, onClick }) => (
  <div className="AccessReminder">
    <div 
      className={cx("AccessReminder__checkbox", {
        "AccessReminder__checkbox--checked": isChecked,
        }
      )}
      onClick={onClick} 
    />
    <div className="AccessReminder__description" onClick={onClick} >
      Klaytn Wallet is intended for BApp development purposes only. {KLAYTN_KLAY_UINT} has no financial value.<br />
      Klaytn Wallet은 BApp 개발 목적으로만 사용 가능합니다. {KLAYTN_KLAY_UINT}는 금전적 가치를 지니지 않습니다.
    </div> 
  </div>
)


export default AccessReminder