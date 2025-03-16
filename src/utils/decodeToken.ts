import jwt from 'jsonwebtoken'
import env from '../config'

type TokenPayload = {
  email: string
  sub: string
  [key: string]: any
}

const decodeToken = (token: string): TokenPayload => {
  const decodedToken = jwt.verify(token, env.APP_SECRET_KEY) as TokenPayload
  return decodedToken
}

export default decodeToken