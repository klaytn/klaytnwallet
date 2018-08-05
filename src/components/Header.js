import React from 'react'
import { connect } from 'react-redux'

import './Header.scss'

const HeaderLogo = () => (
  <div className="HeaderLogo">
    <p className="HeaderLogo__title">MyKlayWallet</p>
  </div>
)

const Header = () => (
  <div className="Header">
    <HeaderLogo />
  </div>
)

const mapStateToProps = (state) => ({
  address: state.wallet.address,
})

export default connect(
  mapStateToProps,
  null,
)(Header)
