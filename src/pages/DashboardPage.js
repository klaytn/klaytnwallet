import React, { Component } from 'react'
import { first } from 'lodash'

import Chart from 'components/Chart'
import Stats from 'components/Stats'
import RefreshTable from 'components/RefreshTable'
import LatestBlockTable from 'components/LatestBlockTable'
import LatestTxTable from 'components/LatestTxTable'

import './DashboardPage.scss'

type Props = {

}

class DashboardPage extends Component<Props> {
  state = {
    blocks: [],
    transactions: [],
    isLoading: true,
  }

  componentDidMount() {
    this.init()
  }

  init = () => {
    fetch('http://dev.scope.klaytn.com/api/home/')
      .then(res => res.json())
      .then(({ blocks, transactions }) => {
        this.setState({
          currentBlockHeight: blocks && first(blocks).number,
          blocks: blocks,
          transactions: transactions,
          isLoading: false,
        })
      })
      .catch(console.log)
  }

  render() {
    const { isLoading, blocks, transactions, currentBlockHeight } = this.state
    return !isLoading && (
      <div className="DashboardPage">
        <div className="DashboardPage__statsBackground" />
        <Stats currentBlockHeight={currentBlockHeight} />
        <LatestBlockTable blocks={blocks} className="DashboardPage__table" />
        <LatestTxTable transactions={transactions} className="DashboardPage__table" />
      </div>
    )
  }
}

export default DashboardPage
