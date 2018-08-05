import React from 'react'

import Header from 'components/Header'
import Nav from 'components/Nav'

import './Layout.scss'

type Props = {
  children: React.DOM,
}

const Layout = ({ children }: Props) => (
  <div className="Layout">
    <Header />
    <Nav />
    {children}
  </div>
)

export default Layout
