import React from 'react'
import cx from 'classnames'

import TabList from 'components/TabList'

import './Nav.scss'

const navLinks = [
  { title: 'Create New Wallet', link: '/create', icon: 'icon-create' },
  { title: 'View Wallet Info', link: '/access', icon: 'icon-info' },
  { title: 'Send KLAY & Token', link: '/transfer', icon: 'icon-send' },
  { title: 'KLAY Faucet', link: '/faucet', icon: 'icon-faucet' },
]

const Nav = ({ className }) => (
  <div className={cx('Nav', className)}>
    <TabList tabItems={navLinks} />
    <p className="Nav__copyright">©klaytnwallet.com</p>
  </div>
)

export default Nav
