import http from 'http'
import mongoose from './services/mongosee'
import express from './services/express'
import { redisConnect } from './services/redis'

import config from './config'
import mainRoutes from './routes'

//config.mongo.options
mongoose.connect(config.mongo.uri)
mongoose.Promise = Promise

const app = express(config.apiRoot, mainRoutes)
const server = http.createServer(app)
redisConnect()

setImmediate(() => {
  server.listen(config.port, config.ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', config.ip, config.port, config.env)
  })
})

export default app
