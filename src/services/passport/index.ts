import passport from 'passport'
import { BasicStrategy } from 'passport-http'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

import { Request, Response, NextFunction } from 'express'

import config from '../../config'
import User, { roles as userRoles } from '../../api/user/user.model';

import { unautorized } from '../../services/response'

interface IVerifyOptions {
  message?: string | undefined;
  scope: string | Array<string>;
}


export const password = () => (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate('password', { session: false }, (err, user, _info) => {
    if (err && err.param) {
      return res.status(400).json(err)
    } else if (err || !user) {
      return res.status(401).send({ messages: 'Credential errors' }).end()
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) return unautorized(res)
      next()
    })
  })(req, res, next)

export const master = () => passport.authenticate('master', { session: false })

passport.use('master', new BearerStrategy((token: string, done: (error: any, user?: any, options?: IVerifyOptions | string) => void) => {
  if (token === config.masterKey) {
    done(null, {})
  } else {
    done(null, false)
  }
}))

export const token = ({ required, roles = userRoles }: any = {}) => (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate('token', { session: false }, (err, user, _info) => {
    if (err || (required && !user) || (required && !~roles.indexOf(user.role))) {
      return unautorized(res)
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) return unautorized(res)
      next()
    })
  })(req, res, next)


passport.use('password', new BasicStrategy((username: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions | string) => void) => {
  User.findOne({ $or: [{ email: username }, { name: username }] })
    .then((user) => {
      if (!user) {
        done(true)
        return null
      }

      const authenticatePromise = new Promise((resolve, reject) => {
        const auxUser = user.authenticate(password)
        if (auxUser) {
          resolve(auxUser)
        }
        else {
          reject(auxUser)
        }
      });

      return authenticatePromise.then((user: boolean | any) => {
        console.log({ user });
        done(null, user)
        return null
      }).catch(done)
    })
}))

passport.use('token', new JwtStrategy({
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromUrlQueryParameter('access_token'),
    ExtractJwt.fromBodyField('access_token'),
    ExtractJwt.fromAuthHeaderWithScheme('Bearer')
  ])
}, ({ id }: any, done: (error: any, user?: any, options?: IVerifyOptions | string) => void) => {
  User.findById(id).then((user) => {
    done(null, user)
    return null
  }).catch(done)
}))
