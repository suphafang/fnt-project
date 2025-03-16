import { t } from "elysia";

export const signUpBody = t.Object({
  fullName: t.String({ examples: ["John Doe"] }),
  email: t.String({ format: "email", examples: ["example@email.com"] }),
  phone: t.String({ format: "phone", examples: ["0999999999"] }),
  password: t.String({ examples: ["P@ssw0rd"] }),
})

export const signUpResponse = t.Object({
  token: t.String({ examples: ["jwt-token"] }),
})
