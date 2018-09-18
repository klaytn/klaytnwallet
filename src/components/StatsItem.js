import React from 'react'
import ReactTooltip from 'react-tooltip'

type Props = {

}

import './StatsItem.scss'

const StatsItem = ({
  title,
  value,
  tooltip,
  deployment,
  execution,
  transfer,
}) => {

  return (
    <div className="StatsItem">
      {deployment && execution && transfer && (
        <div className="StatsItem__decoration">
          <div style={{ width: `${deployment}%` }} />
          <div style={{ width: `${execution}%` }} />
          <div style={{ width: `${transfer}%` }} />
        </div>
      )}
      <p className="StatsItem__value">{value}</p>
      <header className="StatsItem__title">
        <span>{title}</span>
        {tooltip && (
          <img
            src="/static/images/icon-help.svg"
            data-tip
            data-for={title}
            className="StatsItem__tooltipTrigger" />
        )}
        <ReactTooltip
          id={title}
          place="bottom"
          effect="solid"
          className="StatsItem__tooltip"
        >
          {tooltip}
        </ReactTooltip>
      </header>
    </div>
  )
}

export default StatsItem
