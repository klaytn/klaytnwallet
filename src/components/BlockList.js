import React, { Component, Fragment } from 'react'
import { Link } from 'react-router'
import moment from 'utils/moment'

import Table from 'components/Table'
import { nameCommittee } from 'utils/block'

import './BlockList.scss'

type Props = {

}

class BlockList extends Component<Props> {
  state = {
    data: [],
  }

  componentDidMount() {
    this.init()
  }

  init = () => {
    fetch('http://dev.scope.klaytn.com/api/blocks/')
      .then(res => res.json())
      .then(({ result }) => {
        this.setState({
          data: result.slice(-20),
        })
      })
      .catch(console.log)
  }

  columns = [
    {
      Header: 'Height',
      accessor: 'number',
      minWidth: 90,
      Cell: row => (
        <Link to={`/block/${row.value}`}>{row.value}</Link>
      )
    },
    {
      id: 'age',
      Header: 'Age',
      accessor: d => moment(d.timestamp * 1000).fromNow(),
      minWidth: 90,
    },
    {
      Header: 'Smart Contract Deployment',
      accessor: 'countOfSmartContractDeploy',
      minWidth: 90,
      Cell: row => (
        <span className="BlockList__symbol BlockList__symbol--deployment">
          {row.value}
        </span>
      ),
    },
    {
      Header: 'Smart Contract Execution',
      accessor: 'countOfSmartContractExecution',
      minWidth: 90,
      Cell: row => (
        <span className="BlockList__symbol BlockList__symbol--execution">
          {row.value}
        </span>
      ),
    },
    {
      Header: 'Value Transfer',
      accessor: 'countOfValueTransfer',
      minWidth: 90,
      Cell: row => (
        <span className="BlockList__symbol BlockList__symbol--transfer">
          {row.value}
        </span>
      ),
    },
    {
      id: 'totalTxs',
      Header: 'Total TXs',
      accessor: d => d.countOfSmartContractDeploy
        + d.countOfSmartContractExecution
        + d.countOfValueTransfer,
      minWidth: 90,
      Cell: row => (
        <span className="BlockList__symbol BlockList__symbol--total">
          {row.value}
        </span>
      ),
    },
    {
      id: 'bp',
      Header: 'BP',
      accessor: d => nameCommittee(d.proposer),
      minWidth: 90,
    },
    {
      Header: 'Size (Byte)',
      accessor: 'size',
      minWidth: 90,
    },
  ]

  render() {
    const { data } = this.state
    return (
      <div className="BlockList">
        <header className="BlockList__title">Blocks</header>
        <Table
          data={data}
          columns={this.columns}
        />
      </div>
    )
  }
}

export default BlockList
