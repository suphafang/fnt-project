import mongoose, { Schema } from "mongoose";

const generalInformationSchema = {
  productName: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  quantityPerUnit: {
    type: 'object', properties: {
      value: { type: Number, required: true },
      suffix: { type: String, required: true }
    },
    required: true
  },
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

const productSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  generalInformation: generalInformationSchema,
  nutrition: nutritionSchema,
}, {
  timestamps: true,
  versionKey: false
})

export default mongoose.model('Product', productSchema)
