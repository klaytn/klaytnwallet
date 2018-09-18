import React, { Component, Fragment } from 'react'
import { Link } from 'react-router'
import cx from 'classnames'
import { first } from 'lodash'

import Table from 'components/Table'

import moment from 'utils/moment'
import { nameCommittee } from 'utils/block'
import { callAPI } from 'utils/apiCaller'

import './LatestBlockTable.scss'

type Props = {

}

class LatestBlockTable extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      data: props.blocks // initial data from '/api/home'
    }
  }

  refresh = () => {
    callAPI('/api/blocks', {
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
      id: 'height',
      Header: 'Height',
      accessor: 'number',
      Cell: row => (
        <Link to={`/block/${row.value}`}>
          {row.value}
        </Link>
      ),
      minWidth: 90,
    },
    {
      id: 'age',
      Header: 'Age',
      accessor: d => moment(d.timestamp * 1000).fromNow(),
      minWidth: 90,
    },
    {
      id: 'txs',
      Header: 'TXs',
      accessor: d => Number(d.countOfValueTransfer
          + d.countOfSmartContractDeploy
          + d.countOfSmartContractExecution || 0),
      minWidth: 90,
    },
    {
      id: 'bp',
      Header: 'BP',
      accessor: d => nameCommittee(d.proposer),
      Cell: row => (
        <Link to={`/block/${row.value}`}>
          {row.value}
        </Link>
      ),
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
    const { className } = this.props

    return (
      <div className={cx('LatestBlockTable', className)}>
        <Table
          title="Latest Blocks"
          data={data}
          columns={this.columns}
          onClick={this.refresh}
        />
      </div>
    )
  }
}

export default LatestBlockTable
