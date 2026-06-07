import { Model, DataTypes, Sequelize } from "sequelize"

class Team extends Model {
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
        this.belongsToMany(models.User, { foreignKey: "user_id", through: "teams-members", as: "users" })
    }
}

export default Team