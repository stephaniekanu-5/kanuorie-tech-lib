"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Notifications", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      message: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      type: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      isRead: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Notifications");
  },
};