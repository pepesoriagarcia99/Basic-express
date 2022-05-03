import { Request, Response, NextFunction } from 'express'

import { sign } from '../../services/jwt'
import { success } from '../../services/response'


export const login = ({ user }: Request, res: Response, next: NextFunction) => {
  if (user) {
    sign(user)
      .then((token) => ({
        token,
        user: user.view(),
      }))
      .then(success(res, 200))
      .catch(next)
  }
}