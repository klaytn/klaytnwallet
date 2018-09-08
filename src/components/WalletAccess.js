import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import classNames from 'classnames'

import { onitSocket } from 'klaytn/onit'
import Radio from 'components/Radio'
import Panel from 'components/Panel'
import AccessByKeystore from 'components/AccessByKeystore'
import AccessByPrivatekey from 'components/AccessByPrivatekey'
import { isMobile } from 'utils/misc'

import './WalletAccess.scss'

type Props = {

}

const radioItems = [{
  title: '개인 키',
  value: 'privatekey',
  attribute: 'accessMethod',
}, {
  title: `키 스토어 ${isMobile ? '(모바일 불가능)' : ''}`,
  value: 'keystore',
  attribute: 'accessMethod',
}]

class WalletAccess extends Component<Props> {
  state = {
    accessMethod: 'privatekey' // default value : privatekey
  }

  componentWillMount() {
    // Clear whole wallet instances when we get in '/access' route.
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
      <div className="WalletAccess">
        <Radio
          className="WalletAccess__Radio"
          items={radioItems}
          selectedValue={accessMethod}
          onClick={this.handleAccess}
        />
        <AccessSide
          accessMethod={accessMethod}
          accessTo={this.accessTo}
        />
      </div>
    )
  }
}

const AccessSide = ({ accessMethod, accessTo }) => (
  <div className="WalletAccess__AccessSide">
    {accessMethod && (accessMethod === 'keystore')
      ? <AccessByKeystore accessTo={accessTo} />
      : <AccessByPrivatekey accessTo={accessTo} />
    }
  </div>
)

export default WalletAccess
