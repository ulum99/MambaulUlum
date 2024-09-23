import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const TempOrder = db.define(
  "tempOrder",
  {
    tepid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      validate: {
        notEmpty: true,
      },
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: false,
      validate: {
        notEmpty: true,
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

export default TempOrder;

(async () => {
  await db.sync();
  console.log("Table TempOrder Created");
})();
