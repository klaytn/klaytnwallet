import React, { Component } from 'react'
import jsonFormat from 'json-format'

import Panel from 'components/Panel'
import { onit } from 'klaytn/onit'
import ui from 'utils/ui'
import { download, copy } from 'utils/misc'

import './SaveKeyStore.scss'

type Props = {
  privateKey: string,
}

class SaveKeystore extends Component<Props> {
  state = {
    isDownloaded: false,
  }

  handleDownload = () => {
    const { privateKey, password } = this.props

    const keystore = onit.klay.accounts.encrypt(privateKey, password)
    this.setState({ isDownloaded: true },
      () => {
        const date = new Date()
        const fileName = `keystore-${keystore.address}-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.json`
        download(jsonFormat(keystore), fileName)
        ui.showToast({ msg: '키스토어 파일이 저장되었습니다!' })
      })
  }

  handleCopy = () => {
    copy(this.$privateKey)
    ui.showToast({ msg: '개인 키가 복사되었습니다!' })
  }

  render() {
    const { isDownloaded } = this.state
    const { privateKey } = this.props

    return (
      <Panel>
        <div className="SaveKeyStore">
          <p>키스토어 파일을 저장하세요.</p>
          <button onClick={this.handleDownload}>다운로드 키스토어 파일(UTC / JSON)</button>
          {isDownloaded && (
            <input
              ref={($privateKey) => this.$privateKey = $privateKey}
              className="SaveKeyStore__privateKey"
              onClick={this.handleCopy}
              value={privateKey}
              readOnly
            />
          )}
        </div>
      </Panel>
    )
  }
}

export default SaveKeystore
