"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../config/sequelize"));
const basename = path_1.default.basename(module.filename);
const env = process.env.NODE_ENV || "development";
const config = sequelize_2.default[env];
const sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, config);
const db = {
    sequelize,
    Sequelize: sequelize_1.Sequelize
};
fs_1.default.readdirSync(__dirname)
    .filter(file => {
    return (file.indexOf(".") !== 0 &&
        file !== basename &&
        (file.slice(-3) === ".js" || file.slice(-3) === ".ts"));
})
    .forEach(file => {
    const model = sequelize.import(path_1.default.join(__dirname, file));
    db[model.name] = model;
});
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
exports.default = db;
//# sourceMappingURL=index.js.map