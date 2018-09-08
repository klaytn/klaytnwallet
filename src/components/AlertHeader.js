import React from 'react'

import './AlertHeader.scss'

type Props = {

}

const AlertHeader = ({ title, content }) => (
  <div className="AlertHeader">
    <p className="AlertHeader__title">Read Me!</p>
    <p className="AlertHeader__content">
    키 처리는 전적으로 컴퓨터 브라우저 내부에서 처리됩니다.<br />
    이 사이트에서는 키와 자금을 당신이 완전히 통제하며, 블록체인과 직접 상호작용을 할 수 있도록 지원합니다.<br />
    저희는 당신의 개인 키, 비밀번호 또는 기타 계정 정보를 전송, 수신 또는 저장하지 않습니다.<br />
    </p>
  </div>
)

export default AlertHeader
