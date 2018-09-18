import React, { Component } from 'react'
import { Link } from 'react-router'

import InputSearch from 'components/InputSearch'

import './HeaderNav.scss'

type Props = {

}

class HeaderNav extends Component<Props> {
  render() {
    return (
      <div className="HeaderNav">
        <Link className="HeaderNav__link" to="/blocks">Blocks</Link>
        <Link className="HeaderNav__link" to="/transactions">Transactions</Link>
        <InputSearch placeholder="Account, Tx hash, Block" />
      </div>
    )
  }
}

export default HeaderNav
