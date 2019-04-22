import React, { Component } from 'react'
import cx from 'classnames'
import ReactTooltip from 'react-tooltip'
import AccountNameTooltip from 'components/AccountNameTooltip'

import { copy } from 'utils/misc'

import './InputCheck.scss'

class InputCheck extends Component<Props> {
  render() {
    const {
      className,
      name,
      value,
      label,
      onChange,
      onKeyPress,
      onClick,
      placeholder,
      width,
      disabled,
      buttonDisabled,
      buttonText,
      err,
      isChecked,
    } = this.props
    
    return (
      <div className={cx('InputCheck', className)}>
        
        {label && <label className="InputCheck__label" htmlFor={name}>{label}</label>}
        <div className="InputCheck__inputWrapper">
          <input
            data-tip
            data-for='name-tooltip'
            data-event='focus'
            data-event-off='blur'
            data-offset={'{ "top": 10 }'}
            ref={($input) => this.$input = $input}
            name={name}
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            className={cx('InputCheck__input', { 'InputCheck--err': err })}

          />
          
          <ReactTooltip
            id="name-tooltip"
            className="InputPassword__tooltip"
            effect="solid"
          ><AccountNameTooltip value={value} />
          </ReactTooltip>
          
          <button
            className={cx('InputCheck__Button', { 'isChecked': isChecked })}

            onClick={onClick}
            icon="icon-check"
            disabled={buttonDisabled}
          >{buttonText}{isChecked && 'ed!' }</button>
        </div>

      </div>
    )
  }
}

export default InputCheck
