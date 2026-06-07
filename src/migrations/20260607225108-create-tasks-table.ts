'use strict';

import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface: QueryInterface) {
    await queryInterface.createTable("tasks", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      status: {
        type: DataTypes.ENUM("pending", "in_progress", "completed"),
        defaultValue: "pending",
        allowNull: false
      },
      priority: {
        type: DataTypes.ENUM('high', 'medium', 'low'),
        allowNull: false
      },
      asigned_to: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "users", key: "id"},
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      team_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "teams", key: "id"},
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false
      }
    })
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.dropTable("tasks")
  }
};