import React from 'react'
import cx from 'classnames'

import {
    has5and13Characters,
    hasNoSpecialCharacters,
    onlyAlphabetAndNumbers,
    hasNoFirstNumber

  } from 'utils/crypto'

import './AccountNameTooltip.scss'

const AccountNameTooltip = ({ value = '' }) => {
  return (
    <div className="PasswordTooltip">
      <p className="PasswordTooltip__title">
        Your name must have:
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
        First character must be an alphabet (not a number)
      </p>
      <p className={cx('PasswordTooltip__item', {
        'PasswordTooltip__item--active': hasNoSpecialCharacters(value),
      })}
      >
        No special characters allowed
      </p>
    </div>
  )
}
export default AccountNameTooltip
