import React, { Component, Fragment } from 'react'
import cx from 'classnames'

import Button from 'components/Button'

import './RefreshTable.scss'

type Props = {

}

class RefreshTable extends Component<Props> {
  render() {
    const { className, title, items } = this.props
    return (
      <div className={cx('RefreshTable', className)}>
        <div className="RefreshTable__header">
          {title && (
            <Fragment>
              <span className="RefreshTable__title">
                {title}
              </span>
              <Button
                className="RefreshTable__refreshButton"
                title="Refresh"
              />
            </Fragment>
          )}
        </div>
        <table className="RefreshTable__table">
          <thead>
            <tr>{items.keys.map(itemKey => <th key={itemKey}>{itemKey}</th>)}</tr>
          </thead>
          <tbody>
            {items.values.map((itemValue, idx) =>
              <tr key={`${itemValue}${idx}`}>
                {Object
                  .keys(itemValue)
                  .map((item, idx) => <td key={`${item}${idx}`}>{itemValue[item]}</td>)}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default RefreshTable
