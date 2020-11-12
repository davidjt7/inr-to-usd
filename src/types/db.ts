import { Sequelize } from "sequelize/types";
export interface DB {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  Results;
}
