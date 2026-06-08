import { Model, DataTypes, Sequelize, BelongsToManyAddAssociationsMixin } from "sequelize"
import User from "./User"

class TaskHistory extends Model {
    static initialize(connection: Sequelize) {
        this.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            changed_by: DataTypes.UUID,
            task_id: DataTypes.UUID,
            new_status: {
                type: DataTypes.ENUM("pending", "in_progress", "completed"),
            },
            old_status: {
                type: DataTypes.ENUM("pending", "in_progress", "completed"),
            }
        }, {
            sequelize: connection,
            tableName: "tasks_histories",
            timestamps: true,
            underscored: true
        })
    }

    static associate(models: any) {
        this.belongsTo(models.User, { foreignKey: "asigned_to", as: "user" })
        this.belongsTo(models.Team, { foreignKey: "team_id", as: "team" })
    }
}

export default TaskHistory