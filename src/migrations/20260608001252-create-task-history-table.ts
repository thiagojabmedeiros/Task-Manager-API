'use strict';

import { DataTypes, QueryInterface } from "sequelize";
import database from "../database/db";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface: QueryInterface) {
    await queryInterface.createTable("tasks_histories", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      task_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "tasks", key: "id"},
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      changed_by: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "users", key: "id"},
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      old_status: {
        type: DataTypes.ENUM("pending", "in_progress", "completed"),
        allowNull: false
      },
      new_status: {
        type: DataTypes.ENUM("pending", "in_progress", "completed"),
        allowNull: true
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
    await queryInterface.dropTable("tasks_histories")
  }
};