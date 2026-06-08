import env from "../env";

import User from "../models/User";
import Team from "../models/Team";
import TeamMember from "../models/TeamMember";
import Task from "../models/Task";
import TaskHistory from "../models/TaskHistory";

import dbConfig from "../configs/db-config";
import { Sequelize } from "sequelize";
const database = new Sequelize(env.DB_URL, dbConfig)

User.initialize(database)
Team.initialize(database)
TeamMember.initialize(database)
Task.initialize(database)
TaskHistory.initialize(database)

User.associate(database.models)
Team.associate(database.models)
Task.associate(database.models)
TaskHistory.associate(database.models)

export default database