const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const config = require('./webpack.config.js')

require('dotenv').config({
  path: './config/dev.env'
})

const port = process.env.PORT || 9000
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
});


/** LOGGER **/
const winston = require('winston');
const dailyRotate = require('winston-daily-rotate-file');
const sentry = require('winston-sentry-raven-transport');

const replaceErrors = (key, value) => {
    if (value instanceof Buffer) {
        return value.toString('base64');
    } else if (value instanceof Error) {
        const error = {};

        Object.getOwnPropertyNames(value).forEach((key) => {
            error[key] = value[key];
        });

        return error;
    }

    return value;
};

const logger = winston.createLogger({
    level            : 'debug',
    format           : winston.format.combine(
        winston.format.label({label: 'main'}),
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.json({ replacer: replaceErrors }),
    ),

    transports       : [
        new sentry({
            dsn     : 'https://138f4c4bfadf46f9867a43a1b9632d8a@sentry.io/1292019',
            level   : 'debug',
        }),
        new winston.transports.Console({handleExceptions: true}),
        new dailyRotate({
            filename         : '/var/log/nodejs/ground-x/app/klaytnwallet/front-access.',
            datePattern      : 'YYYYMMDD',
            zippedArchive    : true,
            handleExceptions : true
        })
    ]
});


app.listen(port, '0.0.0.0', (err) => {
    if (err) {
        logger.log(err);
    }

    logger.info('==> 🌎 KLAYTN WALLET FRONT DEV Listening on port %s.', port);
});
