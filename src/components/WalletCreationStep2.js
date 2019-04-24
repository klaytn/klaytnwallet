import React, { Component, Fragment } from 'react'
import { browserHistory } from 'react-router'
import jsonFormat from 'json-format'
import { pipe } from 'utils/Functional'
import { download } from 'utils/misc'
import { onit } from 'klaytn/onit'
import InputCopy from 'components/InputCopy'
import WalletCreationStepPlate from 'components/WalletCreationStepPlate'
type Props = {

}
const TransferTotalItem = ({
  title,
  value,
  key,
}) => (
  <div className="TransferTotal__item" key={title}>
    <span className="TransferTotal__itemTitle">{title}</span>
    <span className="TransferTotal__itemValue">{value}</span>
  </div>
)

class WalletCreationStep2 extends Component<Props> {

  constructor(props) {
    super(props)
   
    const { receiptWallet } = this.props
    this.state = {
      receiptWallet,
    }
  }

  render() {
    const { receiptWallet} = this.state
    const { handleStepMove} = this.props
    return (
      <WalletCreationStepPlate
        className="WalletCreationStep2"
        stepName="STEP 2"
        title="Your Custom Address Has Been Reserved"
        description={(
          <Fragment>
            Below is the custom Klaytn account address you created.<br />
            Now download your keystore file to secure your account.
          </Fragment>
        )}
        TransferTotalItem={[
            { title:"Account Name", value: onit.utils.hexToUtf8(receiptWallet.to)},
            { title:"Transaction Fee", value: (receiptWallet.gasUsed*0.001)+' ston'}   
        ]}
        nextStepButtons={[{ title: 'Next Step', onClick: handleStepMove(3)}]}
      />
    )
  }
}

export default WalletCreationStep2
