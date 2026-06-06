import dbConfig from "../configs/db-config";

import User from "../models/User";

import { Sequelize } from "sequelize";
const database = new Sequelize(dbConfig)

User.initialize(database)

export default database