
module.exports = {
  apps: [{
    name: 'klaytnwallet-mainnet-frontend',
    script: './klaytnwalletFront.js',
    args: 'webpack.prod.config.js',

    /**
     * Execution mode
     * - The number of instances is 1
     * - Manage log files as one
     */
    instances: 1,
    merge_logs: true,

    env: {
      NODE_ENV: 'qa',
    },

    output: '/var/log/nodejs/ground-x/app/klaytnwallet-baobab-frontend/out.log',
    error: '/var/log/nodejs/ground-x/app/klaytnwallet-baobab-frontend/error.log',
  }],
};
