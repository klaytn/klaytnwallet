import React, { Component } from 'react'
import cx from 'classnames'
import Button from 'components/Button'
import './ErrorPopup.scss'

class ErrorPopup extends Component<Props> {
  
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
      errorMessage
    } = this.props
    

    return (
      <div className={cx('createMainPopup', {
        'show': popupShow
      })}>
          <div className="createMainPopup__inner">
            <span  className="popup__title">Sorry, Your Transaction Failed</span>
            <p className="popup__message2">
            Below is the error message from Klaytn network :
            <br />
            <span className="alert_text">“{errorMessage}”</span>
            
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


export default ErrorPopup
