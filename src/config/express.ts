import * as dotenv from 'dotenv'
dotenv.config()

const config = {
  port: process.env.APP_PORT || 3000,
  env: process.env.APP_ENV || 'PROD',
  isProduction: (process.env.APP_ENV || 'PROD') === 'PROD',
}

export default config
