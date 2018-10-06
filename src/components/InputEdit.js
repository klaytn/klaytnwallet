import React, { Component, Fragment } from 'react'
import cx from 'classnames'

import EditButton from 'components/EditButton'
import { pipe } from 'utils/Functional'

import './InputEdit.scss'

class InputEdit extends Component<Props> {
  state = {
    isEditing: false,
  }

  toggleEdit = () => {
    this.setState({ isEditing: !this.state.isEditing }, () => {
      this.props.handleEdit()
      if (this.$input) {
        this.$input.focus()
      }

      if (this.props.listen && typeof this.props.listen === 'function') {
        this.props.listen(this.state.isEditing)
      }
    })
  }

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
      handleEdit,
      handleEditCancel,
      unit,
      errorMessage,
    } = this.props

    const { isEditing } = this.state

    return (
      <div
        className={cx('InputEdit', className, {
          'InputEdit--isEditing': isEditing,
          'InputEdit--error': errorMessage,
        })}
        style={{ width: `${width}` }}
      >
        {label && <label className="InputEdit__label" htmlFor={name}>{label}</label>}
        <div className="InputEdit__inputWrapper">
          {isEditing
            ? (
              <Fragment>
                <button
                  className="InputEdit__editCancelButton"
                  tabIndex="-1"
                  onClick={pipe(handleEditCancel, this.toggleEdit)}
                >
                  <img src="/static/images/icon-x-black.svg" />
                  <span>Cancel</span>
                </button>
                <button
                  className="InputEdit__editOkButton"
                  tabIndex="-1"
                  onClick={this.toggleEdit}
                >
                  <img src="/static/images/icon-success-check.svg" />
                  <span>OK</span>
                </button>
              </Fragment>
            )
            : (
              <EditButton
                className="InputEdit__editButton"
                tabIndex="-1"
                onClick={this.toggleEdit}
              />
            )
          }
          <input
            ref={($input) => this.$input = $input}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            className={cx('InputEdit__input', { 'InputEdit--err': err })}
            readOnly={!isEditing}
            autoFoucs
            autoComplete="off"
          />
          {unit && <span className="InputEdit__unit">{unit}</span>}
        </div>
      </div>
    )
  }
}

export default InputEdit
