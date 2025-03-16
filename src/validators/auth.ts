import { t } from "elysia";

export const signUpBody = t.Object({
  fullName: t.String({ examples: ["John Doe"] }),
  email: t.String({ format: "email", examples: ["example@email.com"] }),
  phone: t.String({ examples: ["0999999999"], minLength: 10, maxLength: 10 }),
  password: t.String({ examples: ["P@ssw0rd"], minLength: 8 }),
})

export const signUpResponse = t.Object({
  token: t.String({ examples: ["jwt-token"] }),
})

export const loginBody = t.Object({
  email: t.String({ format: "email", examples: ["example@email.com"] }),
  password: t.String({ examples: ["P@ssw0rd"], minLength: 8 }),
})

export const loginResponse = t.Object({
  token: t.String({ examples: ["jwt-token"] }),
})
