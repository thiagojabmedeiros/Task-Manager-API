import { Model, DataTypes, Sequelize, BelongsToManyAddAssociationsMixin } from "sequelize"
import User from "./User"

class Team extends Model {
    declare addUsers: BelongsToManyAddAssociationsMixin<User, string>

    static initialize(connection: Sequelize) {
        this.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            name: DataTypes.STRING,
            description: DataTypes.STRING
        }, {
            sequelize: connection,
            tableName: "teams",
            timestamps: true,
            underscored: true
        })
    }

    static associate(models: any) {
        this.belongsToMany(models.User, { foreignKey: "team_id", through: models.TeamMember, as: "users" })
    }
}

export default Team