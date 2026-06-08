import { Model, DataTypes, Sequelize } from "sequelize"

class User extends Model {
    static initialize(connection: Sequelize) {
        this.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            name: DataTypes.STRING,
            role: {
                type: DataTypes.ENUM("admin", "member"),
                defaultValue: "member"
            },
            email: DataTypes.STRING,
            password: DataTypes.STRING
        }, {
            sequelize: connection,
            tableName: "users",
            timestamps: true,
            underscored: true
        })
    }

    static associate(models: any) {
        this.belongsToMany(models.Team, { foreignKey: "user_id", through: models.TeamMember, as: "teams" })
        this.hasMany(models.Task, { foreignKey: "asigned_to", as: "tasks" })
        this.hasMany(models.TaskHistory, { foreignKey: "changed_by", as: "task_changes" })
    }
}

export default User