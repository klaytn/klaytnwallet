import React, { Component } from 'react'
import cx from 'classnames'
import BN from 'bignumber.js'

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
    const {
      totalToken,
      feeLimit,
      type: tokenSymbol,
      from,
      to,
      value = '0',
      transfer,
      totalGasFee,
      gas,
      changeView,
    } = this.props

    const [ integerPoints, decimalPoints ] = new BN(value).toString().split('.')

    return (
      <div className="TransferTotal">
        <div className="Inner__Box">
          <header className="TransferTotal__title">Total</header>
          <p className="TransferTotal__totalToken">
            {integerPoints}{!!decimalPoints && '.'}
            {decimalPoints && <span className="TransferTotal__valueDecimal">{decimalPoints.slice(0, 6)}</span>}&nbsp;
            <span className="TransferTotal__tokenSymbol">{tokenSymbol}</span>
          </p>
          <p className="TransferTotal__feeLimit">
            (Transaction Fee Limit&nbsp;&nbsp;
              <span className={cx('TransferTotal__feeLimit', 'TransferTotal__feeLimit--light')}>
                {new BN(totalGasFee).toString()}
              </span>
              KLAY
            )
          </p>
          <TransferTotalItem title="From" value={from} />
          <TransferTotalItem title="To" value={to} />
          <TransferTotalItem title="Amount" value={`${value} ${tokenSymbol}`} />
          <TransferTotalItem title="Gas Price" value="25 ston" />
          <TransferTotalItem title="Gas Limit" value={gas} />
          <p className="TransferTotal__message">
            Are you sure you want to do this?
          </p>
          <Button
            gray
            title="No, I want to back"
            className="TransferTotalItem__noButton"
            onClick={changeView('form')}
          />
          <Button
            title={`Yes, I\'m sure`}
            className="TransferTotalItem__yesButton"
            onClick={transfer}
          />
          <div className="TransferTotal__decoration TransferTotal__decoration--left" />
          <div className="TransferTotal__decoration TransferTotal__decoration--right" />
          </div>
      </div>
    )
  }
}

export default TransferTotal
