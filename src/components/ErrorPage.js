import React, { Component } from 'react'
import { Router,browserHistory, Link } from 'react-router'
import cx from 'classnames'
import Button from 'components/Button'
import './ErrorPage.scss'

type Props = {

}

class ErrorPage extends Component<Props> {
  constructor() {
    super()
    
  }
  backPreviousPage = () => {
    browserHistory.go(-2)
  }
  
  render() {
    return (
      <div className="errorPage">
        <div className="errorPage__box">
          <div className="errorPage__title">
            404ERROR<br />
            PAGE NOT FOUND
          </div>
          <div className="errorPage__text">The Page you are looking for has been removed<br />or does not exist.</div>
          <Button  className="errorPage__button" gray={true} onClick={this.backPreviousPage}>Back to Previous Page</Button>
        </div>
      </div>
    )
  }
}

export default ErrorPage
