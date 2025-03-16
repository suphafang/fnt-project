import Elysia from "elysia";
import services from "../services";
import middlewares from "../middlewares";
import { createProductLotBody, getByIDParams, productLotObject } from "../validators/productLot";

export default new Elysia({
  detail: {
    tags: ['Product Lot'],
  }
})
  .use(middlewares.auth)
  .group('/product-lot', (app) => app
    .post('/', ({ body, userId }) => services.productLot.create(userId, body), {
      body: createProductLotBody,
      response: { 200: productLotObject },
      detail: {
        security: [{ bearerAuth: [] }],
        description: 'Create product lot'
      },
      isAuthenticated: true
    })
    .get('/:id', ({ params }) => services.productLot.getByID(params.id), {
      params: getByIDParams,
      response: { 200: productLotObject },
      detail: {
        security: [{ bearerAuth: [] }],
        description: 'Get product lot by id'
      },
      isAuthenticated: true
    })
  )
