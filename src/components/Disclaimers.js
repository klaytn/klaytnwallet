import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import ReactHtmlParser from 'react-html-parser'
import cx from 'classnames'

import Button from 'components/Button'
import { KLAYTN_URL_NAME } from 'constants/url'
import { DISCLAIMERS } from 'constants/texts';
import store from '../store'
import './Disclaimers.scss'

class Disclaimers extends Component {
  state = {
    isShowingModal: false,
    isMainnet : KLAYTN_URL_NAME === 'Main Network' ? true : false, 
    isAgree: false,
    isReminderChecked: false,
    setLanguageName: 'English',
    languagObj: {
      'English':{
        button : 'I agree',
        chgeckText: 'I agree to all above.'
      },
      'Korean':{
        button : '동의',
        chgeckText: '위 내용에 동의합니다.'
      }
    }
  }

  textLanguageObject = DISCLAIMERS.ENG

  componentDidMount() {
    if(!sessionStorage.getItem('disclaimers')){
      this.setState({ isShowingModal: true })
    }
    const history = syncHistoryWithStore(browserHistory, store)
    history.listen(() => {
      if(!sessionStorage.getItem('disclaimers')){
        this.setState({ isShowingModal: true })
      }
    })
  }
  closePopup = () => {
    this.setState({ isShowingModal: false })
    sessionStorage.setItem('disclaimers', true)
  }
  toggleChecking = () => {
    
    this.setState({
      isReminderChecked: !this.state.isReminderChecked
    },()=>{
      const { isReminderChecked } = this.state
      this.setState({ isAgree: isReminderChecked })
    })
  }
  setlLanguageNameChange = (data) => {
    const { setLanguageName } = this.state  
    this.setState({ setLanguageName: data})
  }
  
  render() {
    const { isShowingModal, isMainnet, isAgree, isReminderChecked, setLanguageName,languagObj } = this.state

    if (setLanguageName === 'English') {
			this.textLanguageObject = DISCLAIMERS.ENG
		} else {
			this.textLanguageObject = DISCLAIMERS.KOR
    }
    
    return (
      <div className={cx('Disclaimers', {
        'show': isMainnet && isShowingModal,
        'agree': isAgree,
      })}>
       
        <div className="inner_box">
          <div className="languageChange__button_list">  
            <Button 
              className={cx('languageChange__button',{'on': setLanguageName === 'English',})}                
              onClick={()=>{this.setlLanguageNameChange('English')}}
              title='ENGLISH'
            />
            <Button 
              className={cx('languageChange__button',{'on': setLanguageName === 'Korean',})}
              onClick={()=>{this.setlLanguageNameChange('Korean')}}
              title='KOREAN'
            />
          </div>
          <div className={cx('Disclaimers_box', { show: true })}>
          	{this.textLanguageObject.map(data => (
          		<span key={data.title}>
          			<p className="Disclaimers_title">{ReactHtmlParser(data.title)}</p>
          			<ul className="Disclaimers_list">
          				{data.body.map((description, key) => (
          					<li key={key}>{ReactHtmlParser(description)}</li>
          				))}
          			</ul>
          		</span>
          	))}
          </div>
          <div className="Disclaimers_footer">
            <div className="Disclaimers_agree">
              <div 
                className={cx("Disclaimers__checkbox", {
                  "Disclaimers__checkbox--checked": isReminderChecked,
                  }
                )}
                onClick={this.toggleChecking} 
              />
              <div className="Disclaimers__description" onClick={this.toggleChecking} >{languagObj[setLanguageName]['chgeckText']}</div>
            </div>
            <Button
                title={languagObj[setLanguageName]['button']}
                className="Disclaimers_agree__button"
                onClick={this.closePopup}
                disabled={!isAgree}
              />
          </div>
        </div>  
     </div>
    )
  }
}

export default Disclaimers
