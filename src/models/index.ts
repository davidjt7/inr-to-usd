import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import sequelizeConfig from "../config/sequelize";
import { DB } from "../types/db";
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || "development";
const config = sequelizeConfig[env];
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
const db = {
  sequelize,
  Sequelize
};
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      (file.slice(-3) === ".js" || file.slice(-3) === ".ts")
    );
  })
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db as DB;
