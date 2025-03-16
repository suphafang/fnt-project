import mongoose, { Schema } from "mongoose";
import { RAW_MILK_STATUS } from "../constants/rawMilkStatus";

const milkTankInfoSchema = new Schema({
  farmName: { type: String, required: true },
  milkTankNo: { type: String, required: true },
  personInCharge: { type: String, required: true },
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
})

const shippingAddressSchema = new Schema({
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
})

const recipientInformationSchema = new Schema({
  personInCharge: { type: String, required: true },
  location: { type: String, required: true },
  pickupDate: { type: Date, required: true },
})

const qualifySchema = new Schema({
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
})

const rawMilkSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, required: true, enum: Object.values(RAW_MILK_STATUS), default: 'PENDING' },
  milkTankInfo: { type: milkTankInfoSchema, required: true },
  shippingAddress: { type: shippingAddressSchema, required: true },
  recipientInformation: { type: recipientInformationSchema, default: null },
  qualify: { type: qualifySchema, default: null },
  used: { type: Boolean, default: false },
}, {
  timestamps: true,
  versionKey: false
})

export default mongoose.model('RawMilk', rawMilkSchema)
