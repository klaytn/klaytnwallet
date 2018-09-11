import React, { Component } from 'react'
import cx from 'classnames'
import { onit } from 'klaytn/onit'

import Input from 'components/Input'
import Button from 'components/Button'
import EditButton from 'components/EditButton'

type Props = {

}

import './TransferForm.scss'

class TransferForm extends Component<Props> {
  render() {
    const {
      from,
      tokenSymbol = 'KLAY',
      className,
      changeView,
      onChange,
      fee,
      value,
      to,
      type,
      totalGasFee,
      gasPrice,
    } = this.props
    return (
      <div className={cx('TransferForm', className)}>
        <header className="TransferForm__title">
          Step2. Enter the infomation (<span className="TransferForm__tokenSymbol">{tokenSymbol}</span>)
        </header>
        <hr className="TransferForm__hr" />
        <Input readOnly value={from} className="TransferForm__input TransferForm__input--readOnly" label="From Address" />
        <Input name="to" onChange={onChange} className="TransferForm__input" label="To Address" placeholder="Enter the address to send" />
        <Input name="value" onChange={onChange} className="TransferForm__input" label="Amount to Send" placeholder="0.000000" />
        <div className="TransferForm__feeLimit">
          <p className="TransferForm__feeLimitLabel">
            Transction Fee Limit
            <span className="TransferForm__questionMark">?</span>
          </p>
          <EditButton className="TransferForm__editButton" />
          <span className="TransferForm__fee">{onit.utils.fromWei(`${totalGasFee}`)} {tokenSymbol}</span>
        </div>
        <div className="TransferForm__gasInfo">
          <div className="TransferForm__gasPrice">
            <span>Gas Price</span>
            <span>{gasPrice} ston</span>
          </div>
          <div className="TransferForm__gasLimit">
            <span>Gas Limit</span>
            <span>{totalGasFee / gasPrice}</span>
          </div>
        </div>
        <Button
          title="Send Transaction"
          className="TransferForm__sendTransactionButton"
          onClick={changeView('total')}
          disabled={!from || !value || !to || !type}
        />
      </div>
    )
  }
}

export default TransferForm
