import mongoose from 'mongoose'
import env from '../config'

let client: mongoose.Mongoose | null = null

async function connect() {
  if (client) return

  client = await mongoose.connect(env.MONGODB_URL)
}

async function disconnect() {
  if (!client) return

  await client.disconnect()
  client = null
}

export default {
  connect,
  disconnect,
}
