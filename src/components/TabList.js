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
  componentWillReceiveProps(prevProps) {
    const { moreMenuClick } = this.state
    if(moreMenuClick){
      this.menuClick(false)
    }
  }

  render() {
    const { tabItems } = this.props
    const { moreMenuClick } = this.state
    
    const [ empty2, locationPathname ] = window.location.pathname.split('/')
    return (
      <div className="TabList">
        {tabItems.map(({ title, link, icon, menu, dropDown, subLink, menuClass, search, isDropDown}) => {
          return (
            <TabItem
              isActive={
                (link === '/'
                   ? link == '/'+locationPathname
                  :  (link =='/'+locationPathname && !window.location.search) || search == window.location.search || subLink == '/'+locationPathname) && !isDropDown && !moreMenuClick || (isDropDown && moreMenuClick)
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
