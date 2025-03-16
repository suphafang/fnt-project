const env = {
  PORT: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost:27017/example',
  APP_SECRET_KEY: process.env.APP_SECRET_KEY || 'black_cat',
}

export default env
