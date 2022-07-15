import React, { Component, Fragment } from 'react'
import cx from 'classnames'

import { copy, madeBulletString } from 'utils/misc'
import Tooltip from 'components/Tooltip'
import './InputCopy.scss'

class InputCopy extends Component<Props> {
  state = {
    isCopied: false,
    showPassword: false,
    bulletOneLine: madeBulletString(66),
    bulletTwoLine: madeBulletString(112),
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

  showBullet = () => {
    return this.eye && !this.showPassword;
  }

  render() {
    const { isCopied, showPassword, bulletOneLine, bulletTwoLine } = this.state
    const {
      className,
      name,
      value,
      label,
      width,
      eye,
      isTooltip,
      tooltipText,
      subName,
      styleType,
    } = this.props
    
    return (
      <div className={cx('InputCopy', className)}>
        {label && <label className="InputCopy__label" htmlFor={name}>{label}</label>}
        
        {isTooltip && <Tooltip
          className="AccountOverviewSection__tooltip"
          direction="top"
          message={(
            <Fragment>{tooltipText}</Fragment>
          )}><img className="button__question__icon" src="/static/images/icon-question-mark.svg"/>
          </Tooltip>}

        <div className={cx('InputCopy__inputWrapper', { 'InputCopy__inputWrapper__type2': subName, 'InputCopy__inputWrapper__type3': styleType })}>
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
          {subName && <div className="input__subname">{subName}</div>}
          <input
            ref={($input) => this.$input = $input}
            name={name}
            type="password"
            value={value}
            className="hide"
            readOnly
          />
          {styleType != 'twoLine' && (
            <div
             className={cx('InputCopy__oneLine', { 'InputCopy__bullet': eye && !showPassword })}
            >
              {eye && !showPassword ? bulletOneLine : value}
            </div>
          )}
          {styleType == 'twoLine' && (
            <div
             className={cx('InputCopy__twoLine', { 'InputCopy__bullet': eye && !showPassword })}
            >
            {eye && !showPassword ? bulletTwoLine : value}
            </div>
          )}
          
          <button
            className={cx('InputCopy__copyButton', {
              'InputCopy__copyButton--copied': isCopied,
            })}
            onClick={this.copy}
            tabIndex="-1"
          >
            {isCopied ? 'COPIED!': 'COPY'}
            <img className="InputCopy__icon" src="/static/images/icon-copy.svg" />
            
          </button>
        </div>
        {/* <p
          className={cx('InputCopy__copiedText', {
            'InputCopy__copiedText--copied': isCopied,
          })}
        >
          Copied to clipboard
        </p> */}
      </div>
    )
  }
}

export default InputCopy
