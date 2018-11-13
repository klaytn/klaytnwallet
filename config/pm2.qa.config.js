
module.exports = {
  apps: [{
    name: 'klaytnwallet-frontend',
    script: './klaytnwalletFront.js',
    args: 'webpack.prod.config.js',

    /**
     * 실행모드
     * - 인스턴스 갯수는 1
     * - 로그파일은 하나로 관리
     */
    instances: 1,
    merge_logs: true,

    env: {
      NODE_ENV: 'qa',
    },

    output: '/var/log/nodejs/ground-x/app/klaytnwallet-frontend/out.log',
    error: '/var/log/nodejs/ground-x/app/klaytnwallet-frontend/error.log',
  }],
};
