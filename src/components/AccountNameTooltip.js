import React from 'react'
import cx from 'classnames'

import {
    has5and13Characters,
    onlyAlphabetAndNumbers,
    hasNoFirstNumber

  } from 'utils/crypto'

import './AccountNameTooltip.scss'

const AccountNameTooltip = ({ value = '' }) => {
  return (
    <div className="PasswordTooltip">
      <p className="PasswordTooltip__title">
        Your address must have:
      </p>
      <p className={cx('PasswordTooltip__item', {
        'PasswordTooltip__item--active': has5and13Characters(value),
      })}
      >
        Between 5 and 13 characters
      </p>
      <p className={cx('PasswordTooltip__item', {
        'PasswordTooltip__item--active': onlyAlphabetAndNumbers(value),
      })}
      >
        Alphabet or numbers only
      </p>
      <p className={cx('PasswordTooltip__item', {
        'PasswordTooltip__item--active': hasNoFirstNumber(value),
      })}
      >
        First character must be<br/>an alphabet (not a number)
      </p>
    </div>
  )
}
export default AccountNameTooltip
