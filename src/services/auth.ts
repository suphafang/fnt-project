import bcryptjs from 'bcryptjs'

import { signUpBody, signUpResponse } from "../validators/auth";
import hashPassword from '../utils/hashPassword';
import userModel from '../models/user';
import generateToken from '../utils/generateToken';

const signUp = async (body: typeof signUpBody.static): Promise<typeof signUpResponse.static> => {
  const { fullName, email, phone } = body
  const password = await hashPassword(body.password)

  const userExist = await userModel.findOne({ $or: [{ email: email }, { phone: phone }] })

  if (userExist) {
    if (userExist.email === email) {
      throw new Error('Email already exist')
    }
    
    if (userExist.phone === phone) {
      throw new Error('Phone already exist')
    }
  }

  const user = await userModel.create({
    fullName: fullName,
    email: email,
    phone: phone,
    password: password
  })

  const token = generateToken(user.id, email)

  return { token }
}

export default {
  signUp
}
