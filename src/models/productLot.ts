import mongoose, { Schema } from "mongoose"
import { PRODUCT_LOT_STATUS, RECEIVING_STATUS } from "../constants/productLotStatus"

const generalInformationSchema = {
  productName: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  personInCharge: { type: String, required: true },
  quantityPerUnit: {
    type: 'object', properties: {
      value: { type: Number, required: true },
      suffix: { type: String, required: true }
    },
    required: true
  },
}

const qualifySchema = {
  temperature: {
    type: 'object', properties: {
      value: { type: Number, required: true },
      suffix: { type: String, required: true }
    }
  },
  phOfMilk: { type: Number, required: true },
  fat: { type: Number, required: true },
  protein: { type: Number, required: true },
  bacteriaTesting: {
    type: 'object', properties: {
      value: { type: Boolean, required: true },
      additionalInfo: { type: String },
    }
  },
  contaminants: {
    type: 'object', properties: {
      value: { type: Boolean, required: true },
      additionalInfo: { type: String },
    }
  },
  abnormalCharacteristics: {
    type: 'object', properties: {
      value: { type: Boolean, required: true },
      choices: { type: [String], required: true },
    }
  }
}

const nutritionSchema = {
  calories: { type: Number, required: true },
  totalFat: { type: Number, required: true },
  cholesterol: { type: Number, required: true },
  sodium: { type: Number, required: true },
  potassium: { type: Number, required: true },
  totalCarbohydrate: { type: Number, required: true },
  dietaryFiber: { type: Number, required: true },
  sugar: { type: Number, required: true },
  temperature: { type: Number, required: true },
  phOfMilk: { type: Number, required: true },
  vitaminC: { type: Number, required: true },
  calcium: { type: Number, required: true },
  iron: { type: Number, required: true },
  vitaminD: { type: Number, required: true },
  vitaminB6: { type: Number, required: true },
  vitaminB12: { type: Number, required: true },
  magnesium: { type: Number, required: true },
}

const shippingAddressSchema = {
  companyName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  province: { type: String, required: true },
  district: { type: String, required: true },
  subdistrict: { type: String, required: true },
  zipCode: { type: String, required: true },
  location: { type: String, required: true },
}

const receivingGeneralInformationSchema = {
  receivingStatus: { type: String, required: true, enum: Object.values(RECEIVING_STATUS) },
  factoryName: { type: String, required: true },
  productLot: { type: Schema.Types.ObjectId, ref: 'ProductLot', required: true },
  personInCharge: { type: String, required: true },
}

const receivingProductDetailSchema = {
  pickupTime: { type: Date, required: true },
  deliverTime: { type: Date, required: true },
  quantity: {
    type: 'object', properties: {
      value: { type: Number, required: true },
      suffix: { type: String, required: true }
    }
  },
  temperature: {
    type: 'object', properties: {
      value: { type: Number, required: true },
      suffix: { type: String, required: true }
    }
  },
  address: shippingAddressSchema,
}

const receivingDataSchema = {
  generalInformation: receivingGeneralInformationSchema,
  productDetail: receivingProductDetailSchema
}

const productLotSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, required: true, enum: Object.values(PRODUCT_LOT_STATUS), default: 'SENDING' },
  generalInformation: { type: generalInformationSchema, required: true },
  milkTanks: { type: [Schema.Types.ObjectId], ref: 'MilkTank', required: true },
  qualify: { type: qualifySchema, required: true },
  nutrition: { type: nutritionSchema, required: true },
  shippingAddress: { type: shippingAddressSchema, required: true },
  receivingData: { type: receivingDataSchema, default: null },
}, {
  timestamps: true,
  versionKey: false
})

export default mongoose.model('ProductLot', productLotSchema)
