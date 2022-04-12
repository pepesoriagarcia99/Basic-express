import express from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'

// @ts-ignore
import { errorHandler as queryErrorHandler } from 'querymen'
// @ts-ignore
import { errorHandler as bodyErrorHandler } from 'bodymen'


import apiRoutes from './api/api.routes'
import mongoose from './services/mongosee'

import config from './config'


const app = express()
app.use(express.json())
app.use(cors())
app.use(compression())
app.use(morgan('dev'))
app.use(queryErrorHandler())
app.use(bodyErrorHandler())

mongoose.connect(config.mongo.uri)
mongoose.Promise = Promise

app.get('/ping', (_req, res) => res.send('PONG!!'))
app.use('/api', apiRoutes)

app.listen(config.port, () => console.log('Express server listening on http://%s:%d, in %s mode', config.ip, config.port, config.env))

export default app
