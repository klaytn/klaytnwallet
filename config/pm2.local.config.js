
module.exports = {
  apps: [{
    name: 'klaytnwallet-baobab-frontend',
    script: './klaytnwalletFront.js',
    args: 'webpack.config.js',

    env: {
      NODE_ENV: 'local',
    },
  }],
};
