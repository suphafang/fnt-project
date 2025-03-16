import Elysia from "elysia";
import services from "../services";
import { setupRoleBody, setupRoleResponse } from "../validators/user";
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
  )
