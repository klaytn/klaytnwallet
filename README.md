# DApp Boilerplate

## GX DApp Boilerplate 설명
목차 
1) Install
2) lint
3) atom package
4) npm package
5) React style convention
6) Directory Structure
7) 사용 - 프론트엔드 실행 (npm run dev 사용)
8) 사용 - UI 컴포넌트
9) 사용 - web3 컨트랙트 인스턴스 사용하기
10) 사용 - 컴파일 및 디플로이 (truffle 사용)
11) etc - sendTransaction

### 1)Install
```
git clone https://github.com/ground-x/dapp-boilerplate.git

cd dapp-boilerplate

npm install
```
### 2) lint (.estlintrc)
>1.lint는 기본적으로 세 개의 lint rule을 “extends” 해서 사용한다.
i) eslint:recommended 
ii) plugin:react/recommended
iii) airbnb
```
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "airbnb"
  ],
```
>2. custom rule을 별도로 정의한다. (“rules”)
```
  "rules": {
    "arrow-parens": ["error", "always"],
    "comma-dangle": ["error", "always-multiline"],
    "global-require": 0,
    "func-names": 0,
    "function-paren-newline": 0,
    "semi": 0,
    "prefer-arrow-callback": 0,
    "eqeqeq": 0,
    "wrap-iife": 0,
    "no-unused-expressions": 0,
    "no-console": 0,
    "no-bitwise": 0,
    "no-plusplus": 0,
    "no-multi-assign": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/alt-text": 0,
    "import/no-unresolved": false,
    "import/prefer-default-export": false,
    "import/extensions": false,
    "import/no-extraneous-dependencies": 0,
    "react/jsx-filename-extension": false,
  }
 ```

### 3) 필수 atom package
>기본적으로 lint를 동작하게 할 아톰 패키지를 설치한다.
```
linter (기본 linter)
linter-eslint (자바스크립트 관련)
linter-solium (솔리디티 관련)
linter-flow (자바스크립트 타입관련)
```

### 4) npm package

i)dependencies

- 리액트 관련 
``` 
react, react-router, redux, redux-thunk, react-redux 
```
- transaction 관련 
``` 
ethereumjs-tx, ethereumjs-util, ethereumjs-wallet, web3 
```
- 기타 
``` 
classnames(동적으로 HTML 클래스 정의), lodash(함수형) 
```

ii)devDependencies
- babel 관련
```
babel-core, babel-eslint, babel-loader, babel-polyfill,
babel-preset-es2015, babel-preset-stage-0
```

- lint 관련
```
eslint, eslint-config-airbnb, eslint-plugin-import,
eslint-plugin-jsx-a11y, eslint-plugin-react
```
 
### 5) React style convention
>https://github.com/ground-x/dapp-boilerplate/blob/master/styleguide.md 참조.

### 6) Directory Structure
```
.babelrc - babel 룰
.eslintrc - eslint 룰
deployedAddress - truffle migrate 후 생성되는 새 컨트랙트 주소가 자동저장되는 파일.
truffle.js - truffle config 파일
server.dev.js - npm run dev 시 실행되는 서버 코드
webpack.config.js - webpack dev 서버 config
webpack.prod.config.js - webpack prod config

contracts // Solidity 컨트랙트
dist // npm run build를 통해 빌드된 파일
images // static image들이 있는 폴더. 프론트엔드 코드에서 <img src="/static/images/xxx.png" /> 로 접근 가능
migrations // truffle migrate 시 실행되는 파일
public // index.html, favicon, manifest.json이 존재하는 폴더
src - actions // Redux action들이 정의되어 있는 폴더
src - components // React 컴포넌트들이 정의되어 있는 폴더 (컴포넌트에 해당하는 .scss 파일과 같이 저장)
src - ethereum // ethereum 관련 코드 (web3 provider config, privateKeyGenerator가 포함되어 있다.)
src - reducers // Redux reducer들이 정의되어 있는 폴더
src - styles // 글로벌한 stylesheet 코드 파일. _mixins.scss
src - utils // utility 성 파일들 집합. (contract.js, misc.js, transaction.js, ui.js 더 추가 될 수 있음..)
src (root) // index.js, App.js, store.js(Redux store), reducer.js(Redux reducer) 파일 존재
```

### 7) 사용 - 프론트엔드 실행
``` 
(npm install 후)
npm run dev
자동으로 browser 열림.
```

### 8) 사용 - UI 컴포넌트
>utils/ui.js 에 정의되어 있는 함수 사용. 
>actions/ui.js , reducers/ui.js, utils/ui.js 에 각각 액션, 리듀서 정의해주면 임의로 더 추가해서 사용할 수 있음. 
```
예)
ui.openPopup({ content: (<div></div> })
ui.closePopup()
ui.showToast({ msg: 'hello' })
ui.startLoading()
ui.finishLoading()
```

### 9) 사용 - web3 contract instance 사용하기
>contractInfo에 abi파일과, address, 컨트랙트 이름을 정의해주고,
>utils/contract.js 에 정의되어 있는 `getContract` 함수를 사용한다.

```
getContract('KittyCore', 'rpc') // rpc provider로 instance 사용 시
getContract('KittyCore', 'ws') // ws provider로 instance 사용 시, (가급적 call, sendTransaction은 ws provider를 이용한다.)
```

### 10) 사용 - 컴파일 및 디플로이 (truffle 사용)
>컴파일
```
truffle compile // 솔리디티 컨트랙트 코드 컴파일
```


>디플로이

>>truffle.js에 네트워크 정의

>>FROM에 디플로이를 하는 지갑 address를 기입한다. 단, 여기서 지갑은 unlock 되어 있어야 함.

```
const Web3 = require('web3')

/**
 * truffle network variables
 */
const HOST = '172.31.21.128'
const PORT = '22000'
const NETWORK_ID = '2017'
const GASLIMIT = 20000000
const GASPRICE = 0

const web3 = new Web3(new Web3.providers.HttpProvider(`${HOST}:${PORT}`))

// Unlock account before deploying contract. (personal.unlockAccount(...))
const FROM = web3.eth.accounts[0] || '0xdeb60a42cf3f161ef4a5697c8a97bc55a2d0a815'

/**
 * network description
 * @param {string} from - wallet address for deploying
 */
module.exports = {
  networks: {
    groundx: {
      host: HOST || '172.31.21.128',
      port: PORT || 22000,
      from: FROM,
      network_id: NETWORK_ID || '2017',
      gas: GASLIMIT || 20000000,
      gasPrice: GASPRICE || 0,
    },
  },
}
```


>truffle migrate (디플로이)

```
truffle migrate --reset --network groundx // truffle.js에 정의된 groundx 네트워크에 디플로이
```

>>truffle migrate를 하게 되면 기본적으로 /migrations 폴더에 있는 파일들을 순차적으로 실행하게 된다.

>>디플로이 될 때 마다 변경되는 컨트랙트 주소를 수동으로 기입하는게 불편하면,

>>migrations/1_initial_migration.js 에 이런 코드를 넣을 수 있다.

```
const Migrations = artifacts.require('./Migrations.sol')
const KittyCore = artifacts.require('./kittyCore.sol')
const fs = require('fs')

module.exports = function (deployer) {
  deployer.deploy(Migrations)
  deployer.deploy(KittyCore).then(function () {
    // Record recently deployed contract address to 'deployedAddress' file.
    fs.writeFile('deployedAddress', KittyCore.address, function (err) { // deployedAddress 파일에 디플로이 된 주소 저장.
      if (err) throw err
      console.log(`The address ${KittyCore.address} is recorded on deployedAddress file`)
    })
  })
};
```

>>위에서 저장한 주소는 webpack.config.js 에서 webpack Define plugin을 이용해서 다음과 같이 정의되어 있다.

```
    new webpack.DefinePlugin({
      DEV: true,
      DEPLOYED_ADDRESS: JSON.stringify(fs.readFileSync('deployedAddress', 'utf8')),
    }),
```

>>이렇게 정의된 DEPLOYED_ADDRESS를 어떤 코드에서든 가져다 쓸 수 있다.

### etc) utils/transaction.js `sendTransaction` 함수 설명

```
export const sendTransaction = (method, callback) => {
  const myAddress = store.getState().wallet.address
  const { privateKey } = store.getState().wallet

  web3socket.eth.getTransactionCount(myAddress).then((result) => {
    const txParams = {
      nonce: `0x${(result).toString(16)}`,
      gasPrice: '0x0',
      gasLimit: '0x61a80', // TODO: dynamic gas limit
      to: pointedContractAddress,
      value: `0x${parseInt(0).toString(16)}`,
      data: method.encodeABI(),
    }

    const tx = new Tx(txParams)
    tx.sign(Buffer.from(privateKey, 'hex'))
    web3socket.eth.sendSignedTransaction(`0x${tx.serialize().toString('hex')}`, callback)
      .on('receipt', () => console.log)
      .on('error', (error) => {
        console.log(error)
      })
  })
    .catch((err) => {
      console.log('error', err)
    })
}
```
>기본적으로 로그인 팝업에서 아이디와 패스워드를 입력하면, 그 정보를 이용해 privatekey를 만들고, 
localStorage에 아이디와 패스워드를 key값으로 해서 private key를 value로 저장한다.
따라서 다시 해당 아이디로 로그인 했을 때, 동일한 private key, 동일한 지갑 address를 사용할 수 있다.

>`sendTransaction` 함수는 이렇게 localStorage에 내장된 privatekey를 이용해 transaction을 보내는 방법으로,
이러한 방법을 사용하면 metamask를 굳이 설치하지 않고도 transaction을 보낼 수 있게 된다.

sendTransaction 사용 예.
```
/**
 * @usage sendTransaction
 * sendTransaction(
      this.kittyCoreContractWebsocket.methods.giveBirth(id), // param1 'method' (web3 1.0 method)
      (err, data) => { // param2 callback
        if (err) {
          console.log(err)
          return
        }

        ui.openPopup({
          content: (
            <BirthSuccess address={this.props.address} />
          )
        })
        console.log(data)
      }
    )
 */
 ```
