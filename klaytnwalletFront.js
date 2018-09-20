switch (process.env.ENV) {
  case 'LOCAL':
    console.log('starting local...')
    require('./klaytnwalletFront.local.js')
    break
  case 'DEV':
    console.log('starting dev...')
    require('./klaytnwalletFront.dev.js')
    break
  case 'QA':
    console.log('starting qa...')
    require('./klaytnwalletFront.qa.js')
    break
  case 'REAL':
    console.log('starting real...')
    require('./klaytnwalletFront.real.js')
    break
}
