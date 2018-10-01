
module.exports = {
  apps: [{
    name: 'klaytnwallet-frontend',
    script: './klaytnwalletFront.js',
    args: 'webpack.config.js',

    env: {
      NODE_ENV: 'local',
    },
  }],
};
