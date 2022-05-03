import express from 'express'
import { master, password } from '../../services/passport'

import { login } from './auth.service'

const router = express.Router()

router.post('/',
  master(),
  password(),
  login)

export default router
