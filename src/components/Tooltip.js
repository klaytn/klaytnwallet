// @flow
import React from 'react'
import cx from 'classnames'

import type { Node } from 'react'

import './Tooltip.scss'

type Props = {
  className?: string,
  message: string | Node,
  direction?: string,
  width?: string,
  children: string | Node,
  isMain?: boolean,
}

const Tooltip = ({
  className,
  message,
  direction,
  width,
  children,
  isMain,
}: Props) => (
  <div className={cx('Tooltip', className)}>
    {children}
    <div
      className={cx('Tooltip__tooltip', {
        'Tooltip__tooltip--top': direction === 'top',
        'Tooltip__tooltip--bottom': direction === 'bottom',
        'Tooltip__tooltip--left': direction === 'left',
        'Tooltip__tooltip--right': direction === 'right',
        'Tooltip__tooltip--main': isMain,
      })}
      style={{ width }} // TODO: Change inline styling to CSS when I find good solution
    >
      {message}
    </div>
  </div>
)

export default Tooltip
