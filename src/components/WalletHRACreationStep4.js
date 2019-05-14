
import React, { Component, Fragment } from 'react'
import jsonFormat from 'json-format'
import { browserHistory } from 'react-router'
import WalletCreationStepPlate from 'components/WalletCreationStepPlate'
import { pipe } from 'utils/Functional'
import { download } from 'utils/misc'
import { caver } from 'klaytn/caver'
import ui from 'utils/ui'
type Props = {

}

class WalletHRACreationStep4 extends Component<Props> {
  constructor(props) {
    super(props)
  }


  removeData = () => {
    caver.klay.accounts.wallet.clear()
    sessionStorage.removeItem('was')
    sessionStorage.removeItem('address')
    ui.keyRemove()
  }
  movePageInfo = () => {
    browserHistory.push('/access')
  }
  render() {
    const { handleStepMove, pageType } = this.props
    return (
      <WalletCreationStepPlate
        stepName="STEP 4"
        title={(
          <Fragment>
            Your New Account Is Ready
          </Fragment>
        )}
        description={(
          <Fragment>
            <div>
            <p>Congratulations! Your Klaytn account has been successfully created.</p>
            To access your new account, prepare your Klaytn HRA Private Key and click the “Sign In with New Account” button below (this will clear your current account’s key from the browser).
            </div>
          </Fragment>
        )}
        nextStepButtons={[
          { title: 'Sign in with New Account', gray: true, onClick: pipe(this.removeData, this.movePageInfo), className: 'Button--size5'},
          { title: 'View My Current Account', onClick: this.movePageInfo, className: 'Button--size5'}
        ]}
      />
    )
  }
}

export default WalletHRACreationStep4
