import React from 'react'
import cx from 'classnames'

import {
    has8MoreCharacters,
    hasSpecialCharacters,
    hasAtLeastOneNumber
  } from 'utils/crypto'

import './PasswordTooltip.scss'

const PasswordTooltip = ({ value = '' }) => {
  return (
    <div className="PasswordTooltip">
      <p className="PasswordTooltip__title">
        Your password must have:
      </p>
      <p className={cx('PasswordTooltip__item', {
        'PasswordTooltip__item--active': has8MoreCharacters(value),
      })}
      >
        8 or more characters
      </p>
      <p className={cx('PasswordTooltip__item', {
        'PasswordTooltip__item--active': hasSpecialCharacters(value),
      })}
      >
        Special characters
      </p>
      <p className={cx('PasswordTooltip__item', {
        'PasswordTooltip__item--active': hasAtLeastOneNumber(value),
      })}
      >
        At least one number
      </p>
    </div>
  )
}
export default PasswordTooltip
