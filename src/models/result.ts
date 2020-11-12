"use strict";
import { DataTypes, Model, Sequelize } from "sequelize";

export class Results extends Model {
  public ip!: string;
  public method!: string;
  public originalUrl!: string;
  public inrArray!: number[];
  public usdArray!: number[];
  public date!: Date;
}
export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  Results.init(
    {
      ip: dataTypes.STRING,
      method: dataTypes.STRING,
      originalUrl: dataTypes.STRING,
      inrArray: dataTypes.ARRAY(dataTypes.FLOAT),
      usdArray: dataTypes.ARRAY(dataTypes.FLOAT),
      date: dataTypes.DATE,
    },
    {
      sequelize,
      tableName: "Results"
    }
  );
  return Results;
};
