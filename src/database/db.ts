import dbConfigs from "../configs/db-config";

const { url, ...options } = dbConfigs

import { Sequelize } from "sequelize";
const database = new Sequelize(url, options)

export default database