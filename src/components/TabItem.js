import React, { Component } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'

import { onit } from 'klaytn/onit'

import './TabItem.scss'

type Props = {
  title: string,
  link: string,
}

class TabItem extends Component<Props> {
  state = {
    isHovered: false,
  }

  toggleHover = (isHovered) => () => {
    this.setState({
      isHovered,
    })
  }

  render() {
    const { isHovered } = this.state
    const { title, link, isActive, icon } = this.props
    return (
      <Link
        className={classNames('TabItem', {
          'TabItem--active': isActive,
        })}
        to={link}
        onClick={() => { onit.klay.accounts.wallet.clear() }}
        onMouseEnter={this.toggleHover(true)}
        onMouseLeave={this.toggleHover(false)}
      >
        <img
          className="TabItem__icon"
          src={`/static/images/${icon}${(isActive || isHovered) ? '-on' : '-off'}.svg`}
        />
        {title}
        </Link>
    )
  }
}

export default TabItem
