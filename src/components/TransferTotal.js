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
  unit,
}) => (
  <div className="TransferTotal__item">
    <span className="TransferTotal__itemTitle">{title}</span>
    <span className="TransferTotal__itemValue"><span className={title}>{value}</span>{unit ? unit : ''}</span>
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
            {decimalPoints && <span className="TransferTotal__valueDecimal">{decimalPoints.slice(0, 6)}</span>}
            <span className="TransferTotal__tokenSymbol">{tokenSymbol}</span>
          </p>
          <p className="TransferTotal__feeLimit">
            (Transaction Fee Limit
              <span className={cx('TransferTotal__feeLimit', 'TransferTotal__feeLimit--light')}>
                {new BN(totalGasFee).toString()}
              </span>
              KLAY
            )
          </p>
          <div>
            <TransferTotalItem title="From" value={from} />
            <TransferTotalItem title="To" value={to} />
            <TransferTotalItem title="Amount" value={value} unit={tokenSymbol}/>
            <TransferTotalItem title="Gas Price" value="25 ston" />
            <TransferTotalItem title="Gas Limit" value={gas} />
          </div>
          <div className="TransferTotal__message">
            Are you sure you want to do this?<br />
            <p className="sub_message">
            Klaytn Wallet은 KLAY 및 token 전송 중 발생할 수 있는
            <span className="alert_text">장애 및 오류로 인한 손실 또는 피해에 대해 책임을 지지 않습니다.</span>
            정말로 전송을 실행하시겠습니까?
            </p>
          </div>
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
          </div>
      </div>
    )
  }
}

export default TransferTotal
