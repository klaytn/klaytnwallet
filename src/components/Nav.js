import React from 'react'

import TabList from 'components/TabList'

import './Nav.scss'

const navLinks = [
  { title: '지갑 생성', link: '/create' },
  { title: '내 정보', link: '/access' },
  { title: '전송', link: '/transfer' },
]

const Nav = () => (
  <div className="Nav">
    <TabList tabItems={navLinks} />
  </div>
)

export default Nav
