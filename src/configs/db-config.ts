import dotenv from "dotenv";
dotenv.config()

import type { Dialect } from "sequelize";

const configs = {
  "development": {
    "database": process.env.DB_NAME as string,
    "username": process.env.DB_USER as string,
    "password": process.env.DB_PWD as string,
    "dialect": process.env.DB_DIALECT as Dialect,
    "host": process.env.DB_HOST as string,
    "port": Number(process.env.DB_PORT),
    "logging": console.log,
    "define": {
      "timestamps": true,
      "underscored": true
    }
  },
  "test": {
    "database": process.env.DB_NAME as string,
    "username": process.env.DB_USER as string,
    "password": process.env.DB_PWD as string,
    "dialect": process.env.DB_DIALECT as Dialect,
    "host": process.env.DB_HOST as string,
    "port": Number(process.env.DB_PORT),
    "logging": console.log,
    "define": {
      "timestamps": true,
      "underscored": true
    }
  },
  "production": {
    "database": process.env.DB_NAME as string,
    "username": process.env.DB_USER as string,
    "password": process.env.DB_PWD as string,
    "dialect": process.env.DB_DIALECT as Dialect,
    "host": process.env.DB_HOST as string,
    "port": Number(process.env.DB_PORT),
    "define": {
      "timestamps": true,
      "underscored": true
    }
  }
}

const x = (process.env.NODE_ENV || "development") as keyof typeof configs
const dbConfig = configs[x]

export default dbConfig