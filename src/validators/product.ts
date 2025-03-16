import {t} from 'elysia'

const generalInformation = t.Object({
  productName: t.String({ examples: ['Product Name'] }),
  category: t.String({ examples: ['Category'] }),
  description: t.String({ examples: ['Description'] }),
  quantityPerUnit: t.Object({
    value: t.Number({ examples: [1] }),
    suffix: t.String({ examples: ['Unit'] })
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

export const productObject = t.Object({
  _id: t.String({ examples: ['64f7d8c5d2e9c0c9c9c9c9c9'] }),
  user: t.String({ examples: ['64f7d8c5d2e9c0c9c9c9c9c9'] }),
  generalInformation,
  nutrition,
})

export const createProductBody = t.Object({
  generalInformation,
  nutrition,
})
