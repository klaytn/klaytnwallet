const opn = require('opn')
const path = require('path')
const express = require('express')
const fs = require('fs')

const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const config = require('./webpack.prod.config.js')

require('dotenv').config({
  path: './config/real.env'
})

const port = process.env.PORT || 9000
const app = express()


// this middleware serves all js files as gzip
app.use(function (req, res, next) {
  const originalPath = req.path

  if (!originalPath.startsWith('/bundle')) {
    next()
    return
  }

  try {
    if (originalPath.endsWith('.css')) {
      res.set('Content-Type', 'text/css')
    }
    res.append('Content-Encoding', 'gzip')
    res.setHeader('Vary', 'Accept-Encoding')
    res.setHeader('Cache-Control', 'public, max-age=512000')
    req.url = `${req.url}.gz`
  } catch (e) {
    console.log(e)
  }

  next()
})

app.use(express.static(path.join(__dirname, '/dist')))

app.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
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
            dsn     : 'https://30fcc5f962e644b2b104477838997e4c@sentry.io/1292023',
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

    logger.info('==> 🌎 KLAYTN WALLET FRONT REAL Listening on port %s.', port);
});