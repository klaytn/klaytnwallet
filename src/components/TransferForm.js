import React, { Component } from 'react'
import cx from 'classnames'
import ReactTooltip from 'react-tooltip'

import { caver } from 'klaytn/caver'
import Input from 'components/Input'
import Button from 'components/Button'
import EditButton from 'components/EditButton'
import InputEdit from 'components/InputEdit'
import ErrorMessage from 'components/ErrorMessage'
import { pipe } from 'utils/Functional'
import { addCommas } from 'utils/misc'
import { isHRA } from 'utils/crypto'
import { KLAYTN_KLAY_UINT } from 'constants/url'
type Props = {

}

import './TransferForm.scss'

class TransferForm extends Component<Props> {
  state = {
    listenedIsEditing: false,
  }

  listenEditing = (listenedIsEditing) => {
    this.setState({ listenedIsEditing })
  }
  focusOut = async (e) => {
    const { to, humanReadableCreatedCheck } = this.props
    if(caver.utils.isAddress(to)){
      humanReadableCreatedCheck(true)
      return
    }
    if(isHRA(to)){
      await caver.klay.accountCreated(to).then((data) => {
        humanReadableCreatedCheck(data)
      })
    }
  }
  render() {
    const { listenedIsEditing } = this.state
    const {
      from,
      className,
      changeView,
      onChange,
      fee,
      value,
      to,
      type = KLAYTN_KLAY_UINT,
      totalGasFee,
      gasPrice,
      handleEdit,
      handleEditCancel,
      tokenColorIdx,
      isTokenAddMode,
      myBalance,
      klayBalance,
      humanReadableCreated,
    } = this.props
    let isInvalidAddress = false
    if(to){
      if(to && to.length <= 20 && isHRA(to) ){
        isInvalidAddress = !caver.utils.isAddress(caver.utils.humanReadableStringToHexAddress(to))
      }else{
        isInvalidAddress = !caver.utils.isAddress(to)
      }
    }
    const isInvalidAmount = value && (type !== KLAYTN_KLAY_UINT ? Number(myBalance) < Number(value) : (Number(myBalance) <= Number(value) + Number(totalGasFee)))
    // show invalid tx fee error message only when selected token is not 'Test_KLAY'
    const isInvalidTxFee = type !== KLAYTN_KLAY_UINT ? Number(klayBalance && klayBalance.balance) <= Number(totalGasFee) : Number(myBalance) <= Number(totalGasFee) + Number(value)
    const hasError = isInvalidAddress || isInvalidAmount || isInvalidTxFee || !humanReadableCreated
    
    return (
      <div className={cx('TransferForm', className, {
        'TransferForm--editing': listenedIsEditing,
        'TransferForm--tokenAdding': isTokenAddMode,
      })}>
        <header className="TransferForm__title">
          Step2. Enter the infomation <span className={cx('TransferForm__tokenSymbol', {
            [`TransferForm__tokenSymbol--token-color-${tokenColorIdx}`]: tokenColorIdx,
          })}
        >
          ({type})
        </span>
        </header>
        <div className="Inner__Box">
          <Input
            readOnly
            name="from"
            value={from}
            className="TransferForm__input TransferForm__input--readOnly"
            label="From Address"
          />
          <Input
            name="to"
            onChange={onChange}
            className="TransferForm__input"
            label="To Address"
            placeholder="Enter the address to send"
            autoComplete="off"
            value={to}
            onBlur={this.focusOut}
            isSuccess={humanReadableCreated }
            isInvalidData={isInvalidAddress}
            errorMessage={isInvalidAddress && 'Invalid Address'}
          />
          <Input
            name="value"
            onChange={onChange}
            className="TransferForm__input TransferForm__valueInput"
            label="Amount to Send"
            placeholder="0.000000"
            autoComplete="off"
            unit={type}
            value={value}
            errorMessage={isInvalidAmount && 'Insufficienct balance'}
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
              unit={KLAYTN_KLAY_UINT}
              autoComplete="off"
              listen={this.listenEditing}
              errorMessage={isInvalidTxFee}
            />
            {/* {isInvalidTxFee && (
              <ErrorMessage msg="Insufficienct balance." />
            )} */}
          </div>
          {!listenedIsEditing && (
            <div className="TransferForm__gasInfo">
              <div className="TransferForm__gasPrice">
                <span>Gas Price</span>
                <span>{addCommas(caver.utils.fromWei(gasPrice, 'shannon'))} ston</span>
              </div>
              <div className="TransferForm__gasLimit">
                <span>Gas Limit</span>
                <span>{addCommas(caver.utils.toWei(totalGasFee) / gasPrice)}</span>
              </div>
            </div>
          )}
          <Button
            title="Send Transaction"
            className="TransferForm__sendTransactionButton"
            onClick={changeView('total')}
            disabled={listenedIsEditing || !from || !value || !to || !type || hasError}
          />
        </div>
        
      </div>
    )
  }
}

export default TransferForm
