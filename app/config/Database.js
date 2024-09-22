import { Sequelize } from "sequelize";

const db = new Sequelize("ulum_db", "root", "ulum99", {
  host: "172.16.1.10",
  dialect: "mariadb",
  port: "3306",
});

export default db;
