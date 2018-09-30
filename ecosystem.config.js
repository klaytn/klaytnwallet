// require('./config');

module.exports = {
  apps: [{
    name: 'klaytnwallet-frontend',
    script: './klaytnwalletFront.js',
    args: 'webpack.config.js',

    env: {
      ENV: 'LOCAL',
    },
    env_dev: {
      ENV: 'DEV',
    },
    env_qa: {
      ENV: 'QA',
    },
    env_real: {
      ENV: 'REAL',
    },

    output: process.env.PM2_OUTPUT_PATH,
    error: process.env.PM2_ERROR_PATH,
  }],
};
