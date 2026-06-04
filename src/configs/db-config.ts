import dotenv from "dotenv"
dotenv.config()

const configs = {
  "development": {
    "url": process.env.DB_URL as string,
    "logging": console.log,
    "port": 5432,
    "define": {
      "timestamps": true,
      "underscored": true
    }
  },
  "test": {
    "url": process.env.DB_URL as string,
    "logging": console.log,
    "define": {
      "timestamps": true,
      "underscored": true
    }
  },
  "production": {
    "url": process.env.DB_URL as string,
    "define": {
      "timestamps": true,
      "underscored": true
    }
  }
}

const configsEnv = (process.env.NODE_ENV || "development") as keyof typeof configs
const dbConfigs = configs[configsEnv]

export default dbConfigs