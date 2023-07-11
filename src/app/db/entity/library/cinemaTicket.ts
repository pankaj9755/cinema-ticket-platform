import { Sequelize, DataTypes, IntegerDataType } from "sequelize";
export default (sequelize: Sequelize, DataTypes) => {
  let CinemaTickets: any = sequelize.define(
    "cinemaTickets",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      cinemaId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "Cinemas",
          key: "id",
        },
      },
      seats: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM(),
        values: ["active", "inactive"],
        defaultValue: "inactive",
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
      paranoid: false,
    }
  );
  CinemaTickets.associate = (models) => {
    CinemaTickets.belongsTo(models.Cinemas, {
      foreignKey: "cinemaId",
      sourceKey: "id",
      targetKey: "id",
      as: "cinemaInfo",
    });
  };
  return CinemaTickets;
};
