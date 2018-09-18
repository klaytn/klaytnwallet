import React, { Component } from 'react'
import cx from 'classnames'

import './Button.scss'

type Props = {

}

class Button extends Component<Props> {
  render() {
    const { icon, title, onClick, className, disabled, gray } = this.props
    return (
      <button
        className={cx('Button', className, {
          'Button--gray': gray,
        })}
        onClick={onClick}
      >
        {icon && <img className="Button__icon" src={`/static/images/${icon}.svg`} />}
        <span className="Button__title">{title}</span>
      </button>
    )
  }
}

export default Button
