import express from 'express'
import { master } from './services/passport'

/** API modules */
import apiRoutes from './api/api.routes'


const router = express.Router()

router.get('/ping', master(), (_req, res) => res.send('PONG!!'))
router.use('/api', apiRoutes)

export default router