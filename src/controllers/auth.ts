import Elysia from "elysia";
import { loginBody, loginResponse, signUpBody, signUpResponse } from "../validators/auth";
import services from "../services";

export default new Elysia({
  detail: {
    tags: ['Auth'],
  }
})
  .group('/auth', (app) => app
    .post('/sign-up', ({ body }) => services.auth.signUp(body), {
      body: signUpBody,
      response: { 200: signUpResponse },
      detail: { description: 'Sign up user' }
    })
    .post('/login', ({ body }) => services.auth.login(body.email, body.password), {
      body: loginBody,
      response: { 200: loginResponse },
      detail: { description: 'Login user' }
    })
  )
