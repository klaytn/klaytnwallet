import React, { Component } from 'react'
import jsonFormat from 'json-format'

import Button from 'components/Button'
import Input from 'components/Input'
import { onit } from 'klaytn/onit'
import ui from 'utils/ui'
import { download, copy, isMobile } from 'utils/misc'

import './SaveKeyStore.scss'

type Props = {
  privateKey: string,
}

class SaveKeystore extends Component<Props> {
  state = {
    isDownloaded: isMobile,
  }

  handleDownload = () => {
    const { privateKey, password } = this.props
    const keystore = onit.klay.accounts.encrypt(privateKey, password)
    this.setState({ isDownloaded: true }, () => this.downloadKeystore(keystore))
  }

  downloadKeystore = (keystore) => {
    const date = new Date()
    const fileName = `keystore-${keystore.address}-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.json`
    download(jsonFormat(keystore), fileName)
    ui.showToast({ msg: '키스토어 파일이 저장되었습니다!' })
  }

  handleCopy = () => {
    copy(document.querySelector('#input-privateKey'))
    ui.showToast({ msg: '개인 키가 복사되었습니다!' })
  }

  render() {
    const { isDownloaded } = this.state
    const { privateKey } = this.props

    return (
      <div className="SaveKeyStore">
        <p className="SaveKeyStore__title">
          {isDownloaded
            ? '개인 키를 저장하세요. (클릭 시 복사됩니다.)'
            : '키스토어 파일을 저장하세요.'
          }
        </p>
        <Description isDownloaded={isDownloaded} />
        {!isDownloaded && (
          <Button
            onClick={this.handleDownload}
            className="SaveKeyStore__button"
            title="다운로드 키스토어 파일(UTC / JSON)"
          />
        )}
        {isDownloaded && (
          <Input
            name="privateKey"
            ref={($privateKey) => this.$privateKey = $privateKey}
            readOnly
            className="SaveKeyStore__privateKey"
            onClick={this.handleCopy}
            value={privateKey}
            autoFocus
          />
        )}
      </div>
    )
  }
}

const Description = ({ isDownloaded }) => {
  return isDownloaded
    ? (
      <p className="SaveKeyStore__description">
        - 지갑에 접근하는 방법은 두 가지 입니다. <br />
        <span className="WalletCreation__description--highlight">- 1) 개인 키를 이용한 접근</span> - 개인 키는 이 방법을 통해 접근하기 위해 필요하며 반드시 유출되어선 안됩니다. <br />
        - 2) 키스토어와 비밀번호를 통한 접근<br />
        {isMobile && <p>*모바일 환경에서 키스토어를 통한 접근은 불가능합니다.</p>}
      </p>
    )
    : (
      <p className="SaveKeyStore__description">
        - 지갑에 접근하는 방법은 두 가지 입니다. <br />
        - 1) 개인 키를 이용한 접근 <br />
        <span className="WalletCreation__description--highlight">- 2) 키스토어와 비밀번호를 통한 접근</span> - 키스토어는 이 방법을 통해 접근하기 위해 필요합니다. <br />
      </p>
    )
}

export default SaveKeystore
