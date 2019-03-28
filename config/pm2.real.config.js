
module.exports = {
  apps: [{
    name: 'klaytnwallet-baobab-Frontend',
    script: './klaytnwalletFront.js',
    args: 'webpack.prod.config.js',

    /**
     * 실행모대
     * - 인스턴스 갯수는 최대
     * - 로그파일은 하나로 관리
     */
    instances: 'max',
    merge_logs: true,

    env: {
      NODE_ENV: 'real',
      NEWRELIC_APP_NAME: 'KLAYTNWALLET_BAOBAB_REAL_FRONT',
      SENTRY_DSN: 'https://30fcc5f962e644b2b104477838997e4c@sentry.io/1292023',
    },

    output: '/var/log/nodejs/ground-x/app/klaytnwallet-baobab-frontend/out.log',
    error: '/var/log/nodejs/ground-x/app/klaytnwallet-baobab-frontend/error.log',
  }],
};
