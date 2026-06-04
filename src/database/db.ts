import dbConfigs from "../configs/db-config";

import { Sequelize } from "sequelize";
const database = new Sequelize(dbConfigs.url, {
    ...dbConfigs
})

export default database