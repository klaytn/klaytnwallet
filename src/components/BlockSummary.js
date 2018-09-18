import React from 'react'
import cx from 'classnames'

import './BlockSummary.scss'

type Props = {

}

const BlockSummaryItem = ({ title, value }) => (
  <div className="BlockSummary__item">
    <span className="BlockSummary__itemTitle">{title}</span>
    <span className="BlockSummary__itemValue">{value}</span>
  </div>
)

const BlockSummary = ({
  className,
  height,
  age,
  hash,
  parentHash,
  blockSize,
}) => (
  <div className={cx('BlockSummary', className)}>
    <BlockSummaryItem title="Height" value={height} />
    <BlockSummaryItem title="Age" value={age} />
    <BlockSummaryItem title="Hash" value={hash} />
    <BlockSummaryItem title="Parent Hash" value={parentHash} />
    <BlockSummaryItem title="Block Size" value={blockSize} />
  </div>
)

export default BlockSummary
