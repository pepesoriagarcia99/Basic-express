import express from 'express'
import { master, password } from '../../services/passport'

import { token } from '../../services/passport'
import { login, logout } from './auth.service'


const router = express.Router()

router.post('/signin',
  master(),
  password(),
  login)

router.post('/signout',
  token({ required: true }),
  logout)

export default router
