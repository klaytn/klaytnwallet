import React, { Component } from 'react'
import cx from 'classnames'

import { copy } from 'utils/misc'

import './InputCopy.scss'

class InputCopy extends Component<Props> {
  state = {
    isCopied: false,
    showPassword: false,
  }

  copy = () => {
    if (this.$input)
    copy(this.$input)
    this.setCopyState(true)
    setTimeout(() => this.setCopyState(false), 1500)
  }

  setCopyState = (isCopied) => this.setState({ isCopied })

  toggleShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    })
  }

  render() {
    const { isCopied, showPassword } = this.state
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
      eye,
    } = this.props

    return (
      <div className={cx('InputCopy', className)}>
        {label && <label className="InputCopy__label" htmlFor={name}>{label}</label>}
        <div className="InputCopy__inputWrapper">
          <input
            ref={($input) => this.$input = $input}
            name={name}
            type={eye
                ? !showPassword && 'password'
                : 'text'}
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            className={cx('InputCopy__input', { 'InputCopy--err': err })}
            readOnly
          />
          {eye && (
            <button
              className={cx('InputCopy__eye', {
                'InputCopy__eye--show': !showPassword,
                'InputCopy__eye--hide': showPassword,
              })}
              onClick={this.toggleShowPassword}
              tabIndex="-1"
            />
          )}
          <button
            className="InputCopy__copyButton"
            onClick={this.copy}
            tabIndex="-1"
          >
            <img className="InputCopy__icon" src="/images/icon-copy.svg" />
            Copy
          </button>
        </div>
        <p
          className={cx('InputCopy__copiedText', {
            'InputCopy__copiedText--copied': isCopied,
          })}
        >
          Copied to clipboard
        </p>
      </div>
    )
  }
}

export default InputCopy
