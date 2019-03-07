
module.exports = {
  apps: [{
    name: 'klaytnwallet-baobab-frontend',
    script: './klaytnwalletFront.js',
    args: 'webpack.config.js',

    /**
     * 실행모드
     * - 인스턴스 갯수는 1
     * - 로그파일은 하나로 관리
     */
    instances: 1,
    merge_logs: true,

    env: {
      NODE_ENV: 'dev',
    },

    output: '/var/log/nodejs/ground-x/app/klaytnwallet-baobab-frontend/out.log',
    error: '/var/log/nodejs/ground-x/app/klaytnwallet-baobab-frontend/error.log',
  }],
};
