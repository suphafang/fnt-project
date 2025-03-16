import { ROLE } from "../constants/role"
import userModel from "../models/user"
import { setupRoleResponse } from "../validators/user"

const setupRole = async (userID: string, role: keyof typeof ROLE): Promise<typeof setupRoleResponse.static> => {
  const user = await userModel.findById(userID)

  if (!user) {
    throw new Error('User not found')
  }

  if (user.role) {
    throw new Error('User already has a role')
  }

  user.role = role
  await user.save()

  return {
    message: 'Role setup successfully',
    role: role
  }
}

export default {
  setupRole
}
