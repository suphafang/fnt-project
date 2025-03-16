import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'

import env from './config'
import database from './connections/mongoose'
import controllers from './controllers'

async function main(): Promise<void> {
  try {
    await database.connect()
    const app = new Elysia()
      .use(swagger({
        path: '/api',
        documentation: {
          components: {
            securitySchemes: {
              bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
              }
            }
          }
        }
      }))
      .use(cors({ origin: '*' }))
      .use(controllers.auth)
      .use(controllers.user)
      .listen(env.PORT)
    console.log(`Server is running at ${app.server?.hostname}:${app.server?.port}`)
  } catch (error) {
    await database.disconnect()
  }
}

main()
