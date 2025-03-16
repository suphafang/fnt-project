import { createRawMilkBody, createRawMilkResponse, getByIDResponse } from "../validators/rawMilk";
import rawMilkModel from "../models/rawMilk";

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

export default {
  create,
  getByID,
  getByUserID,
}
