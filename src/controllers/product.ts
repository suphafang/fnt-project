import Elysia, { t } from "elysia";

import services from "../services";
import middlewares from "../middlewares";
import { createProductBody, productObject } from "../validators/product";

export default new Elysia({
  detail: {
    tags: ['Product'],
  }
})
  .use(middlewares.auth)
  .group('/product', (app) => app
    .get('/me', ({ userId }) => services.product.getByUserID(userId), {
      response: { 200: t.Array(productObject) },
      detail: {
        security: [{ bearerAuth: [] }],
        description: 'Get product by user id'
      },
      isAuthenticated: true
    })
    .post('/', ({ body, userId }) => services.product.create(userId, body), {
      body: createProductBody,
      response: { 200: productObject },
      detail: {
        security: [{ bearerAuth: [] }],
        description: 'Create product'
      },
      isAuthenticated: true
    })
  )
