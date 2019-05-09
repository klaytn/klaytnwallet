import React from 'react'
import { Link } from 'react-router'
import cx from 'classnames'

import TabList from 'components/TabList'
import { KLAYTN_SCOPE_URL,KLAYTN_DOCS_URL,KLAYTN_IDE_URL, KLAYTN_WALLET_URL } from 'constants/url'
import './Nav.scss'

let navLinks = [
  { title: 'Create Account', menuClass: 'menu-create', link: '/create', icon: 'icon-create', dropDown: true , menu: [{name: 'New Account', subLink: '/create'}, {name: 'Custom Address', subLink: '/create2' }] },
  { title: 'View Account Info', link: '/access', dropDown: false , icon: 'icon-info' },
  { title: 'Send KLAY & Token', link: '/transfer',dropDown: false ,  icon: 'icon-send' },
  { title: 'KLAY Faucet', link: '/faucet', dropDown: false , icon: 'icon-faucet' },
  { title: 'more', menuClass: 'menu-more',  link: null, isDropDown: true, icon: 'icon-more', dropDown: true , menu: [{name: 'Klaytnscope',pageMove: true, subLink: KLAYTN_SCOPE_URL}, {name: 'Klaytn IDE', pageMove: true, subLink: KLAYTN_IDE_URL },{name: 'Klaytn Docs', pageMove: true, subLink: KLAYTN_DOCS_URL }]},
]

console.log(KLAYTN_SCOPE_URL)
const Nav = ({ className, onClick }) => (
  <div className={cx('Nav', className)} onClick={onClick}>
    <Link to="/" className="Header__logo" />
    <TabList tabItems={navLinks} />
  </div>
)

export default Nav
