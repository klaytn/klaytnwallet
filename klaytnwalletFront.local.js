const opn = require('opn')
const path = require('path')
const express = require('express')
const uuid = require('uuid')


const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

require('dotenv').config({ path: './config/local.env' })
const logger = require('./src/utils/logger')
const config = require('./webpack.config.js')

const port = process.env.PORT || 9000
const instanceId = process.env.NODE_APP_INSTANCE || 0;
const instanceUuid = uuid.v4();
const app = express()


const compiler = webpack(config)
const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false,
  },
})

app.use('/', express.static(path.resolve(__dirname)))
app.use(middleware)
app.use(webpackHotMiddleware(compiler))
app.get('*', function response(req, res) {
  res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')))
  res.end()
})

app.use((err, req, res, next) => {
  logger.log(err)
})

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    logger.log(err)
  }

  const env = process.env.NODE_ENV
  logger.info(`==> 🌎 KLAYTN WALLET FRONT ${env} running --> ID : ${instanceId} / UUID : ${instanceUuid} / BIND : ${port}.`);

  opn(`http://localhost:${port}`)
    .catch(err => {
      // opn does not work in cli(linux) environment.
      console.log('can\'t open in your pc');
    });
});
