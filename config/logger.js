const { 
    createLogger, 
    transports, 
    format 
} = require('winston');

const logger = createLogger({
    transports:[
        new transports.File({
            filename: 'audit.log',
            level: 'info',
            format: format.combine(format.timestamp(),format.json())
        })
    ],
    exitOnError: true
})

module.exports = logger;