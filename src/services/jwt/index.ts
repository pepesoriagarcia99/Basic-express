import jwt from 'jsonwebtoken'
import Promise from 'bluebird'

import config from '../../config'


const jwtSign = Promise.promisify(jwt.sign)
const jwtVerify = Promise.promisify(jwt.verify)

export const sign = ({ id, name, role }: any) => {
  // @ts-ignore
  return jwtSign({ id, name, role }, config.jwtSecret, config.sign)
}

// @ts-ignore
export const verify = (token: string) => jwtVerify(token, config.jwtSecret)

