import { PutObjectCommand, PutObjectCommandInput, S3Client } from "@aws-sdk/client-s3"
import env from "../config"

const client = new S3Client({
  region: env.S3_REGION,
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY_ID,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY
  }
})

class S3 {
  static async upload(file: File, key: string) {
    try {
      const params: PutObjectCommandInput = {
        Bucket: env.S3_BUCKET_NAME,
        Key: key,
        Body: Buffer.from(new Uint8Array(await file.arrayBuffer())),
        ContentType: file.type,
      }

      const command = new PutObjectCommand(params)
      await client.send(command)

      if (!params.Key) {
        throw new Error('File upload failed')
      }

      return params.Key
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

export default S3