import { Request, Response, NextFunction } from 'express'
import { sign } from '../../services/jwt'
import { success } from '../../services/response'

import { redisClient } from '../../services/redis'

export const login = ({ user }: Request, res: Response, next: NextFunction) => {
  if (user) {
    sign(user)
      .then((token: any) => {
        redisClient.set(user.id, token)
        return {
          token,
          user: user.view(),
        }
      })
      .then(success(res, 200))
      .catch(next)
  }
}

export const logout = ({ user, query }: Request, res: Response) => {

  if (user && query.access_token) {
    redisClient.del(user.id)
    return res.status(204).end()
  }
  else {
    return res.status(400).end()
  }
}