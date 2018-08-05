import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import classNames from 'classnames'

import { onitSocket } from 'klaytn/onit'
import Panel from 'components/Panel'
import AccessByKeystore from 'components/AccessByKeystore'
import AccessByPrivatekey from 'components/AccessByPrivatekey'

import './WalletAccess'

type Props = {

}

class WalletAccess extends Component<Props> {
  state = {
    accessMethod: ''
  }

  componentWillMount() {
    onitSocket.klay.accounts.wallet.clear()
  }

  handleAccess = (accessMethod) => () => {
    this.setState({
      accessMethod,
    })
  }

  accessTo = (address) => {
    const { location } = this.props
    if (!location.query.next) {
      browserHistory.push(`/access/${address}`)
    } else {
      browserHistory.push(`/${location.query.next}/${address}`)
    }
  }

  render() {
    const { accessMethod } = this.state
    return (
      <Panel>
        <div className="WalletAccess">
          <p>지갑 접근 방법 선택하기</p>
          <AccessButton
            title="개인 키"
            method="privatekey"
            handleAccess={this.handleAccess}
          />
          <AccessButton
            title="키 스토어"
            method="keystore"
            handleAccess={this.handleAccess}
          />
          {accessMethod && (accessMethod === 'keystore')
            ? <AccessByKeystore accessTo={this.accessTo} />
            : <AccessByPrivatekey accessTo={this.accessTo} />
          }
        </div>
      </Panel>
    )
  }
}

const AccessButton = ({
  method,
  title,
  handleAccess,
  accessTo,
}) => (
  <button
    onClick={handleAccess(method)}
    className={classNames('WalletAccess__button', {
      [`WalletAccess__button--${method}`]: method,
    })}
  >
    {title}
  </button>
)

export default WalletAccess
