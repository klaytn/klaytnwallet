import React from 'react'
import { Link } from 'react-router'
import cx from 'classnames'

import TabList from 'components/TabList'
import { KLAYTN_SCOPE_URL,KLAYTN_DOCS_URL,KLAYTN_IDE_URL } from 'constants/url'
import './Nav.scss'

const navLinks = [
  { title: 'Create', link: '/create', icon: 'icon-create', dropDown: false , menu: [{name: 'New Create', subLink: '/create'}, {name: 'HRA Account', subLink: '/create2'}] },
  { title: 'View Wallet Info', link: '/access', dropDown: false , icon: 'icon-info' },
  { title: 'Send KLAY & Token', link: '/transfer',dropDown: false ,  icon: 'icon-send' },
  // { title: 'KLAY Faucet', link: '/faucet', dropDown: false , icon: 'icon-faucet' },
  { title: 'more', link: null, icon: 'icon-more', dropDown: true , menu: [{name: 'Klaytnscope', subLink: KLAYTN_SCOPE_URL}, {name: 'Klaytn IDE', subLink: KLAYTN_IDE_URL },{name: 'Klaytn Docs', subLink: KLAYTN_DOCS_URL }]},
]
console.log(KLAYTN_SCOPE_URL)
const Nav = ({ className }) => (
  <div className={cx('Nav', className)}>
    <Link to="/" className="Header__logo" />
    <TabList tabItems={navLinks} />
  </div>
)

export default Nav
