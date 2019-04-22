import React, { Component } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import cx from 'classnames'
import { onit } from 'klaytn/onit'

import './TabItem.scss'

type Props = {
  title: string,
  link: string,
}

class TabItem extends Component<Props> {
  state = {
    isHovered: false,
    menuOpen: false,
  }

  toggleHover = (isHovered) => () => {    
    this.setState({
      isHovered,
    })
  }
  innerToggleHover = (isHovered) => () => {    
    this.setState({
      isHovered,
    })
  }
  menuClick = (isHovered) => () => {
    this.setState({
      isHovered,
    })
  }
  render() {
    const { isHovered, menuOpen } = this.state
    const { title, link, isActive, icon, menus, isMenuActive, dropDown } = this.props
    return (
      <div>
      <Link
        className={classNames('TabItem', {
          'TabItem--active': isActive || isHovered,
          'menuOpen' : dropDown && menuOpen
        })}
        to={link}
        onClick={() => {
          if(menuOpen){
            this.setState({menuOpen:false})
          }else{
            this.setState({menuOpen:true})
          }
          if (sessionStorage.getItem('prv')) return
          onit.klay.accounts.wallet.clear()
        }}
        onMouseEnter={this.toggleHover(true)}
        onMouseLeave={this.toggleHover(false)}
      >
        <img
          className="TabItem__icon"
          src={`/static/images/${icon}${( isActive || isHovered || (menuOpen && dropDown)) ? '-on' : '-off'}.svg`}
        />
        {title}
        </Link>
          {      
            menus && 
            <ul className={cx('SidebarNav__dropDownMenu',{'dropDownMenu' : dropDown,'menuOpen' : menuOpen})}>
              {(menus.map(({ id, name,subLink }) => (
                <li key={name}>
                {!dropDown ?(
                    <Link
                  to={subLink}
                  onClick={() => {
                    if (sessionStorage.getItem('prv')) return
                    onit.klay.accounts.wallet.clear()
                  }} 
                  onMouseEnter={this.innerToggleHover(true)}
                  onMouseLeave={this.innerToggleHover(false)}
                  className="SidebarNav__dropDownLink"
                  >{name}</Link>
                  ):(
                  <a
                  href={subLink}
                  target="_blank"
                  onClick={() => {
                    if (sessionStorage.getItem('prv')) return
                    onit.klay.accounts.wallet.clear()
                  }} 
                  onMouseEnter={this.innerToggleHover(true)}
                  onMouseLeave={this.innerToggleHover(false)}
                  className="SidebarNav__dropDownLink"
                  >{name}</a>

                 )
                }
                 
                
                </li>

              )))}
            </ul>
          }
       </div>
    )
  }
}

export default TabItem
