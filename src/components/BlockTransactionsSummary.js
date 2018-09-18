import React from 'react'
import cx from 'classnames'

import './BlockTransactionsSummary.scss'

type Props = {

}

const BTSummaryItem = ({
  title,
  value,
  deployment,
  execution,
  transfer,
}) => (
  <div className="BlockTransactionsSummary__item">
    <div className="BlockTransactionsSummary__itemDecorations">
      <div
        style={{ width: `${deployment}%` }}
        className="BlockTransactionsSummary__itemDecoration BlockTransactionsSummary__itemDecoration--deployment"
      />
      <div
        style={{ width: `${execution}%` }}
        className="BlockTransactionsSummary__itemDecoration BlockTransactionsSummary__itemDecoration--execution"
      />
      <div
        style={{ width: `${transfer}%` }}
        className="BlockTransactionsSummary__itemDecoration BlockTransactionsSummary__itemDecoration--transfer"
      />
    </div>
    <header className="BlockTransactionsSummary__itemTitle">{title}</header>
    <p className="BlockTransactionsSummary__itemValue">{value}</p>
  </div>
)

const BlockTransactionsSummary = ({
  className,
  deployment = 21,
  execution = 19,
  transfer = 100,
}) => {
  const total = Number(deployment) + Number(execution) + Number(transfer)
  return (
    <div className={cx('BlockTransactionsSummary', className)}>
      <header className="BlockTransactionsSummary__title">Block Transactions</header>
      <BTSummaryItem title="Smart Contract Deployment" value={deployment} deployment="100" />
      <BTSummaryItem title="Smart Contract Execution" value={execution} execution="100" />
      <BTSummaryItem title="Value Transfer" value={transfer} transfer="100" />
      <BTSummaryItem
        title="All TX"
        value={total}
        deployment={(deployment / total) * 100}
        execution={(execution / total) * 100}
        transfer={(transfer / total) * 100}
      />
    </div>
  )
}

export default BlockTransactionsSummary
