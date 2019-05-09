import React, { Component } from 'react'

import TabItem from 'components/TabItem'
import SidebarFooter from 'components/SidebarFooter'
import './TabList.scss'

type Props = {

}
const menuList = {
  create: 'Create Account',
  access: 'View Account Info',
  transfer: 'Send KLAY & Token',
  faucet: 'KLAY Faucet',
  '?next=faucet': 'KLAY Faucet',
  '?next=transfer': 'Send KLAY & Token',
} 
class TabList extends Component<Props> {

  state = {
    onMenuName: menuList[window.location.search] ? menuList[window.location.search] : menuList[window.location.pathname.split('/')[1]],
  }
  menuClick = (value)=>{
    this.setState({ onMenuName : value})
  }
  
  render() {
    const { tabItems } = this.props
    const { onMenuName } = this.state
    const [ empty, nextTo ] = (window.location.search || '').split('?next=')

    return (
      <div className="TabList">
        {tabItems.map(({ title, link, icon, menu, dropDown, menuClass}) => {

          return (
            <TabItem
              isActive={ (window.location.pathname == '/' ? (onMenuName === 'more' && window.location.search ? onMenuName : '') : onMenuName) === title}
              icon={icon}
              key={title}
              title={title}
              link={link}
              menus={menu}
              dropDown={dropDown}
              menuClass={menuClass}
              menuClick={this.menuClick}
              onMenuName={onMenuName}
            />
          )
        })}

        <SidebarFooter />
        
      </div>
    )
  }
}

export default TabList
