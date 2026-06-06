import dbConfig from "../configs/db-config";

import { Sequelize } from "sequelize";
const database = new Sequelize(dbConfig)

export default database