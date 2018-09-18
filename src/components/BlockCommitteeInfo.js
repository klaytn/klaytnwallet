import React, { Component } from 'react'
import cx from 'classnames'

import CommitteeStatus from 'components/CommitteeStatus'
import { nameCommittee } from 'utils/block'

import './BlockCommitteeInfo.scss'

type Props = {

}

const BlockCommitteeNode = ({
  title,
  address,
}) => (
  <div className="BlockCommitteeInfo__node">
    <span className="BlockCommitteeInfo__nodeTitle">{title}</span>
    <span className="BlockCommitteeInfo__nodeAddress">{address}</span>
  </div>
)

class BlockCommitteeInfo extends Component<Props> {
  render() {
    const { className, validator, proposer } = this.props
    return (
      <div className={cx('BlockCommitteeInfo', className)}>
        <header className="BlockCommitteeInfo__title">Committee</header>
        <CommitteeStatus
          className="BlockCommitteeInfo__status"
          proposer={proposer}
          validator={validator}
          labelOnly
        />
        <div className="BlockCommitteeInfo__description">
          <div className="BlockCommitteeInfo__committee BlockCommitteeInfo__committee--blockProposer">
            <label>Block Proposer</label>
            <BlockCommitteeNode title={nameCommittee(proposer)} address={proposer} />
          </div>
          <div className="BlockCommitteeInfo__committee BlockCommitteeInfo__committee--validator">
            <label>Validator</label>
            {validator.map(address => (
              <BlockCommitteeNode title={nameCommittee(address)} address={address} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default BlockCommitteeInfo
