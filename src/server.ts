import { Elysia } from 'elysia'

import env from './config'
import database from './connections/mongoose'

async function main(): Promise<void> {
  try {
    await database.connect()
    const app = new Elysia().listen(env.PORT)
    console.log(`Server is running at ${app.server?.hostname}:${app.server?.port}`)
  } catch (error) {
    await database.disconnect()
  }
}

main()
