import React, { Component } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import cx from 'classnames'
import { caver } from 'klaytn/caver'
import { decryptAction } from 'utils/crypto'
import './TabItem.scss'

type Props = {
  title: string,
  link: string,
}

class TabItem extends Component<Props> {
  state = {
    isHovered: false,
    menuOpen: false,
    moreMenuClick: false,
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
    const { isHovered, menuOpen, moreMenuClick } = this.state
    const { title, link, isActive, icon, menus, isMenuActive, menuClick, menuClass, dropDown, isDropDown } = this.props
    const privateKeyDecrypt = decryptAction(sessionStorage.getItem('was'))
    return (
      <div className={classNames(menuClass,{'dropDown':dropDown})}>
        <Link
          className={classNames('TabItem', {
            'TabItem--active': isActive || isHovered,
            'TabItem--open': isActive || moreMenuClick,
          })}
          to={link}
          onClick={() => {
            if(isDropDown){         
              menuClick(true)
              console.log('23432423')
            }else{
              menuClick(false)
            }

            if (privateKeyDecrypt) return
            caver.klay.accounts.wallet.clear()
          }}
          onMouseEnter={this.toggleHover(true)}
          onMouseLeave={this.toggleHover(false)}
        >
        <img
          className="TabItem__icon"
          src={`/static/images/${icon}${( isActive || isHovered ) ? '-on' : '-off'}.svg`}
        />
        <span className="TabItem__text">{title}</span>
        </Link>
          {      
            menus && 
            <ul className={cx('SidebarNav__dropDownMenu',{'dropDownMenu' : dropDown})}>
              {(menus.map(({ id, name, subLink, pageMove }) => (
                <li key={name}>
                {!pageMove ?(
                    <Link
                  to={subLink}
                  onClick={() => {
                    if (privateKeyDecrypt) return
                    caver.klay.accounts.wallet.clear()
                  }} 
                  onMouseEnter={this.innerToggleHover(true)}
                  onMouseLeave={this.innerToggleHover(false)}
                  className={classNames('SidebarNav__dropDownLink', {
                    'SidebarNav__dropDownLink--active': window.location.pathname == subLink,
                  })}
                  >{name}</Link>
                  ):(
                  <a
                  href={subLink}
                  target="_blank"
                  onClick={() => {
                    if (privateKeyDecrypt) return
                    caver.klay.accounts.wallet.clear()
                  }} 
                  onMouseEnter={this.innerToggleHover(true)}
                  onMouseLeave={this.innerToggleHover(false)}
                  className="SidebarNav__dropDownLink pageLink"
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
