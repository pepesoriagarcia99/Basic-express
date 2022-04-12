import { Request, Response, NextFunction } from 'express'
import { success } from '../../services/response'
import { handleValidationError } from '../../services/mongosee/validations'

import  { User, UserDocument } from './user.model'


export const getUsers = (_req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users: UserDocument[]) => ({
      count: users.length,
      rows: users.map((user: UserDocument) => user.view())
    })
    )
    .then(success(res))
    .catch(next)
}

export const addUser = ({ body }: Request, res: Response, next: NextFunction) => {
  User.create(body)
    .then((user) => user.view())
    .then(success(res, 201))
    .catch((err) => {
      if (err.name === 'MongoServerError') {
        handleValidationError(res, err)
      } else {
        next(err)
      }
    })
}