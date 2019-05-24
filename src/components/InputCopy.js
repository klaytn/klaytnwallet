import React, { Component, Fragment } from 'react'
import cx from 'classnames'

import { copy, madeBulletString } from 'utils/misc'
import Tooltip from 'components/Tooltip'
import './InputCopy.scss'

class InputCopy extends Component<Props> {
  state = {
    isCopied: false,
    showPassword: false,
    bullet: madeBulletString(112),
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
    const { isCopied, showPassword, bullet } = this.state
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
            type={eye
                ? !showPassword && 'password'
                : 'text'}
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            className={cx('InputCopy__input', { 'InputCopy--err': err, 'hide': styleType == 'twoLine' })}
            readOnly
          />
          {styleType == 'twoLine' && <textarea className="textarea__Copy" value={ eye && !showPassword ? bullet : value} readOnly></textarea>}
          
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
