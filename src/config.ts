import path from 'path'

function requireProcessEnv(name: string)  : string | undefined {
  if (process.env[name]) {
    return process.env[name]
  }
  return undefined
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv-safe')
  dotenv.load({
    path: path.join(__dirname, '../.env'),
    sample: path.join(__dirname, '../.env.example')
  })
}

const env = process.env.NODE_ENV || 'development';
const config: any = {
  development: {
    ip: process.env.IP || 'localhost',
    port: process.env.PORT || 9000,
    mongo: {
      uri: 'mongodb://localhost:27017/BasicExpress_dev',
      options: {
        debug: true
      }
    }
  },
  production: {
    ip: process.env.IP || '0.0.0.0',
    port: process.env.PORT || 9000,
    mongo: {
      uri: '',
      options: {
        db: {
          safe: true
        }
      }
    }
  }
}

export default {
  env,
  masterKey: requireProcessEnv('MASTER_KEY'),
  jwtSecret: requireProcessEnv('JWT_SECRET'),
  ...config[env]
}
