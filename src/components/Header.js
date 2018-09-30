import React, { Component } from 'react'
import { Link } from 'react-router'
import cx from 'classnames'

import { onit } from 'klaytn/onit'
import { KLAYTN_SCOPE_URL } from 'constants/url'

import './Header.scss'


class Header extends Component<Props> {
  state = {
    network: 'Aspen Network',
    prevBlockNumber: null,
  }

  sameBlockNumberCount = 0

  componentDidMount() {
    setInterval(this.healthCheck, 3000)
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
