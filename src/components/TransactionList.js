import React, { Component, Fragment } from 'react'
import { Link } from 'react-router'
import BN from 'bignumber.js'

import { onit } from 'klaytn/onit'
import Table from 'components/Table'
import { nameCommittee, nameTxCategory } from 'utils/block'
import { callAPI } from 'utils/apiCaller'
import moment from 'utils/moment'

import './TransactionList.scss'

type Props = {

}

class TransactionList extends Component<Props> {
  state = {
    data: [],
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.search !== nextProps.location.search) {
      this.init(nextProps.location.query)
    }
  }

  componentDidMount() {
    this.init()
  }

  init = (query = {}) => {
    callAPI('/api/transactions', {
      filters: {
        account: query.account,
        block: Number(query.block),
        txcategory: Number(query.txcategory),
      },
      page: 0,
    })
      .then(({ result }) => {
        this.setState({
          data: result,
        })
      })
      .catch(console.log)
  }

  columns = [
    {
      Header: 'TX Hash',
      accessor: 'txHash',
      minWidth: 70,
      Cell: row => (
        <Link to={`/transaction/${row.value}`}>{row.value}</Link>
      )
    },
    {
      Header: 'Height',
      accessor: 'blockNumber',
      minWidth: 50,
    },
    {
      id: 'age',
      Header: 'Age',
      accessor: d => moment(d.timestamp * 1000).fromNow(),
      minWidth: 90,
    },
    {
      id: 'fromTo',
      Header: 'From -> To',
      accessor: d => ({ from: d.from, to: d.to }),
      minWidth: 90,
      Cell: row => (
        <span>
          <Link to={`/transactions?account=${row.value.from}`}>{row.value.from}</Link><br />
          <img className="TransactionList__fromToIcon" src="/static/images/icon-arrow-04.svg" />
          <Link to={`/transactions?account=${row.value.to}`}>{row.value.to}</Link>
        </span>
      ),
    },
    {
      id: 'amount',
      Header: 'Amount',
      accessor: d => `${d.value} KLAY`,
      minWidth: 90,
    },
    {
      id: 'tx-category',
      Header: 'TX Category',
      accessor: d => ({ category: d.transactionCategory, blockNumber: d.blockNumber }),
      minWidth: 140,
      Cell: row => (
        <Link
          to={`/transactions?block=${row.value.blockNumber}&txcategory=${row.value.category}`}
          className={`TransactionList__symbol TransactionList__symbol--${nameTxCategory(true)[row.value.category]}`}
        >
          {nameTxCategory()[row.value.category]}
        </Link>
      ),
    },
    {
      id: 'tx fee',
      Header: 'TX Fee',
      accessor: d => onit.utils.fromWei(`${d.gasPrice * d.gasUsed}`, 'ether').slice(0, 12),
      minWidth: 90,
    },
  ]

  render() {
    const { data } = this.state
    return (
      <div className="TransactionList">
        <header className="TransactionList__title">Transactions</header>
        <Table
          data={data}
          columns={this.columns}
        />
      </div>
    )
  }
}

export default TransactionList
