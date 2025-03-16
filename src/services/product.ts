import { createProductBody, productObject } from "../validators/product";
import productModel from "../models/product";

const create = async (userID: string, data: typeof createProductBody.static): Promise<typeof productObject.static> => {
  const product = await productModel.create({
    user: userID,
    generalInformation: data.generalInformation,
    nutrition: data.nutrition
  })

  return JSON.parse(JSON.stringify(product))
}

const getByUserID = async (userID: string): Promise<typeof productObject.static[]> => {
  const products = await productModel.find({ user: userID })

  return JSON.parse(JSON.stringify(products))
}

export default {
  create,
  getByUserID,
}