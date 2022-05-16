import { Request, Response, NextFunction } from 'express'

import { success, notFound, unautorized } from '../../services/response'
import { handleValidationError } from '../../services/mongosee/validations'

import User from './user.model'

export const signup = ({ body }: Request, res: Response, next: NextFunction) => {
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

// querymen: { select, cursor }, query, bodymen: { body }
export const getUsers = (_req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users) => ({
      count: users.length,
      rows: users.map((user) => user.view())
    })
    )
    .then(success(res))
    .catch(next)
}

export const getOneUser = ({ params }: Request, res: Response, next: NextFunction) => {
  User.findById(params.id)
    .then(notFound(res))
    .then((user) => user ? user.view() : null)
    .then(success(res))
    .catch(next)
}

export const userProfile = ({ user }: Request, res: Response) => {
  if (user) {
    return res.status(200).json(user.view()).end()
  }
  return res.status(404).end()
}

export const deleteUser = ({ params }: Request, res: Response, next: NextFunction) => {
  User.findById(params.id)
    .then(notFound(res))
    .then((user) => user ? user.remove() : null)
    .then(success(res, 204))
    .catch(next)
}

export const editUser = ({ body, user }: Request, res: Response, next: NextFunction) => {
  User.findById(body.id)
    .then(notFound(res))
    .then((auxUser) => {
      if (user && auxUser.id != user.id) return unautorized(res)

      Object.assign(auxUser, body).save()
      return auxUser.id || null
    })
    .then(success(res))
    .catch(next)
}
