'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('userTicketBookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "User",
          key: "id",
        },
    },
    cinemaTicketId:{
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "CinemaTickets",
        key: "id",
      },
    },
    cinemaId:{
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "cinemas",
        key: "id",
      },
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
    await queryInterface.dropTable('userTicketBookings');
  }
};