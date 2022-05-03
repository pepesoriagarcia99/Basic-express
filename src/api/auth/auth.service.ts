import { Request, Response, NextFunction } from 'express'

import { sign } from '../../services/jwt'
import { success } from '../../services/response'


export const login = ({ user }: Request, res: Response, next: NextFunction) => {
  if (user) {
    sign(user.id)
      .then((token) => ({
        token,
        user: user.view(),
      }))
      .then(success(res, 200))
      .catch(next)
  }
}

export const logout = (req: Request, res: Response) => {
  req.logout()
  return res.status(200).end()
}
