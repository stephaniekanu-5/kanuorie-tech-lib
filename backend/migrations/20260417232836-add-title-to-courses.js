'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Courses", "title", {
      type: Sequelize.STRING,
      allowNull: true, // 🔥 IMPORTANT FIX
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("Courses", "title");
  }
};