import express from 'express'
import { token, master, password } from '../../services/passport'

import { login, logout } from './auth.service'

const router = express.Router()

router.post('/',
  master(),
  password(),
  login)

router.post('/logout',
  token({ required: true }),
  logout)

export default router
