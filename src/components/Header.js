import React, { Component } from 'react'
import { Link } from 'react-router'
import cx from 'classnames'

import { onit } from 'klaytn/onit'

import './Header.scss'


class Header extends Component<Props> {
  state = {
    network: 'Moso Network',
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
      network: 'Moso Network',
    })
  }

  render() {
    const { network } = this.state
    return (
      <div className="Header">
        <div className="Header__LogoWithLink">
          <div className="Header__logo" />
          <Link to="/klaytnscope" className="Header__link">klaytnscope</Link>
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
