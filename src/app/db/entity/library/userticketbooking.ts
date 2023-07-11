import { Sequelize, DataTypes, IntegerDataType } from "sequelize";
export default (sequelize: Sequelize, DataTypes) => {
  let UserTicketBooking: any = sequelize.define(
    "userTicketBookings",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Users",
          key: "id",
        },
    },
    cinemaTicketId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "cinemaTickets",
        key: "id",
      },
    },
    cinemaId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "cinemas",
        key: "id",
      },
    },
    },
    {
      timestamps: true,
      freezeTableName: true,
      paranoid: false,
    }
  );

  return UserTicketBooking;
};
