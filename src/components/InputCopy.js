import React, { Component } from 'react'
import cx from 'classnames'

import { copy } from 'utils/misc'

import './InputCopy.scss'

class InputCopy extends Component<Props> {
  state = {
    isCopied: false,
  }

  copy = () => {
    if (this.$input)
    copy(this.$input)
    this.setCopyState(true)
    setTimeout(() => this.setCopyState(false), 1500)
  }

  setCopyState = (isCopied) => this.setState({ isCopied })

  render() {
    const { isCopied } = this.state
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
      <div className={cx('InputCopy', className)}>
        {label && <label className="Input__label" htmlFor={name}>{label}</label>}
        <div className="InputCopy__input">
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
