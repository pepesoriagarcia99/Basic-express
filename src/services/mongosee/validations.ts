import { Response } from 'express'
import { conflict } from '../../services/response'

export const handleValidationError = (res: Response, err: any) => {
  if (err.code === 11000) {
    handleDuplicateKeyError(res, err.keyValue)
  }
}

const handleDuplicateKeyError = (res: Response, keyValue: string) => {
  const fields = Object.keys(keyValue);
  conflict(res, {messages: `Duplicate ${fields.toString()}.`, fields: fields})
}
