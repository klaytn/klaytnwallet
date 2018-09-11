import React from 'react'

import './Landing.scss'

type Props = {

}

const LandingItem = ({ img, title, description }) => (
  <div className="Landing__item">
    <img className="Landing__image" src={img} />
    <header className="Landing__itemTitle">
      We do not store the private key on the server.
    </header>
    <header className="Landing__itemDescription">
      Private key is stored only in the browser’s storage and is automatically deleted when you close the browser.
    </header>
  </div>
)

const Landing = () => (
  <div className="Landing">
    <label className="Landing__label">Moso net</label>
    <header className="Landing__title">Welcome to Klaytn Wallet</header>
    <LandingItem
      title="We do not store the private key on the server."
      description="Private key is stored only in the browser’s storage and is automatically deleted when you close the browser."
      img="/images/illust-not-db.svg"
    />
    <LandingItem
      title="We recommend that you download the Keystore file and save it securely."
      description="Klaytn Wallet is not responsible for the loss of the password for the private key or keystore file."
      img="/images/illust-save-key.svg"
    />
    <LandingItem
      title="We recommend that you use the Testnet-based Klaytn Wallet for testing purposes only."
      description="Klaytn Wallet has no obligation to compensate or assume liability for any financial loss arising out of its use for any other purpose."
      img="/images/illust-never-send.svg"
    />
  </div>
)

export default Landing
