import React from 'react'
import cx from 'classnames'
import './AccessReminder.scss'
import { KLAYTN_KLAY_UINT, KLAYTN_URL_NAME } from 'constants/url'
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
      {KLAYTN_URL_NAME == 'Main Network' ? (
          <p>
            Klaytn Wallet is for development purpose only. Do not use it for personal or commercial use.
          </p>
        ):(
          <p>
            Klaytn Wallet is for development purpose only. {KLAYTN_KLAY_UINT} on test has no financial value.
          </p>
        )
      }
    </div> 
  </div>
)


export default AccessReminder