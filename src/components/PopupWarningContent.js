/* eslint-disable */

import React from 'react'

import './PopupWarningContent.scss'


const PopupWarningContent = () => (
    <div className="PopupWarningContent"> 
        <div className="PopupWarningContent__title PopupWarningContent__title--english">
            Fraud Alert:<br /> 
            Fake Klaytn tokens on crowdsale   
        </div>
        <div className="PopupWarningContent__title PopupWarningContent__title--korean">
            사기 주의 안내: 클레이튼 사칭 코인 판매 피해 주의
        </div>    
        <img 
            className="PopupWarningContent__image" src="/static/images/icon-warning.svg" 
            alt="warning" 
        />
        <div  className="PopupWarningContent__description PopupWarningContent__description--english">
            We have recently noticed that there is an ongoing crowdsale for fake Klaytn tokens via fraudulent websites.<br />
            We clearly notify that Klaytn is not doing ANY sort of token sales for public.<br />
            All official news or updates will be announced ONLY via Kakao’s official webpage (<a href="https://www.kakaocorp.com">www.kakaocorp.com</a>) and Klaytn’s official webpage (<a href="https://www.klaytn.com">www.klaytn.com</a>). Any information about us distributed on other channels is highly fraudulent, so please beware. 
        </div>
        <div className="PopupWarningContent__description PopupWarningContent__description--korean">
            안녕하세요. Klaytn에서 안내 드립니다.<br />
            최근 Klaytn 코인을 사칭하여 코인 투자자를 모집하는 사기 행위가 발견되었습니다.<br />
            Klaytn은 일반 대중을 대상으로 토큰 세일을 진행하지 않고 있음을 다시 한번 밝혀 드립니다.<br />
            Klaytn에 관련한 정보는 Klaytn 공식 홈페이지(<a href="https://www.klaytn.com">www.klaytn.com</ a>) 또는 Kakao 공식 홈페이지(<a href="https://www.kakaocorp.com">www.kakaocorp.com</ a>) 사이트를 통해서만 발표될 예정입니다.<br />
            이점 참고하시어 피해가 발생하지 않도록 각별히 주의를 부탁드립니다.
        </div> 
    </div>
)

export default PopupWarningContent