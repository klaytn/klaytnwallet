import React, { Component } from 'react'
import classNames from 'classnames'

import './Button.scss'

class Button extends Component<Props> {
  render() {
    const {
      children,
      style,
      disabled,
      title,
      className,
      onClick,
      gray,
      red,
     } = this.props
    return (
      <button
        style={{...style}}
        className={classNames('Button', className, {
          'Button--gray': gray,
          'Button--red': red,
        })}
        onClick={onClick}
        disabled={disabled}
      >
        {title}
        {children}
      </button>
    )
  }
}

export default Button
