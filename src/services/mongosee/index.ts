import mongoose from 'mongoose'
import Promise from 'bluebird'
import config from '../../config'


Object.keys(config.mongo.options).forEach((key: any) => {
  mongoose.set(key, config.mongo.options[key])
})

mongoose.Promise = Promise
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error: ' + err)
  process.exit(-1)
})

export default mongoose
