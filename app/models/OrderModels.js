import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Product from "../models/ProductModels.js";

const { DataTypes } = Sequelize;

const Order = db.define(
  "order",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
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
Order.removeAttribute("id");
Product.hasMany(Order);
Order.belongsTo(Product, { foreignKey: "id_product" });
export default Order;
