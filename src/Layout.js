import React from 'react'

import Header from 'components/Header'
import Nav from 'components/Nav'
import Radio from 'components/Radio'
import AlertHeader from 'components/AlertHeader'

import './Layout.scss'

type Props = {
  children: React.DOM,
}

const Layout = ({ children }: Props) => (
  <div className="Layout">
    <Header />
    {children}
  </div>
)

export default Layout
