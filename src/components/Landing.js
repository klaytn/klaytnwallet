import React from 'react'

import './Landing.scss'

type Props = {

}

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

const Landing = () => (
  <div className="Landing">
    <label className="Landing__label">Aspen net</label>
    <header className="Landing__title">Welcome to Klaytn Wallet</header>
    <LandingItem
      title="The Klaytn Network does not store your private key on the server."
      description="Your private key is stored only in the browser’s storage and is automatically deleted when you close the browser."
      img="/static/images/illust-not-db.svg"
    />
    <LandingItem
      title="The Klaytn Network recommends that you download the Keystore file and save it securely."
      description="The Klaytn Wallet shall NOT BE HELD RESPONSIBLE for the loss of your password for the private key or keystore file."
      img="/static/images/illust-save-key.svg"
    />
    <LandingItem
      title="The Klaytn Network recommends  that you use the Testnet-based Klaytn Wallet for testing purpose ONLY."
      description="Klaytn Wallet has no obligation to compensate or assume liability for any financial loss arising out of its use for any other purpose."
      img="/static/images/illust-never-send.svg"
    />
  </div>
)

export default Landing
