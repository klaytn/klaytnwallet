/** LOGGER **/
const winston = require('winston');
const dailyRotate = require('winston-daily-rotate-file');

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
        new winston.transports.Console({handleExceptions: true}),
        new dailyRotate({
            filename         : process.env.LOGGER_PATH || './logs/api-access',
            datePattern      : 'YYYYMMDD',
            zippedArchive    : true,
            handleExceptions : true
        })
    ]
});

module.exports = logger;