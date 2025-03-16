import { createProductLotBody, productLotObject } from "../validators/productLot";
import productLotModel from "../models/productLot";
import rawMilkModel from "../models/rawMilk";

const create = async (userID: string, data: typeof createProductLotBody.static): Promise<typeof productLotObject.static> => {
  const productLot = await productLotModel.create({
    user: userID,
    milkTanks: data.milkTanks,
    generalInformation: data.generalInformation,
    qualify: data.qualify,
    nutrition: data.nutrition,
    shippingAddress: data.shippingAddress
  })

  await rawMilkModel.updateMany(
    { _id: { $in: data.milkTanks }, },
    { $set: { used: true, } }
  )

  return JSON.parse(JSON.stringify(productLot))
}

const getByID = async (id: string): Promise<typeof productLotObject.static> => {
  const productLot = await productLotModel.findById(id)

  if (!productLot) {
    throw new Error('Product lot not found')
  }

  return JSON.parse(JSON.stringify(productLot))
}

export default {
  create,
  getByID,
}
