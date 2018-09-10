import React, { Component } from 'react'
import cx from 'classnames'

import Input from 'components/Input'
import Button from 'components/Button'

import './TransferTotal.scss'

type Props = {

}

const TransferTotalItem = ({
  title,
  value,
}) => (
  <div className="TransferTotal__item">
    <span className="TransferTotal__itemTitle">{title}</span>
    <span className="TransferTotal__itemValue">{value}</span>
  </div>
)

class TransferTotal extends Component<Props> {
  render() {
    const { totalToken = 9876, feeLimit, tokenSymbol } = this.props
    return (
      <div className="TransferTotal">
        <header className="TransferTotal__title">Total</header>
        <p className="TransferTotal__totalToken">{totalToken} {tokenSymbol}</p>
        <p className="TransferTotal__feeLimit">
          (Transaction Fee Limit
            <span className={cx('TransferTotal__feeLimit', 'TransferTotal__feeLimit--light')}>
              {feeLimit} {tokenSymbol}
            </span>
          )
        </p>
        <TransferTotalItem title="From" value="" />
        <TransferTotalItem title="To" value="" />
        <TransferTotalItem title="Amount" value="" />
        <TransferTotalItem title="Gas Price" value="" />
        <TransferTotalItem title="Gas Limit" value="" />
        <p className="TransferTotal__message">
          Are you sure you want to do this?
        </p>
        <Button
          title="No, I want to back"
          className="TransferTotalItem__noButton"
        />
        <Button
          title={`Yes, I'm sure`}
          className="TransferTotalItem__yesButton"
        />
      </div>
    )
  }
}

export default TransferTotal
