'use strict';

import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface: QueryInterface) {
    await queryInterface.createTable("teams-members", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      team_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { key: "id", model: "teams" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { key: "id", model: "users"},
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
    })
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.dropTable("teams-members")
  }
};