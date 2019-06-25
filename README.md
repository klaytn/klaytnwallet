# Klaytn Wallet Project

## GroundX Klaytn Wallet Project explanation
table of contents 
1) Getting started
2) npm package information
3) Directory Structure
4) Web browser support scope
5) Describe how to use the front api
6) License

### 1) Getting started
1. Open terminal
2. Clone the repo by running `git clone https://github.com/ground-x/klaytnwallet.git`
3. Run `npm install`to install node packages
4. Run `npm run start:local`
5. App should be running in https://localhost:15000

### 2) npm package information
> dependencies
```
The wallet project is optimized for crypto-js version "0.8.3-1".
Caver-js needs confirmation before updating.
```

### 3) Directory Structure
> Folder structure
```
pm2.config.js           // npm run dev (execution server code )
webpack.config.js       //webpack dev server config
webpack.prod.config.js  // webpack prod config
contracts               // Solidity contract
dist                    // file built with 'npm run build'
static                  // folder with static images and font.
migrations              // file to be executed when truffle migrate
public                  // index.html, favicon, manifest.json existence in folder

1. src
src - actions           // Folder where Redux action are defined 
src - components        // Folder where React components are defined(Save as .scss file for components)
src - constants         // Define the .env file
src - enhancers         // Folder where key event are defined
src - klaytn            // klaytn related definition folder
src - reducers          // polder where Redux reducer are defined 
src - styles            // stylesheet code file. _mixins.scss
src - utils             // utility file. (contract.js, misc.js, transaction.js, ui.js )
src (root)              // index.js, App.js, store.js(Redux store), reducer.js(Redux reducer) file existence

``` 

### 4) Web browser support scope
> Supported browsers.

Chrome | Safari | Firefox | IE Edge*
---------------------- | ---------------------- | ---------------------- | ----------------------
Supported (Optimized) | Supported | Supported | Not supported


### 5) Describe how to use the front api
> Actual service wallet site
``` 
1. Baobab testnet 
  - https://baobab.wallet.klaytn.com
  - Use your wallet with a test klay. The Faucet menu is available.

2. Main Network
  - https://wallet.klaytn.com
  - This site uses real klay. Take care when using your wallet. The Faucet menu is not available.

* Check out the site link below
```
* Baobab testnet url : https://baobab.wallet.klaytn.com
* Main Network url : https://wallet.klaytn.com

> Api Type
``` 
1. api using caver ( Everything except KLAY Faucet )
  - Because it uses caver, it can be used outside.

2. EN Backend api ( KLAY Faucet )
  - Since it is the backend area of ​​groundx, it can not be used from the outside.
```
> How to use the wallet API 
``` 
The api with caver is a public API. You can also use the api from the outside.
You can use caver function by using api.
For more information on how to use caver, please visit 'https://docs.klaytn.com/'
You can see how wallet works and how to use caver in the following sites.
```
* klaytn docs url : https://docs.klaytn.com/
* klaytn docs wallet description url : https://docs.klaytn.com/toolkit/wallet 
* klaytn docs caver-js url : https://docs.klaytn.com/caverjs 

### License
Wallet service is released under the [MIT license](https://github.com/ground-x/klaytnwallet/blob/dev/LICENSE).

``` 
The MIT License

Copyright (c) 2018 ~ present GROUND X

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

