import React from 'react'
import cx from 'classnames'

type Props = {
  onClick: func,
}

import './PlusButton.scss'

export const PlusButton = ({
  className,
  onClick,
}) => <button onClick={onClick} className={cx('PlusButton', className)} />

export const XButton = ({
  className,
  onClick,
}) => <button onClick={onClick} className={cx('XButton', className)} />

export default PlusButton
