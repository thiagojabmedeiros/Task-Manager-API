import { Model, DataTypes, Sequelize, BelongsToManyAddAssociationsMixin } from "sequelize"
import User from "./User"

class Task extends Model {
    static initialize(connection: Sequelize) {
        this.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            status: {
                type: DataTypes.ENUM("pending", "in_progress", "completed"),
                defaultValue: "pending"
            },
            priority: DataTypes.ENUM('high', 'medium', 'low'),
            asigned_to: DataTypes.UUID,
            team_id: DataTypes.UUID
        }, {
            sequelize: connection,
            tableName: "tasks",
            timestamps: true,
            underscored: true
        })
    }

    static associate(models: any) {
        this.belongsTo(models.User, { foreignKey: "asigned_to", as: "user" })
        this.belongsTo(models.Team, { foreignKey: "team_id", as: "team" })
        this.hasMany(models.TaskHistory, { foreignKey: "task_id", as: "task_changes" })
    }
}

export default Task