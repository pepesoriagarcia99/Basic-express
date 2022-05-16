import { createClient } from 'redis'

export const redisClient = createClient({ legacyMode: true })

export const redisConnect = () => {
  redisClient.connect().catch(console.error)
}

export const get = async (key: any) => {
  let value;

  const getPromise = new Promise((resolve, reject) => {

    // @ts-ignore
    redisClient.get(key, (err: any, data: any) => {
      if (err) reject(err)
      resolve(data)
    });
  })

  await getPromise.then(val => value = val)

  return value
}

