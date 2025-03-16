import { createProductLotBody, productLotObject, receivingData } from "../validators/productLot";
import productLotModel from "../models/productLot";
import rawMilkModel from "../models/rawMilk";
import { PRODUCT_LOT_STATUS } from "../constants/productLotStatus";
import userModel from "../models/user";

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

const receive = async (id: string, data: typeof receivingData.static): Promise<typeof productLotObject.static> => {
  const productLot = await productLotModel.findById(id)

  if (!productLot) {
    throw new Error('Product lot not found')
  }

  if (productLot.status !== PRODUCT_LOT_STATUS.SENDING) {
    throw new Error('Product lot is not sending')
  }

  await productLot.updateOne({
    $set: {
      status: PRODUCT_LOT_STATUS.RECEIVED,
      receivingData: data
    }
  }, {
    new: true,
  })

  return JSON.parse(JSON.stringify(productLot))
}

const toReceive = async (userID: string): Promise<typeof productLotObject.static[]> => {
  const user = await userModel.findById(userID)

  if (!user) {
    throw new Error('User not found')
  }

  const productLots = await productLotModel.find({ status: PRODUCT_LOT_STATUS.SENDING, 'shippingAddress.email': user.email })

  return JSON.parse(JSON.stringify(productLots))
}

const received = async (userID: string): Promise<typeof productLotObject.static[]> => {
  const user = await userModel.findById(userID)

  if (!user) {
    throw new Error('User not found')
  }

  const productLots = await productLotModel.find({ status: PRODUCT_LOT_STATUS.RECEIVED, 'shippingAddress.email': user.email })

  return JSON.parse(JSON.stringify(productLots))
}

export default {
  create,
  getByID,
  receive,
  toReceive,
  received,
}
