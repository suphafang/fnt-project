const env = {
  PORT: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost:27017/example',
  APP_SECRET_KEY: process.env.APP_SECRET_KEY || 'black_cat',
  S3_REGION: process.env.S3_REGION || 'ap-northeast-1',
  S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID || '',
  S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY || '',
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME || 'fnt-project'
}

export default env
