import React, { Component, Fragment } from 'react'
import cx from 'classnames'

import { copy, madeBulletString } from 'utils/misc'
import Tooltip from 'components/Tooltip'
import './InputPasswordCopy.scss'

class InputPasswordCopy extends Component<Props> {
  state = {
    isCopied: false,
    showPassword: false,
  }

  copy = () => {
    const { clickEvent } = this.props
    if (typeof clickEvent === 'function') {
      clickEvent(true)
    }
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
      disabled,
      err,
      eye,
      isTooltip,
      tooltipText,
      subName,
      styleType,
    } = this.props
    
    const bullet = madeBulletString((value && value.length) || 112);
    
    return (
      <div className={cx('InputPasswordCopy', className)}>
        {label && <label className="InputPasswordCopy__label" htmlFor={name}>{label}</label>}
        
        {isTooltip && <Tooltip
          className="AccountOverviewSection__tooltip"
          direction="top"
          message={(
            <Fragment>{tooltipText}</Fragment>
          )}><img className="button__question__icon" src="/static/images/icon-question-mark.svg"/>
          </Tooltip>}

        <div className={cx('InputPasswordCopy__inputWrapper InputPasswordCopy__inputWrapper__type3', { 'InputPasswordCopy__inputWrapper__type2': subName })}>
        {eye && (
            <button
              className={cx('InputPasswordCopy__eye', {
                'InputPasswordCopy__eye--show': !showPassword,
                'InputPasswordCopy__eye--hide': showPassword,
              })}
              onClick={this.toggleShowPassword}
              tabIndex="-1"
            />
          )}
          {subName && <div className="input__subname">{subName}</div>}
          <input
            ref={($input) => this.$input = $input}
            name={name}
            type='password'
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            readOnly
            hidden
          />
          <div className={cx('InputPasswordCopy__input InputPasswordCopy__value', { 'InputPasswordCopy--err': err, 'InputPasswordCopy__wordWrap': styleType === "twoLine"  })}>
            <span className={cx('InputPasswordCopy__span', { 'InputPasswordCopy__span__wordWrap': styleType === "twoLine" })}>
            {showPassword ? value: bullet}
            </span>
          </div>
          <button
            className={cx('InputPasswordCopy__copyButton', {
              'InputPasswordCopy__copyButton--copied': isCopied,
            })}
            onClick={this.copy}
            tabIndex="-1"
          >
            {isCopied ? 'COPIED!': 'COPY'}
            <img className="InputPasswordCopy__icon" src="/static/images/icon-copy.svg" />
            
          </button>
        </div>
        {/* <p
          className={cx('InputPasswordCopy__copiedText', {
            'InputPasswordCopy__copiedText--copied': isCopied,
          })}
        >
          Copied to clipboard
        </p> */}
      </div>
    )
  }
}

export default InputPasswordCopy
