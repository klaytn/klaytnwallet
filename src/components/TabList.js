import React, { Component } from 'react'

import TabItem from 'components/TabItem'
import SidebarFooter from 'components/SidebarFooter'
import './TabList.scss'

type Props = {

}

class TabList extends Component<Props> {

  render() {
    const { tabItems } = this.props
    const [ empty, nextTo ] = (window.location.search || '').split('?next=')

    return (
      <div className="TabList">
        {tabItems.map(({ title, link, icon, menu , dropDown, menuClass}) => {
          return (
            <TabItem
              isActive={
                link === '/'
                  ? link == window.location.pathname
                  : nextTo
                    ? (`/${nextTo}` == link)
                    : new RegExp(link).test(window.location.pathname)
                }
              icon={icon}
              key={title}
              title={title}
              link={link}
              menus={menu}
              dropDown={dropDown}
              menuClass={menuClass}
            />
          )
        })}

        <SidebarFooter />
      </div>
    )
  }
}

export default TabList
