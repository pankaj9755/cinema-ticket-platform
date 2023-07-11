'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cinemaTickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cinemaId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "Cinemas",
          key: "id",
        },
      },
      seats: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM(),
        values: ["active", "inactive"],
        defaultValue: "inactive",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cinemaTickets');
  }
};