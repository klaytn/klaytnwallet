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
