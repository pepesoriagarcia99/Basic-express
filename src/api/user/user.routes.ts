import express from 'express'
// @ts-ignore
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'

import { getUsers, signup, userProfile, deleteUser, editUser, getOneUser } from './user.service'
import User from './user.model'

// @ts-ignore
const { email, password, name, orgUnit, role, picture } = User.schema.tree
const router = express.Router()

router.post('/signup',
  master(),
  body({ email, password, name, orgUnit, role, picture }),
  signup)

router.put('/',
  token({ required: true }),
  editUser)

router.get('/',
  token({ required: true, roles: ['admin'] }),
  getUsers)

router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  deleteUser)

router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  getOneUser)

router.get('/profile',
  token({ required: true }),
  userProfile)


export default router
