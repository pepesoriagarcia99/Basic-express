import { Response } from 'express'

export const success = (res: Response, status?: number) => (entity: any) => {
  if (entity) {
    res.status(status || 200).json(entity).end()
  }
  return null
}

export const notFound = (res: Response) => (entity: any) => {
  if (entity) {
    return entity
  }
  res.status(404).end()
  return null
}

export const conflict = (res: Response, entity: any) => {
  res.status(409).json(entity).end()
  return null
}
