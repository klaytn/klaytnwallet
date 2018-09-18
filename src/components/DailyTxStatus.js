import React, { Component } from 'react'
import cx from 'classnames'

import Chart from 'components/Chart'

import './DailyTxStatus.scss'

type Props = {

}

class DailyTxStatus extends Component<Props> {
  componentDidMount() {
  }

  render() {
    const { className } = this.props

    return (
      <div className={cx('DailyTxStatus', className)}>
        <div className="DailyTxStatus__visualization">
          <Chart />
        </div>
        <div className="DailyTxStatus__explanation">
          <header className="DailyTxStatus__title">Daily TX</header>
          <p
            className="DailyTxStatus__legend DailyTxStatus__legend--deployment"
          >
            Smart Contract Deployment
          </p>
          <p
            className="DailyTxStatus__legend DailyTxStatus__legend--execution"
          >
            Smart Contract Execution
          </p>
          <p
            className="DailyTxStatus__legend DailyTxStatus__legend--transfer"
          >
            Value Transfer
          </p>
        </div>
      </div>
    )
  }
}

export default DailyTxStatus
