import React, { Component } from 'react'
import classNames from 'classnames'

import './Button.scss'

class Button extends Component<Props> {
  render() {
    const { children, disabled, title, className, onClick } = this.props
    return (
      <button
        className={classNames('Button', className)}
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
