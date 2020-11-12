import cors from "cors";
import app from "./app";
import models from "./models";
import logger from "./utils/logger";

app.use(cors());
const server = app.listen(
  app.get("port"), async () => {
    await models.sequelize.sync();
    logger.info(`forex up at ${process.env.HOST}`);
  });

export default server;
