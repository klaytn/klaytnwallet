// NEWRELIC_APP_NAME이 있다면 실행한다.
if (process.env.NEWRELIC_APP_NAME) {
  require('newrelic');
}

switch (process.env.NODE_ENV) {
  case 'local':
    console.log('starting local...')
    require('./klaytnwalletFront.local.js')
    break
  case 'dev':
    console.log('starting dev...')
    require('./klaytnwalletFront.dev.js')
    break
  case 'qa':
    console.log('starting qa...')
    require('./klaytnwalletFront.qa.js')
    break
  case 'real':
    console.log('starting real...')
    require('./klaytnwalletFront.real.js')
    break
}
