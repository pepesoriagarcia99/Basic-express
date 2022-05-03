import express from 'express'
// @ts-ignore
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'

import { getUsers, addUser, userProfile, deleteUser, editUser } from './user.service'
import User from './user.model'

// @ts-ignore
const { email, password, name, orgUnit, role, picture } = User.schema.tree
const router = express.Router()

router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ email, password, name, orgUnit, role, picture }),
  addUser)

router.put('/',
  token({ required: true }),
  editUser)

router.get('/',
  token({ required: true, roles: ['admin'] }),
  getUsers)

router.delete('/',
  token({ required: true, roles: ['admin'] }),
  deleteUser)

router.get('/profile',
  token({ required: true }),
  userProfile)


export default router
