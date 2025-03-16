import { createRawMilkBody, createRawMilkResponse, getByIDResponse, receiveRawMilkBody } from "../validators/rawMilk";
import rawMilkModel from "../models/rawMilk";
import { RAW_MILK_STATUS } from "../constants/rawMilkStatus";
import userModel from "../models/user";

const create = async (userID: string, data: typeof createRawMilkBody.static): Promise<typeof createRawMilkResponse.static> => {
  const rawMilk = await rawMilkModel.create({
    milkTankInfo: data.milkTankInfo,
    shippingAddress: data.shippingAddress,
    user: userID
  })

  return JSON.parse(JSON.stringify(rawMilk))
}

const getByID = async (id: string): Promise<typeof getByIDResponse.static> => {
  const rawMilk = await rawMilkModel.findById(id)

  if (!rawMilk) {
    throw new Error('Raw milk not found')
  }

  return JSON.parse(JSON.stringify(rawMilk))
}

const getByUserID = async (userID: string): Promise<typeof getByIDResponse.static[]> => {
  const rawMilk = await rawMilkModel.find({ user: userID })

  return JSON.parse(JSON.stringify(rawMilk))
}

const toReceive = async (userID: string): Promise<typeof getByIDResponse.static[]> => {
  const user = await userModel.findById(userID)

  if (!user) {
    throw new Error('User not found')
  }

  const rawMilk = await rawMilkModel.find({ status: RAW_MILK_STATUS.PENDING, 'shippingAddress.email': user.email })

  return JSON.parse(JSON.stringify(rawMilk))
}

const receive = async (id: string, data: typeof receiveRawMilkBody.static): Promise<typeof getByIDResponse.static> => {
  const rawMilk = await rawMilkModel.findById(id)

  if (!rawMilk) {
    throw new Error('Raw milk not found')
  }

  if (rawMilk.status !== RAW_MILK_STATUS.PENDING) {
    throw new Error('Raw milk is not pending')
  }

  await rawMilk.updateOne({
    $set: {
      status: RAW_MILK_STATUS.RECEIVED,
      recipientInformation: data.recipientInformation,
      qualify: data.qualify
    }
  }, {
    new: true,
  })

  return JSON.parse(JSON.stringify(rawMilk))
}

export default {
  create,
  getByID,
  getByUserID,
  toReceive,
  receive,
}
