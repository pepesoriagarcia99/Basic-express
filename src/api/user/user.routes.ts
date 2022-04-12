import express from 'express'
import * as userService from './user.service'

// @ts-ignore
import { middleware as body } from 'bodymen'
import {User} from './user.model'

// @ts-ignore
const { email, password, name, orgUnit, role, picture } = User.schema.tree
const router = express.Router()

router.get('/', userService.getUsers)


router.post('/',
  body({ email, password, name, orgUnit, role, picture }),
  userService.addUser)

export default router
