import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Order from "../models/OrderModels.js";
import Product from "../models/ProductModels.js";

const { DataTypes } = Sequelize;

const OrderDetail = db.define(
  "orderDetail",
  {
    orderDetailId: {
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

Order.hasMany(OrderDetail);
OrderDetail.belongsTo(Order, { foreignKey: "orderId" });

Product.hasMany(OrderDetail);
OrderDetail.belongsTo(Product, { foreignKey: "id" });

export default OrderDetail;

(async () => {
  await db.sync();
  console.log("Table OrderDetail Created");
})();
