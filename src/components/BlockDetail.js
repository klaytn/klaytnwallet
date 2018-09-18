import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import moment from 'utils/moment'

import BlockSummary from 'components/BlockSummary'
import BlockTransactionsSummary from 'components/BlockTransactionsSummary'
import BlockCommitteeInfo from 'components/BlockCommitteeInfo'
import CommitteeStatus from 'components/CommitteeStatus'

import './BlockDetail.scss'

type Props = {

}

class BlockDetail extends Component<Props> {
  state = {
    data: null,
  }

  componentDidMount() {
    this.init()
  }

  init = () => {
    const { routeParams } = this.props
    fetch(`http://dev.scope.klaytn.com/api/block/${routeParams.blockNumberOrHash}`)
      .then(res => res.json())
      .then(({ result, status }) => {
        if (status == 'FAIL') {
          browserHistory.push('/blocks')
          return
        }

        this.setState({
          data: result,
        })
      })
      .catch(console.log)
  }

  render() {
    const { data } = this.state
    const { routeParams: { blockNumberOrHash } } = this.props

    return !!data && (
      <div className="BlockDetail">
        <header className="BlockDetail__header">
          <span className="BlockDetail__title">Block</span>
          <span className="BlockDetail__blockNumber">#{blockNumberOrHash}</span>
        </header>
        <BlockSummary
          className="BlockDetail__blockSummary"
          height={data.number}
          age={moment(data.timestamp * 1000).fromNow()}
          hash={data.hash}
          parentHash={data.parentHash}
          blockSize={data.size}
        />
        <BlockTransactionsSummary
          className="BlockDetail__blockTransactionsSummary"
          deployment={data.countOfSmartContractDeploy}
          execution={data.countOfSmartContractExecution}
          transfer={data.countOfValueTransfer}
        />
        <BlockCommitteeInfo
          className="BlockDetail__blockCommitteeInfo"
          validator={data.committee}
          proposer={data.proposer}
        />
      </div>
    )
  }
}

export default BlockDetail
