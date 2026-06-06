import env from "../env";

import User from "../models/User";

import dbConfig from "../configs/db-config";
import { Sequelize } from "sequelize";
const database = new Sequelize(env.DB_URL, dbConfig)

User.initialize(database)

export default database