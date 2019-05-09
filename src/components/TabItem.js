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
  render() {
    const { isHovered, menuOpen } = this.state
    const { title, link, isActive, icon, menus, isMenuActive, menuClick, onMenuName, menuClass, dropDown } = this.props
    const privateKeyDecrypt = decryptAction(sessionStorage.getItem('was'))
    return (
      <div className={classNames(menuClass,{'dropDown':dropDown})}>
        <Link
          className={classNames('TabItem', {
            'TabItem--active': isActive || isHovered,
            'TabItem--open': isActive,
          })}
          to={link}
          onClick={() => {
            if(dropDown && onMenuName === title){         
              menuClick('')
            }else{
              menuClick(title)
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
              {(menus.map(({ id, name, subLink, pageMove, upcoming }) => (
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
                    'link__upcoming': upcoming
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
