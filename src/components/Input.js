import React, { Component } from 'react'
import classNames from 'classnames'

import './Input.scss'

type Props = {

}

class Input extends Component<Props> {
  render() {
    const {
      title,
      name,
      type,
      onChange,
      onClick,
      className,
      isValid,
      autocomplete,
      autoFocus,
      placeholder,
      value,
      onLabelClick,
      labelClassName,
    } = this.props

    return (
      <div className={classNames('Input', className, {
        'Input--valid': isValid !== undefined && isValid !== null && isValid,
        'Input--invalid': isValid !== undefined && isValid !== null && !isValid,
      })}
      >
        <label
          onClick={onLabelClick}
          htmlFor={'input-' + name}
          className={classNames('Input__label', labelClassName)}
        >
          {title}
        </label>
        <input
          className="Input__input"
          onClick={onClick}
          placeholder={placeholder}
          autoComplete={autocomplete}
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
