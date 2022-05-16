import jwt from 'jsonwebtoken'
import Promise from 'bluebird'
import { get } from '../../services/redis'

import config from '../../config'

const jwtSign = Promise.promisify(jwt.sign)
// const jwtVerify = Promise.promisify(jwt.verify)

export const sign = ({ id, name, role }: any) => {
  // @ts-ignore
  return jwtSign({ id, name, role }, config.jwtSecret, config.sign)
}

export const verify = async (token: string) => {
  let decoded: any = null
  let session = null

  const decodedPromise = new Promise((resolve, reject) => {
    const decoded: any = jwt.verify(token, config.jwtSecret)

    if (decoded) resolve(decoded)
    else reject
  })

  await decodedPromise
    .then(data => decoded = data)
    .catch(console.error)

  if (decoded) session = await get(decoded.id)


  return (session && session === token)
}
