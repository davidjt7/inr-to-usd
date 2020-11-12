"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Results = void 0;
const sequelize_1 = require("sequelize");
class Results extends sequelize_1.Model {
}
exports.Results = Results;
exports.default = (sequelize, dataTypes) => {
    Results.init({
        ip: dataTypes.STRING,
        method: dataTypes.STRING,
        originalUrl: dataTypes.STRING,
        inrArray: dataTypes.ARRAY(dataTypes.FLOAT),
        usdArray: dataTypes.ARRAY(dataTypes.FLOAT),
        date: dataTypes.DATE,
    }, {
        sequelize,
        tableName: "Results"
    });
    return Results;
};
//# sourceMappingURL=result.js.map