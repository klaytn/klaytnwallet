import React, { Component, Fragment } from 'react'
import cx from 'classnames'
import moment from 'utils/moment'

import Table from 'components/Table'
import { callAPI } from 'utils/apiCaller'

import './LatestTxTable.scss'

type Props = {

}

class LatestTxTable extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      data: props.transactions // initial data from '/api/home'
    }
  }

  refresh = () => {
    callAPI('/api/transactions', {
      page: 0,
    })
      .then(({ result }) => {
        this.setState({
          data: result,
        })
      })
      .catch(console.log)
  }

  render() {
    const { data } = this.state
    const { className } = this.props
    const columns = [
      {
        Header: 'TX Hash',
        accessor: 'txHash',
        minWidth: 90,
      },
      {
        id: 'age',
        Header: 'Age',
        accessor: d => moment(d.timestamp * 1000).fromNow(),
        minWidth: 90,
      },
      {
        id: 'fromTo',
        Header: 'From/To',
        accessor: d => ({ from: d.from, to: d.to }),
        Cell: row => (
          <Fragment>
            <span className="LatestTxTable__from">{row.value.from}</span>
            <br />
            -> <span className="LatestTxTable__to">{row.value.to}</span>
          </Fragment>
        ),
        minWidth: 90,
      },
      {
        id: 'amount',
        Header: 'Amount',
        accessor: d => `${d.value} KLAY`,
        minWidth: 90,
      },
      {
        Header: 'Tx Category',
        accessor: 'transactionCategory',
        Cell: row => (
          <div className={cx('LatestTxTable__categorySymbol', {
            'LatestTxTable__categorySymbol--deploy': row.value == 2,
            'LatestTxTable__categorySymbol--execution': row.value == 1,
            'LatestTxTable__categorySymbol--transfer': row.value == 0,
          })} />
        ),
        minWidth: 90,
      },
  ]

    return (
      <div className={cx('LatestTxTable', className)}>
        <Table
          title="Latest Transactions"
          data={data}
          columns={columns}
          onClick={this.refresh}
        />
      </div>
    )
  }
}

export default LatestTxTable
