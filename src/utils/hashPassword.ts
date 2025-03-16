import bcryptjs from "bcryptjs"

const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcryptjs.genSalt(10)
  const hash = await bcryptjs.hash(password, salt)
  return hash
}

export default hashPassword
