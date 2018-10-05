
module.exports = {
  apps: [{
    name: 'klaytnwallet-frontend',
    script: './klaytnwalletFront.js',
    args: 'webpack.prod.config.js',

    env: {
      NODE_ENV: 'real',
      NEWRELIC_APP_NAME   : 'KLAYTNWALLET_REAL_FRONT'
    },

    output: '/var/log/nodejs/ground-x/app/klaytnwallet-frontend/out.log',
    error: '/var/log/nodejs/ground-x/app/klaytnwallet-frontend/error.log',
  }],
};
