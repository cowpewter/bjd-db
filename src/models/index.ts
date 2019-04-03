import Sequelize from "sequelize";
import { initUser } from "./user";

const env = process.env.ENVIRONMENT || "dev";
const config = require("../config/database.js")[env];
const url = process.env.JAWSDB_MARIA_URL;

const sequelize = new Sequelize(url, config);

const db = {
  sequelize,
  Sequelize,
  User: initUser(sequelize),
};

Object.values(db).forEach((model: any) => {
  if (model.associate) {
    model.associate(db);
  }
});

export default db;
