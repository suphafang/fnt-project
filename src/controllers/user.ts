import Elysia from "elysia";
import services from "../services";
import { getByIDResponse, setupRoleBody, setupRoleResponse, updateGeneralInformationBody, updateGeneralInformationResponse } from "../validators/user";
import middlewares from "../middlewares";

export default new Elysia({
  detail: {
    tags: ['User'],
  }
})
  .use(middlewares.auth)
  .group('/user', (app) => app
    .post('/setup-role', ({ body, userId }) => services.user.setupRole(userId, body.role), {
      body: setupRoleBody,
      response: { 200: setupRoleResponse },
      detail: {
        security: [{ bearerAuth: [] }],
        description: 'Setup user role'
      },
      isAuthenticated: true
    })
    .post('/update-general-information', ({ body, userId }) => services.user.setupGeneralInformation(userId, body), {
      body: updateGeneralInformationBody,
      response: { 200: updateGeneralInformationResponse },
      detail: {
        security: [{ bearerAuth: [] }],
        description: 'Update user general information',
      },
      isAuthenticated: true,
    })
    .get('/me', ({ userId }) => services.user.getByID(userId), {
      response: { 200: getByIDResponse },
      detail: {
        security: [{ bearerAuth: [] }],
        description: 'Get user by id',
      },
      isAuthenticated: true,
    })
  )
