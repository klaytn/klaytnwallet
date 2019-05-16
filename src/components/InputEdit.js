import React, { Component, Fragment } from 'react'
import cx from 'classnames'

import EditButton from 'components/EditButton'
import ErrorMessage from 'components/ErrorMessage'
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
          
        })}
        style={{ width: `${width}` }}
      >
      {isEditing
        ? (
          <div className="InputEdit__Popup">
            <div className="InputEdit__Popup--inner">
              <label className="InputEdit__label" >Transaction Fee Limit Edit</label>
                <div className={cx('InputEdit__box', { 'InputEdit--error': errorMessage})}>
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
                      autofoucs="true"
                      autoComplete="off"
                    />
                    {unit && <span className="InputEdit__unit">{unit}</span>}
                    {errorMessage && (
                      <ErrorMessage msg="Insufficienct balance." />
                    )}
                </div>
                
                <div className="InputEdit__ButtonBox">
                  <Fragment>
                      <button
                        className="Button Button--gray InputEdit__editCancelButton"
                        tabIndex="-1"
                        onClick={pipe(handleEditCancel, this.toggleEdit)}
                      >
                        <span>Cancel</span>
                      </button>
                      <button
                        className="Button InputEdit__editOkButton"
                        tabIndex="-1"
                        onClick={this.toggleEdit}
                        disabled={errorMessage}
                      >
                        <span>Confirm</span>
                      </button>
                    </Fragment>
                </div>
              </div>
          </div>
        )
        : ('')}
      
        {label && <label className="InputEdit__label" htmlFor={name}>{label}</label>}
        <div className="InputEdit__inputWrapper">
          <EditButton
                className="InputEdit__editButton"
                tabIndex="-1"
                onClick={this.toggleEdit}
              />
          <input
            id={name+'Show'}
            name={name}
            value={value}
            placeholder={placeholder}
            disabled={true}
            className={cx('InputEdit__input')}
            readOnly
          />
          {unit && <span className="InputEdit__unit">{unit}</span>}
        </div>
      </div>
    )
  }
}

export default InputEdit
