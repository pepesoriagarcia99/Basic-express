import express from 'express'

/** API modules */
import user from './user/user.routes'
import auth from './auth/auth.routes'

const router = express.Router()

router.use('/', auth)
router.use('/user', user)

export default router
