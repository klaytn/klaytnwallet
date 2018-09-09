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
    } = this.props

    return (
      <div className={cx('InputFile', className)}>
        {label && <label className="Input__label" htmlFor={name}>{label}</label>}
        <div className="InputFile__input">
          <input
            ref={($input) => this.$input = $input}
            name={name}
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            className={cx('Input', { 'Input--err': err })}
            readOnly
          />
          <File
            className="InputFile__uploadButton"
            onChange={onChange}
            title="Upload"
            icon="icon-upload"
          />
        </div>
      </div>
    )
  }
}

export default InputFile
