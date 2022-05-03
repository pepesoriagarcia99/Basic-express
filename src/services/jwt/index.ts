import jwt from 'jsonwebtoken'
import Promise from 'bluebird'

import config from '../../config'


const jwtSign = Promise.promisify(jwt.sign)
const jwtVerify = Promise.promisify(jwt.verify)

// @ts-ignore
export const sign = (id: string, options?: jwt.SignOptions | undefined, method = jwtSign) => method({ id }, config.jwtSecret, options)

// @ts-ignore
export const verify = (token: string) => jwtVerify(token, config.jwtSecret)

