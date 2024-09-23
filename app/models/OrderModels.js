import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Product from "../models/ProductModels.js";

const { DataTypes } = Sequelize;

const Order = db.define(
  "order",
  {
    orderCode: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Order;
(async () => {
  await db.sync();
  console.log("Table Order Created");
})();
