import Elysia from "elysia";
import { signUpBody, signUpResponse } from "../validators/auth";

export default new Elysia()
  .group('/auth', (app) => app
    .post('/sign-up', () => { }, { body: signUpBody, response: { 200: signUpResponse } })
  )
