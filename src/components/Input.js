import React, { Component } from 'react'
import classNames from 'classnames'

import './Input.scss'

class Input extends Component<Props> {

  render() {
    const {
      label,
      name,
      type,
      onChange,
      onClick,
      className,
      isValid,
      autoComplete,
      autoFocus,
      placeholder,
      value,
      onLabelClick,
      labelClassName,
      tooltip,
    } = this.props

    return (
      <div className={classNames('Input', className, {
        'Input--valid': isValid !== undefined && isValid !== null && isValid,
        'Input--invalid': isValid !== undefined && isValid !== null && !isValid,
      })}
      >
        {label && (
          <label
            onClick={onLabelClick}
            htmlFor={'input-' + name}
            className={classNames('Input__label', labelClassName)}
          >
            {label}
          </label>
        )}
        <input
          className="Input__input"
          onClick={onClick}
          placeholder={placeholder}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          id={'input-' + name}
          name={name}
          onChange={onChange}
          type={type}
          value={value}
        />
    </div>
    )
  }
}

export default Input
