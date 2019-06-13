
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
      NODE_ENV: 'production',
    },

    output: '/var/log/nodejs/ground-x/app/klaytnwallet-baobab-frontend/out.log',
    error: '/var/log/nodejs/ground-x/app/klaytnwallet-baobab-frontend/error.log',
  }],
};
