import React from 'react'
import cx from 'classnames'

import './AccessReminder.scss'

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
      Klaytn Wallet is intended for BApp development purposes only. Test_KLAY has no financial value.<br />
      Klaytn Wallet은 BApp 개발 목적으로만 사용 가능합니다. Test_KLAY는 금전적 가치를 지니지 않습니다.
    </div> 
  </div>
)


export default AccessReminder