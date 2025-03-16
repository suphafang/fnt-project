import { ROLE } from "../constants/role"
import S3 from "../models/s3"
import userModel from "../models/user"
import { setupRoleResponse, updateGeneralInformationBody, updateGeneralInformationResponse } from "../validators/user"

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

const setupGeneralInformation = async (userID: string, data: typeof updateGeneralInformationBody.static): Promise<typeof updateGeneralInformationResponse.static> => {
  const user = await userModel.findById(userID)

  if (!user) {
    throw new Error('User not found')
  }

  if (!user.role) {
    throw new Error('User does not have a role')
  }

  const { organicCertificateFiles, ...generalInformation } = data

  const files = await Promise.all(
    organicCertificateFiles?.map(async (file) => {
      const key = await S3.upload(file, `certificates/${file.name}-${Date.now()}`)
      return { filename: file.name, key }
    }) || []
  )

  await user.updateOne({
    $set: {
      generalInformation: {
        ...generalInformation,
        organicCertificate: files
      }
    }
  })

  return {
    message: 'General information setup successfully',
    data: {
      ...generalInformation,
      organicCertificate: files
    }
  }
}

export default {
  setupRole,
  setupGeneralInformation,
}
