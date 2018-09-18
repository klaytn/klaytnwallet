import React, { Component } from 'react'

import Button from 'components/Button'
import StatsItem from 'components/StatsItem'
import CommitteeStatus from 'components/CommitteeStatus'
import DailyTxStatus from 'components/DailyTxStatus'

import './Stats.scss'

type Props = {

}

class Stats extends Component<Props> {
  render() {
    const { currentBlockHeight } = this.props
    return (
      <div className="Stats">
        <header className="Stats__header">
          <h1 className="Stats__title">Stats</h1>
          <Button className="Stats__guide" title="Guide" gray />
        </header>
        <StatsItem title="Block height" value={currentBlockHeight} />
        <StatsItem
          title="Current TPS"
          value="34"
          tooltip="
            Calculation based on number of transactions per
            second that occured on the latest block"
        />
        <StatsItem
          title="Daily TX"
          value="4856"
          tooltip="Number of transactions in the last 24 hours"
          deployment="21"
          execution="50"
          transfer="13"
        />
        <StatsItem
          title="Daily Active Account"
          value="712"
          tooltip="Number of accounts that have made transactions in the last 24 hours"
        />
        <CommitteeStatus className="Stats__committeeStatus" />
        <DailyTxStatus className="Stats__dailyTxStatus" />
      </div>
    )
  }
}

export default Stats
