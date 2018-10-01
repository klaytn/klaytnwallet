
module.exports = {
  apps: [{
    name: 'klaytnwallet-frontend',
    script: './klaytnwalletFront.js',
    args: 'webpack.config.js',

    env: {
      NODE_ENV: 'dev',
    },

    output: '/var/log/nodejs/ground-x/app/klaytnwallet-frontend/out.log',
    error: '/var/log/nodejs/ground-x/app/klaytnwallet-frontend/error.log',
  }],
};
