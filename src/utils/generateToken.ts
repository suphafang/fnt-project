import jwt from 'jsonwebtoken'
import env from '../config'

const generateToken = (userID: string, email: string) => {
  return jwt.sign({ email: email }, env.APP_SECRET_KEY, { expiresIn: '7d', subject: userID })
}

export default generateToken
