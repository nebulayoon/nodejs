const winston = require("winston")
const winstonDaily = require("winston-daily-rotate-file")

const logDir = "logs"
const { combine, timestamp, printf } = winston.format

const logFormat = printf((info) => {
  return `${info.timestamps} ${info.level}: ${info.message}`
})

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */

const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: [
    new winstonDaily({ //info 레벨 로그를 저장할 파일 설정
      level: "info",
      datePattern: 'YYYY-MM-DD',
      dirname: logDir,
      filename: `%DATE%.log`,
      maxFiles: 30, //30일치 로그 파일 저장
      zippedArchive:  true
    }),
    new winstonDaily({ //error 레벨 로그를 저장할 파일 설정
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/error',
      filename: `%DATE%.error.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(), // color 제출
      winston.format.simple(),  // `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력
    )
  }));
}

module.exports = logger