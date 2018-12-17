import React from 'react'

import './Landing.scss'

const LandingItem = ({ img, title, description }) => (
  <div className="Landing__item">
    <img className="Landing__image" src={img} />
    <header className="Landing__itemTitle">
      {title}
    </header>
    <p className="Landing__itemDescription">
      {description}
    </p>
  </div>
)

export default LandingItem
