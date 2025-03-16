import Elysia from "elysia";
import { signUpBody, signUpResponse } from "../validators/auth";
import services from "../services";

export default new Elysia()
  .group('/auth', (app) => app
    .post('/sign-up', ({ body }) => services.auth.signUp(body), { body: signUpBody, response: { 200: signUpResponse } })
  )
