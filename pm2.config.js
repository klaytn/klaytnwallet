
module.exports = {
  apps: [{
    name: 'klaytnwallet-frontend',
    script: './klaytnwalletFront.js',
    args: 'webpack.config.js',

    env: {
      NODE_ENV: 'local',
    },
    env_dev: {
      NODE_ENV: 'dev',
    },
    env_qa: {
      NODE_ENV: 'qa',
    },
    env_real: {
      NODE_ENV: 'real',
    },

    output: '/var/log/nodejs/ground-x/app/klaytnwallet-frontend/out.log',
    error: '/var/log/nodejs/ground-x/app/klaytnwallet-frontend/error.log',
  }],
};
