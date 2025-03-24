import Elysia, { t } from "elysia";
import services from "../services";
import middlewares from "../middlewares";
import { createProductLotBody, getByIDParams, productLotObject, receivingData } from "../validators/productLot";

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
    .get('/me', ({ userId }) => services.productLot.getByUserID(userId), {
      response: { 200: t.Array(productLotObject) },
      detail: {
        security: [{ bearerAuth: [] }],
        description: 'Get product lot by user id'
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
    .post('/:id/receive', ({ params, body }) => services.productLot.receive(params.id, body), {
      params: getByIDParams,
      body: receivingData,
      response: { 200: productLotObject },
      detail: {
        security: [{ bearerAuth: [] }],
        description: 'Receive product lot'
      },
      isAuthenticated: true
    })
    .get('/to-receive', ({ userId }) => services.productLot.toReceive(userId), {
      response: { 200: t.Array(productLotObject) },
      detail: {
        security: [{ bearerAuth: [] }],
        description: 'Get product lots to receive'
      },
      isAuthenticated: true
    })
    .get('/received', ({ userId }) => services.productLot.received(userId), {
      response: { 200: t.Array(productLotObject) },
      detail: {
        security: [{ bearerAuth: [] }],
        description: 'Get product lots received'
      },
      isAuthenticated: true
    })
  )
