import React, { Component } from 'react'
import cx from 'classnames'

import Input from 'components/Input'
import Button from 'components/Button'

type Props = {

}

import './TransferForm.scss'

class TransferForm extends Component<Props> {
  render() {
    const {
      tokenSymbol = 'KLAY',
      className,
      changeView,
    } = this.props
    return (
      <div className={cx('TransferForm', className)}>
        <header className="TransferForm__title">
          Step2. Enter the infomation (<span className="TransferForm__tokenSymbol">{tokenSymbol}</span>)
        </header>
        <hr className="TransferForm__hr" />
        <Input className="TransferForm__input" label="From Address" />
        <Input className="TransferForm__input" label="To Address" />
        <Input className="TransferForm__input" label="Amount to Send" />
        <Button
          title="Send Transaction"
          className="TransferForm__sendTransactionButton"
          onClick={changeView('total')}
        />
      </div>
    )
  }
}

export default TransferForm
