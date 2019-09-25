import React, { Component } from 'react'
import cx from 'classnames'
import Button from 'components/Button'
import './AlertPopup.scss'

class AlertPopup extends Component<Props> {
  
  constructor() {
    super()
  }
  
  componentDidMount() {
  }

  render() {
    const {
      popupShow,
      buttonName,
      buttonClick,
      title,
      message
    } = this.props
    

    return (
      <div className={cx('createMainPopup AlertPopup', {
        'show': popupShow
      })}>
          <div className="createMainPopup__inner">
            <span  className="popup__title">{title}</span>
            <p className="popup__message2">
            {message}
            </p>
            <div className="popup__bottom__box">
              <Button
                className="popup__btn"
                key={buttonName}
                title={buttonName}
                onClick={buttonClick}
              />
            </div>
          </div>           
     </div>
    )
  }
}


export default AlertPopup
