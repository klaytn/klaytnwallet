import React, { Component, Fragment } from 'react'
import { browserHistory } from 'react-router'
import jsonFormat from 'json-format'
import { Link } from 'react-router'
import InputCopy from 'components/InputCopy'
import WalletCreationStepPlate from 'components/WalletCreationStepPlate'
import { klayKeyMade } from 'utils/crypto'
import { KLAYTN_SCOPE_URL } from 'constants/url'
import cx from 'classnames'
import { closeBrowser } from 'utils/ui'
type Props = {

}


class WalletCreationStep5 extends Component<Props> {

  constructor(props) {
    super(props)
    const { privateKey } = this.props
    this.state = {
      userPrivateKey:'',
      nameSet: {
        'normal': {
          stepName:'STEP 3',
          title: 'Please Save your Private Key',
          inputText:'Private Key',
          text: ['Your new wallet has been created.','Make sure to COPY the private key below and SAVE it.'],
          buttonText:'View Wallet Info'
        },
        'HRAType': {
          stepName:'STEP 5',
          title: 'Please Save your Wallet Key',
          inputText:'Wallet Key',
          text: ['Your new account has been created. Please make sure','you copy and safely store the Wallet Key below:'],
          buttonText:'View Account Info'
        }
      }
    }
    window.removeEventListener('beforeunload', closeBrowser ,false)
  }
  render() {
    const { privateKey, pageType, receiptWallet } = this.props
    const { stepName, title, inputText, text, buttonText } = this.state.nameSet[pageType]

    return (
      <WalletCreationStepPlate
        className="WalletCreationStep5"
        stepName={stepName}
        title={title}
        description={(
          <Fragment>
           {text[0]}<br/>{text[1]}
          </Fragment>
        )}
        render={() => (
          <InputCopy
            value={privateKey}
            label={inputText}
          />
        )}
        accountRender={() => (
          <div className={cx('account__creation', {"show": pageType =='HRAType'})}>
            <span className="account__creation__title">Want to Track Your Account Creation Transaction?</span>
            <p className="account__creation__text">All transaction history by Klaytn accounts can be <br />found on Klaytnscope.</p>
            <a target="self" href={`${KLAYTN_SCOPE_URL}/account/${receiptWallet ? receiptWallet.to : ''}`} className="account__creation__link"><button className="account__creation__button">LINK</button></a>
          </div>
        )}
        nextStepButtons={[
          {
            title: buttonText,
            onClick: () => browserHistory.push('/access'),
            className: 'WalletCreationStep3__button Button--size3',
            gray: true,
          },
          {
            title: 'Send KLAY & Tokens',
            onClick: () => browserHistory.push('/transfer'),
            className: 'WalletCreationStep3__button Button--size3',
          },
        ]}
      />
    )
  }
}

export default WalletCreationStep5
