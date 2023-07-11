import { Sequelize, DataTypes, IntegerDataType } from "sequelize";
export default (sequelize: Sequelize, DataTypes) => {
  let Cinemas: any = sequelize.define(
    "cinemas",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      cinemaName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cinemaSeats: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
      paranoid: false,
    }
  );
 
  return Cinemas;
};
