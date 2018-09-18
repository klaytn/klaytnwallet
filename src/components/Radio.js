import React, { Component } from 'react'
import classNames from 'classnames'

import './Radio.scss'

type Props = {

}

class Radio extends Component<Props> {
  render() {
    const { items, onClick, className, selectedValue } = this.props
    return (
      <div className={classNames('Radio', className)}>
        <p className="Radio__title">지갑 접근방법을 선택해주세요.</p>
        <ul className="Radio__list">
        {items.map(({ title, value, attribute }) => {
          return (
            <label onClick={onClick(value)} htmlFor={value} className="Radio__listItem">
              <input checked={value === selectedValue} className="Radio__hiddenInput" type="radio" id={value} name="accessMethod" />
              <div className="Radio__check" />
              <p className="Radio__label">{title}</p>
            </label>
          )
        })}
        </ul>
      </div>
    )
  }
}

export default Radio
