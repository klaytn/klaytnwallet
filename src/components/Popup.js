import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import ui from 'utils/ui'

import './Popup.scss'

const Popup = ({
  popup
}) => popup && (
  <div className="Popup">
    <div
      className="Popup__background"
      onClick={() => ui.closePopup()}
    />
    <div className={classNames('Popup__content', {
      'Popup__content--tx': popup.tx,
      'Popup__content--login': popup.login,
    })}
    >
      <div
        className="Popup__closeButton"
        onClick={() => ui.closePopup()}
      />
      {popup.content}
    </div>
  </div>
)


const mapStateToProps = (state) => ({
  popup: state.ui.popup,
})

export default connect(mapStateToProps, null)(Popup)
