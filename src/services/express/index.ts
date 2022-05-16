import express from 'express'
import { createClient } from 'redis'

import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import passport from 'passport'

// @ts-ignore
import { errorHandler as queryErrorHandler } from 'querymen'
// @ts-ignore
import { errorHandler as bodyErrorHandler } from 'bodymen'


export default (apiRoot: string, routes: express.Router) => {
  const app = express()

  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())

  app.use(cors())
  app.use(compression())
  app.use(morgan('dev'))

  app.use(queryErrorHandler())
  app.use(bodyErrorHandler())

  const redisClient = createClient({ legacyMode: true })
  redisClient.connect().catch(console.error)

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(apiRoot, routes)

  return app
}