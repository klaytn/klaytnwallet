import React, { Component } from 'react'

import TabItem from 'components/TabItem'
import SidebarFooter from 'components/SidebarFooter'
import './TabList.scss'

type Props = {

}

class TabList extends Component<Props> {
  state = {
    moreMenuClick: false,
  }
  menuClick = (value)=>{
    const { moreMenuClick } = this.state
    if(!value){
      this.setState({moreMenuClick:false})
    } else{
      this.setState({moreMenuClick:true})
    }
  }
  
  render() {
    const { tabItems } = this.props
    const { moreMenuClick } = this.state
    const [ empty, nextTo ] = (window.location.search || '').split('?next=')

    return (
      <div className="TabList">
        {tabItems.map(({ title, link, icon, menu, dropDown, menuClass, isDropDown}) => {
          
          return (
            <TabItem
              isActive={
                (link === '/'
                  ? link == window.location.pathname
                  : nextTo
                    ? (`/${nextTo}` == link)
                    : new RegExp(link).test(window.location.pathname)) && !isDropDown && !moreMenuClick || (isDropDown && moreMenuClick)
                }
              icon={icon}
              key={title}
              title={title}
              link={link}
              menus={menu}
              dropDown={dropDown}
              menuClass={menuClass}
              isDropDown={isDropDown}
              menuClick={this.menuClick}
            />
          )
        })}

        <SidebarFooter />
      </div>
    )
  }
}

export default TabList
