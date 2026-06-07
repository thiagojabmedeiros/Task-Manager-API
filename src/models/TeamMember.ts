// models/TeamMember.ts
import { Model, DataTypes, Sequelize } from "sequelize"

class TeamMember extends Model {
    static initialize(connection: Sequelize) {
        this.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            team_id: DataTypes.UUID,
            user_id: DataTypes.UUID,
        }, {
            sequelize: connection,
            tableName: "teams_members",
            timestamps: true,
            underscored: true
        })
    }
}

export default TeamMember