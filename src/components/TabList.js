import React, { Component } from 'react'

import TabItem from 'components/TabItem'

import './TabList.scss'

type Props = {

}

class TabList extends Component<Props> {
  render() {
    const { tabItems } = this.props
    return (
      <div className="TabList">
        {tabItems.map(({ title, link, icon }) => (
          <TabItem
            isActive={
              link === '/'
                ? link == window.location.pathname
                : new RegExp(link).test(window.location.pathname)
              }
            icon={icon}
            key={title}
            title={title}
            link={link}
          />
        ))}
      </div>
    )
  }
}

export default TabList
