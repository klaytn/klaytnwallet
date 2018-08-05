import React from 'react'
import { connect } from 'react-redux'

import TabList from 'components/TabList'

import './Nav.scss'

const navLinks = [
  { title: 'Creation', link: '/create' },
  { title: 'Access', link: '/access' },
  { title: 'Transfer', link: '/transfer' },
]

const Nav = () => (
  <div className="Nav">
    <TabList tabItems={navLinks} />
  </div>
)

const mapStateToProps = (state) => ({
  address: state.wallet.address,
})

export default connect(
  mapStateToProps,
  null,
)(Nav)
