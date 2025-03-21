import { t } from "elysia";
import { RAW_MILK_STATUS } from "../constants/rawMilkStatus";

const milkTankInfo = t.Object({
  farmName: t.String({ examples: ["Farm Name"] }),
  milkTankNo: t.String({ examples: ["Milk Tank No"] }),
  personInCharge: t.String({ examples: ["Person In Charge"] }),
  quantity: t.Object({
    value: t.Number({ examples: [1] }),
    suffix: t.String({ examples: ["L"] }),
  }),
  temperature: t.Object({
    value: t.Number({ examples: [1] }),
    suffix: t.String({ examples: ["C"] }),
  }),
  phOfMilk: t.Number({ examples: [1] }),
  fat: t.Number({ examples: [1] }),
  protein: t.Number({ examples: [1] }),
  bacteriaTesting: t.Object({
    value: t.Boolean({ examples: [true] }),
    additionalInfo: t.Optional(t.String({ examples: ["Additional Info"] })),
  }),
  contaminants: t.Object({
    value: t.Boolean({ examples: [true] }),
    additionalInfo: t.Optional(t.String({ examples: ["Additional Info"] })),
  }),
  abnormalCharacteristics: t.Object({
    value: t.Boolean({ examples: [true] }),
    choices: t.Optional(t.Array(t.String({ examples: ["Choice 1", "Choice 2"] }))),
  }),
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

const recipientInformation = t.Object({
  personInCharge: t.String({ examples: ["Person In Charge"] }),
  location: t.String({ examples: ["Location"] }),
  pickupDate: t.String({ format: 'date-time', examples: ["2023-01-01T00:00:00.000Z"] }),
})

const qualify = t.Object({
  quantity: t.Object({
    value: t.Number({ examples: [1] }),
    suffix: t.String({ examples: ["L"] }),
  }),
  temperature: t.Object({
    value: t.Number({ examples: [1] }),
    suffix: t.String({ examples: ["C"] }),
  }),
  phOfMilk: t.Number({ examples: [1] }),
  fat: t.Number({ examples: [1] }),
  protein: t.Number({ examples: [1] }),
  bacteriaTesting: t.Object({
    value: t.Boolean({ examples: [true] }),
    additionalInfo: t.Optional(t.String({ examples: ["Additional Info"] })),
  }),
  contaminants: t.Object({
    value: t.Boolean({ examples: [true] }),
    additionalInfo: t.Optional(t.String({ examples: ["Additional Info"] })),
  }),
  abnormalCharacteristics: t.Object({
    value: t.Boolean({ examples: [true] }),
    choices: t.Optional(t.Array(t.String({ examples: ["Choice 1", "Choice 2"] }))),
  }),
})

export const getByIDParams = t.Object({
  id: t.String({ examples: ['64f7d8c5d2e9c0c9c9c9c9c9'] })
})

export const getByIDResponse = t.Object({
  _id: t.String({ examples: ["64f7d8c5d2e9c0c9c9c9c9c9"] }),
  status: t.Enum(RAW_MILK_STATUS, { examples: Object.values(RAW_MILK_STATUS) }),
  milkTankInfo: milkTankInfo,
  shippingAddress: shippingAddress,
  recipientInformation: t.Nullable(recipientInformation),
  qualify: t.Nullable(qualify),
})

export const receiveRawMilkBody = t.Object({
  recipientInformation: recipientInformation,
  qualify: qualify,
})

export const createRawMilkBody = t.Object({
  milkTankInfo: milkTankInfo,
  shippingAddress: shippingAddress,
})

export const createRawMilkResponse = getByIDResponse
