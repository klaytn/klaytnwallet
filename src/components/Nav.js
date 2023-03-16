import React from 'react'
import { Link } from 'react-router'
import cx from 'classnames'

import TabList from 'components/TabList'
import { KLAYTN_SCOPE_URL,KLAYTN_DOCS_URL,KLAYTN_IDE_URL, KLAYTN_URL_NAME, KLAYTN_FINDER_URL } from 'walletConstants/url'
import './Nav.scss'

let navLinks
if(KLAYTN_URL_NAME === 'Main Network'){
  navLinks = [
   //{ title: 'Create Account', menuClass: 'menu-create', link: '/create', subLink: '/create2', icon: 'icon-create', dropDown: true , menu: [{name: 'New Account', subLink: '/create'}, {name: 'Custom Address', subLink: '/create2' }] },
    { title: 'Create Account', menuClass: 'menu-create', link: '/create', icon: 'icon-create', },
    { title: 'View Account Info', link: '/access', dropDown: false , icon: 'icon-info' },
    { title: 'Send KLAY & Token', link: '/transfer', search:'?next=transfer', dropDown: false ,  icon: 'icon-send' },
    { title: 'More', menuClass: 'menu-more',  link: null, isDropDown: true, icon: 'icon-more', dropDown: true , menu: [{name: 'Klaytnfinder', pageMove: true, subLink: KLAYTN_FINDER_URL}, {name: 'Klaytnscope', pageMove: true, subLink: KLAYTN_SCOPE_URL}, {name: 'Remix IDE', pageMove: true, subLink: KLAYTN_IDE_URL }, {name: 'Klaytn Docs', pageMove: true, subLink: KLAYTN_DOCS_URL }]},
  ]
}else{
  navLinks = [
   // { title: 'Create Account', menuClass: 'menu-create', link: '/create', subLink: '/create2', icon: 'icon-create', dropDown: true , menu: [{name: 'New Account', subLink: '/create'}, {name: 'Custom Address', subLink: '/create2' }] },
    { title: 'Create Account', menuClass: 'menu-create', link: '/create', icon: 'icon-create', },
    { title: 'View Account Info', link: '/access', dropDown: false , icon: 'icon-info' },
    { title: 'Send KLAY & Token', link: '/transfer', search:'?next=transfer', dropDown: false ,  icon: 'icon-send' },
    { title: 'KLAY Faucet', link: '/faucet', dropDown: false ,search: '?next=faucet', icon: 'icon-faucet' },
    { title: 'More', menuClass: 'menu-more',  link: null, isDropDown: true, icon: 'icon-more', dropDown: true , menu: [{name: 'Klaytnfinder', pageMove: true, subLink: KLAYTN_FINDER_URL}, {name: 'Klaytnscope', pageMove: true, subLink: KLAYTN_SCOPE_URL}, {name: 'Remix IDE', pageMove: true, subLink: KLAYTN_IDE_URL }, {name: 'Klaytn Docs', pageMove: true, subLink: KLAYTN_DOCS_URL }]},
  ]
}

console.log(KLAYTN_SCOPE_URL)
const Nav = ({ className, onClick }) => (
  <div className={cx('Nav', className)} onClick={onClick}>
    <Link to="/" className="Header__logo" />
    <TabList tabItems={navLinks} setHistory={window.location} />
  </div>
)

export default Nav
