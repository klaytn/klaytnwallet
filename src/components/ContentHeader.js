import React, { Component } from 'react'
import { Link } from 'react-router'
import cx from 'classnames'

import { onit } from 'klaytn/onit'
import { KLAYTN_SCOPE_URL } from 'constants/url'

import './ContentHeader.scss'

const HEALTHCHECK_INTERVAL = 1000

class Header extends Component<Props> {
  state = {
    network: 'Baobab Network',
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
      network: 'Baobab Network',
    })
  }

  render() {
    const { network } = this.state
    return (
      <div className="Header">
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
