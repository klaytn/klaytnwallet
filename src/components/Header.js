import React from 'react'
import { Link } from 'react-router'

import './Header.scss'

const Header = () => (
  <div className="Header">
    <div className="Header__LogoWithLink">
      <div className="Header__logo" />
      <Link to="/klaytnscope" className="Header__link">klaytnscope</Link>
    </div>
    <div className="Header__network">Moso Network</div>
  </div>
)

export default Header
