import React, { Component } from 'react'
import cx from 'classnames'

import './CommitteeStatus.scss'

type Props = {

}

const CommitteeSymbol = ({ nodeId, validator, proposer }) => {
  // for background image looping.
  const numberedNodeId = Number(nodeId || 0)

  const symbolDecorator = nodeId == validator
    ? `--validator${numberedNodeId}`
    : numberedNodeId == proposer
      ? `--proposer${numberedNodeId}`
      : `--${numberedNodeId}`

  return (
    <span
      nodeId={nodeId}
      className={cx('CommitteeStatus__symbol', {
        [`CommitteeStatus__symbol${symbolDecorator}`]: nodeId,
      })}
    />
  )
}

class CommitteeStatus extends Component<Props> {
  render() {
    const { className, labelOnly } = this.props
    return (
      <div className={cx('CommitteeStatus', className)}>
        <div className="CommitteeStatus__visualization">
          <CommitteeSymbol nodeId="01" validator="01" proposer="03" />
          <CommitteeSymbol nodeId="02" validator="01" proposer="03" />
          <CommitteeSymbol nodeId="03" validator="01" proposer="03" />
          <CommitteeSymbol nodeId="04" validator="01" proposer="03" />
          <CommitteeSymbol nodeId="05" validator="01" proposer="03" />
          <CommitteeSymbol nodeId="06" validator="01" proposer="03" />
          <CommitteeSymbol nodeId="07" validator="01" proposer="03" />
        </div>
        <div className="CommitteeStatus__explanation">
          <header className="CommitteeStatus__title">Committee</header>
          <div className="CommitteeStatus__blockProposer">
            <label className="CommitteeStatus__label CommitteeStatus__label--blockProposer">
              Block Proposer
            </label>
            {!labelOnly && (
              <p className="CommitteeStatus__blockProposerValue">
                Node01
              </p>
            )}
          </div>
          <div className="CommitteeStatus__validator">
            <label className="CommitteeStatus__label CommitteeStatus__label--validator">
              Validator
            </label>
            {!labelOnly && (
              <p className="CommitteeStatus__validatorValue"></p>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default CommitteeStatus
