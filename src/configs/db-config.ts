import env from "../env"

const configs = {
  "development": {
    "url": env.DATABASE_URL,
    "logging": console.log,
    "define": {
      "timestamps": true,
      "underscored": true
    }
  },
  "test": {
    "url": process.env.DATABASE_URL as string,
    "logging": console.log,
    "define": {
      "timestamps": true,
      "underscored": true
    }
  },
  "production": {
    "url": process.env.DATABASE_URL as string,
    "define": {
      "timestamps": true,
      "underscored": true
    }
  }
}

const configsEnv = env.NODE_ENV as keyof typeof configs
const dbConfigs = configs[configsEnv]

export default dbConfigs