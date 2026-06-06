import dotenv from "dotenv";
dotenv.config()

import type { Dialect } from "sequelize";

const configs = {
  "development": {
    "url": process.env.DB_URL as string,
    "dialect": process.env.DB_DIALECT as Dialect,
    "logging": console.log,
    "define": {
      "timestamps": true,
      "underscored": true
    }
  },
  "test": {
    "url": process.env.DB_URL as string,
    "dialect": process.env.DB_DIALECT as Dialect,
    "logging": console.log,
    "define": {
      "timestamps": true,
      "underscored": true
    }
  },
  "production": {
    "url": process.env.DB_URL as string,
    "dialect": process.env.DB_DIALECT as Dialect,
    "define": {
      "timestamps": true,
      "underscored": true
    }
  }
}

const x = (process.env.NODE_ENV || "development") as keyof typeof configs
const dbConfig = configs[x]

export default dbConfig