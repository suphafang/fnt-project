import { t } from "elysia";
import { PRODUCT_LOT_STATUS, RECEIVING_STATUS } from "../constants/productLotStatus";

const generalInformation = t.Object({
  productName: t.String({ examples: ['Product Name'] }),
  category: t.String({ examples: ['Category'] }),
  description: t.String({ examples: ['Description'] }),
  personInCharge: t.String({ examples: ['Person In Charge'] }),
  quantityPerUnit: t.Object({
    value: t.Number({ examples: [1] }),
    suffix: t.String({ examples: ['Unit'] })
  }),
})

const qualify = t.Object({
  temperature: t.Object({
    value: t.Number({ examples: [1] }),
    suffix: t.String({ examples: ['C'] }),
  }),
  phOfMilk: t.Number({ examples: [1] }),
  fat: t.Number({ examples: [1] }),
  protein: t.Number({ examples: [1] }),
  bacteriaTesting: t.Object({
    value: t.Boolean({ examples: [true] }),
    additionalInfo: t.Optional(t.String({ examples: ['Additional Info'] })),
  }),
  contaminants: t.Object({
    value: t.Boolean({ examples: [true] }),
    additionalInfo: t.Optional(t.String({ examples: ['Additional Info'] })),
  }),
  abnormalCharacteristics: t.Object({
    value: t.Boolean({ examples: [true] }),
    choices: t.Optional(t.Array(t.String({ examples: ['Choice 1', 'Choice 2'] }))),
  }),
})

const nutrition = t.Object({
  calories: t.Number({ examples: [1] }),
  totalFat: t.Number({ examples: [1] }),
  cholesterol: t.Number({ examples: [1] }),
  sodium: t.Number({ examples: [1] }),
  potassium: t.Number({ examples: [1] }),
  totalCarbohydrate: t.Number({ examples: [1] }),
  dietaryFiber: t.Number({ examples: [1] }),
  sugar: t.Number({ examples: [1] }),
  temperature: t.Number({ examples: [1] }),
  phOfMilk: t.Number({ examples: [1] }),
  vitaminC: t.Number({ examples: [1] }),
  calcium: t.Number({ examples: [1] }),
  iron: t.Number({ examples: [1] }),
  vitaminD: t.Number({ examples: [1] }),
  vitaminB6: t.Number({ examples: [1] }),
  vitaminB12: t.Number({ examples: [1] }),
  magnesium: t.Number({ examples: [1] }),
})

const shippingAddress = t.Object({
  companyName: t.String({ examples: ["Company Name"] }),
  firstName: t.String({ examples: ["First Name"] }),
  lastName: t.String({ examples: ["Last Name"] }),
  email: t.String({ format: "email", examples: ["example@email.com"] }),
  phone: t.String({ examples: ["0123456789"], minLength: 10, maxLength: 10 }),
  address: t.String({ examples: ["Address"] }),
  province: t.String({ examples: ["Province"] }),
  district: t.String({ examples: ["District"] }),
  subdistrict: t.String({ examples: ["Subdistrict"] }),
  zipCode: t.String({ examples: ["Zip Code"] }),
  location: t.String({ examples: ["Location"] }),
})

const receivingGeneralInformation = t.Object({
  receivingStatus: t.Enum(RECEIVING_STATUS, { examples: Object.values(RECEIVING_STATUS) }),
  factoryName: t.String({ examples: ["Factory Name"] }),
  productLot: t.String({ examples: ["Product Lot ID"] }),
  personInCharge: t.String({ examples: ["Person In Charge"] }),
})

const receivingProductDetail = t.Object({
  pickupTime: t.String({ format: 'date-time', examples: ["2023-01-01T00:00:00.000Z"] }),
  deliverTime: t.String({ format: 'date-time', examples: ["2023-01-01T00:00:00.000Z"] }),
  quantity: t.Object({
    value: t.Number({ examples: [1] }),
    suffix: t.String({ examples: ['Unit'] })
  }),
  temperature: t.Object({
    value: t.Number({ examples: [1] }),
    suffix: t.String({ examples: ['C'] }),
  }),
  address: shippingAddress,
})

export const receivingData = t.Object({
  generalInformation: receivingGeneralInformation,
  productDetail: receivingProductDetail
})

export const productLotObject = t.Object({
  _id: t.String({ examples: ['Product Lot ID'] }),
  user: t.String({ examples: ['User ID'] }),
  status: t.Enum(PRODUCT_LOT_STATUS, { examples: Object.values(PRODUCT_LOT_STATUS) }),
  milkTanks: t.Array(t.String({ examples: ["Milk Tank ID"] })),
  generalInformation,
  qualify,
  nutrition,
  shippingAddress,
  receivingData: t.Nullable(receivingData)
})

export const createProductLotBody = t.Object({
  milkTanks: t.Array(t.String({ examples: ["Milk Tank ID"] })),
  generalInformation,
  qualify,
  nutrition,
  shippingAddress,
})

export const getByIDParams = t.Object({
  id: t.String({ examples: ['64f7d8c5d2e9c0c9c9c9c9c9'] })
})
