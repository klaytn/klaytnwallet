import React, { Component } from 'react'
import { Link } from 'react-router'
import cx from 'classnames'

import { onit } from 'klaytn/onit'
import { KLAYTN_SCOPE_URL } from 'constants/url'

import './Header.scss'

const HEALTHCHECK_INTERVAL = 1000

class Header extends Component<Props> {
  state = {
    network: 'Aspen Network',
    prevBlockNumber: null,
  }

  sameBlockNumberCount = 0

  componentDidMount() {
    // TODO: Turn on health check after health checking policy defined.
    // setInterval(this.healthCheck, HEALTHCHECK_INTERVAL)
  }

  healthCheck = async () => {
    const blockNumber = await onit.klay.getBlockNumber()

    if (this.sameBlockNumberCount > 5) {
      this.setState({ network: false })
      this.sameBlockNumberCount = 0
      return
    }

    if (blockNumber == this.state.prevBlockNumber) {
      this.sameBlockNumberCount++
      return
    }

    this.sameBlockNumberCount = 0
    this.setState({
      prevBlockNumber: blockNumber,
      network: 'Aspen Network',
    })
  }

  render() {
    const { network } = this.state
    return (
      <div className="Header">
        <div className="Header__LogoWithLink">
          <Link to="/" className="Header__logo" />
          <a
            target="self"
            href={KLAYTN_SCOPE_URL} to="/klaytnscope" className="Header__link">Klaytnscope</a>
        </div>
        <div className={cx('Header__network', {
          'Header__network--disconnected': !network
        })}
        >
          {network || 'Disconnected'}
        </div>
      </div>
    )
  }
}

export default Header
