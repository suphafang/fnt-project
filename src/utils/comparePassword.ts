import bcryptjs from 'bcryptjs'

const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcryptjs.compare(password, hash)
}

export default comparePassword