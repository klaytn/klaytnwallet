import React, { Component } from 'react'
import cx from 'classnames'

import File from 'components/File'

import { copy } from 'utils/misc'

import './InputFile.scss'

class InputFile extends Component<Props> {
  render() {
    const {
      className,
      name,
      value,
      label,
      onChange,
      onKeyPress,
      placeholder,
      width,
      disabled,
      err,
      errorMessage,
    } = this.props

    return (
      <div className={cx('InputFile', className, { 'InputFile--err': errorMessage })}>
        {label && <label className="InputFile__label" htmlFor={name}>{label}</label>}
        <div className="InputFile__inputWrapper">
          <input
            ref={($input) => this.$input = $input}
            name={name}
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            className="InputFile__input"
            readOnly
          />
          <File
            className="InputFile__uploadButton"
            onChange={onChange}
            title="UPLOAD"
            icon="icon-upload"
          />
        </div>
        {errorMessage !== undefined && (
          <p className={cx('Input__error', {'show':errorMessage})}>{errorMessage || ''}</p>
        )}
      </div>
    )
  }
}

export default InputFile
