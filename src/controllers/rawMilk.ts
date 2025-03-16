import Elysia, { t } from "elysia";

import services from "../services";
import middlewares from "../middlewares";
import { createRawMilkBody, createRawMilkResponse, getByIDParams, getByIDResponse, receiveRawMilkBody } from "../validators/rawMilk";

export default new Elysia({
  detail: {
    tags: ['Raw Milk'],
  }
})
  .use(middlewares.auth)
  .group('/raw-milk', (app) => app
    .post('/', ({ body, userId }) => services.rawMilk.create(userId, body), {
      body: createRawMilkBody,
      response: { 200: createRawMilkResponse },
      detail: {
        security: [{ bearerAuth: [] }],
        description: 'Create raw milk'
      },
      isAuthenticated: true
    })
    .get('/:id', ({ params }) => services.rawMilk.getByID(params.id), {
      params: getByIDParams,
      response: { 200: getByIDResponse },
      detail: {
        security: [{ bearerAuth: [] }],
        description: 'Get raw milk by id'
      },
      isAuthenticated: true
    })
    .get('/me', ({ userId }) => services.rawMilk.getByUserID(userId), {
      response: { 200: t.Array(getByIDResponse) },
      detail: {
        security: [{ bearerAuth: [] }],
        description: 'Get raw milk by user id'
      },
      isAuthenticated: true
    })
    .get('/to-receive', ({ userId }) => services.rawMilk.toReceive(userId), {
      response: { 200: t.Array(getByIDResponse) },
      detail: {
        security: [{ bearerAuth: [] }],
        description: 'Get raw milk to receive'
      },
      isAuthenticated: true
    })
    .post('/:id/receive', ({ params, body }) => services.rawMilk.receive(params.id, body), {
      params: getByIDParams,
      body: receiveRawMilkBody,
      response: { 200: getByIDResponse },
      detail: {
        security: [{ bearerAuth: [] }],
        description: 'Receive raw milk'
      },
      isAuthenticated: true
    })
    .get('/available-tanks', ({ userId }) => services.rawMilk.getAvailableTanks(userId), {
      response: { 200: t.Array(getByIDResponse) },
      detail: {
        security: [{ bearerAuth: [] }],
        description: 'Get available tanks'
      },
      isAuthenticated: true
    })
  )
