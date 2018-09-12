import React, { Component } from 'react'
import cx from 'classnames'
import ReactTooltip from 'react-tooltip'

import { onit } from 'klaytn/onit'
import Input from 'components/Input'
import Button from 'components/Button'
import EditButton from 'components/EditButton'
import InputEdit from 'components/InputEdit'

type Props = {

}

import './TransferForm.scss'

class TransferForm extends Component<Props> {
  state = {
    isEditing: false,
  }

  toggleEdit = () => {
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  render() {
    const { isEditing } = this.state
    const {
      from,
      className,
      changeView,
      onChange,
      fee,
      value,
      to,
      type = 'KLAY',
      totalGasFee,
      gasPrice,
      handleEdit,
      handleEditCancel,
      tokenColorIdx,
    } = this.props
    return (
      <div className={cx('TransferForm', className)}>
        <header className="TransferForm__title">
          Step2. Enter the infomation <span className={cx('TransferForm__tokenSymbol', {
            [`TransferForm__tokenSymbol--token-color-${tokenColorIdx}`]: tokenColorIdx,
          })}
        >
          ({type})
        </span>
        </header>
        <hr className="TransferForm__hr" />
        <Input
          readOnly value={from} className="TransferForm__input TransferForm__input--readOnly" label="From Address"
        />
        <Input
          name="to" onChange={onChange} className="TransferForm__input" label="To Address" placeholder="Enter the address to send"
          autoComplete="off"
        />
        <Input
          name="value" onChange={onChange} className="TransferForm__input TransferForm__valueInput" label="Amount to Send" placeholder="0.000000"
          autoComplete="off"
        />
        <div className="TransferForm__feeLimit">
          <ReactTooltip
            id="gas-tooltip"
            className="TransferForm__gasTooltip"
            effect="solid"
            place="bottom"
          >
            Gas Price X Gas Limit
          </ReactTooltip>
          <p className="TransferForm__feeLimitLabel">
            Transction Fee Limit
            <img
              data-tip
              data-for='gas-tooltip'
              className="TransferForm__questionMark"
              src="/static/images/icon-help-label.svg"
            />
          </p>
          <InputEdit
            className="TransferForm__totalGasFeeInput"
            name="totalGasFee"
            value={totalGasFee}
            onChange={onChange}
            handleEdit={handleEdit}
            handleEditCancel={handleEditCancel}
            unit="KLAY"
            autoComplete="off"
          />
        </div>
        {!isEditing && (
          <div className="TransferForm__gasInfo">
            <div className="TransferForm__gasPrice">
              <span>Gas Price</span>
              <span>{onit.utils.fromWei(gasPrice, 'shannon')} ston</span>
            </div>
            <div className="TransferForm__gasLimit">
              <span>Gas Limit</span>
              <span>{onit.utils.toWei(totalGasFee) / gasPrice}</span>
            </div>
          </div>
        )}
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
