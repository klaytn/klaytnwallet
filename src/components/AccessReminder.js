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
    <div className="AccessReminder__description">
      This Klaytn Wallet is for <span>testing</span>, 
      and the Test_KLAY has no financial value. <br />
      이 Klaytn Wallet은 테스트를 위한 것이며, Test_KLAY는 금전적 가치를 지니지 않습니다.
    </div> 
  </div>
)


export default AccessReminder