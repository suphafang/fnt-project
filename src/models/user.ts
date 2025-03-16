import mongoose, { Schema } from "mongoose";

const generalInformationSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  province: { type: String, required: true },
  district: { type: String, required: true },
  subdistrict: { type: String, required: true },
  organicCertificate: { type: [String], default: [] },
  location: { type: String, required: true },
})

const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['FARMER', 'FACTORY', 'LOGISTIC', 'RETAILER'], default: null },
  generalInformation: { type: generalInformationSchema, default: null },
}, {
  timestamps: true,
  versionKey: false
})

export default mongoose.model('User', userSchema)
