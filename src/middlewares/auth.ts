import { Elysia } from "elysia"

import decodeToken from "../utils/decodeToken"

export default new Elysia()
  .macro(
    {
      isAuthenticated: {
        beforeHandle: ({ headers: { authorization }, error }) => {
          if (!authorization) return error(401, {
            success: false,
            message: 'Unauthorized'
          })
        },
        resolve: async ({ headers: { authorization }, error }) => {
          const bearer = authorization?.substring(7)

          if (!bearer) return error(401, {
            success: false,
            message: 'Unauthorized'
          })

          try {
            const { sub: userId } = decodeToken(bearer)
            return { bearer, userId }
          } catch (_) {
            return error(401, {
              success: false,
              message: 'Unauthorized'
            })
          }
        }
      },
    },
  )
  .as('scoped')
