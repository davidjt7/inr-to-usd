import cors from "cors";
import express from "express";
import router from "./routes";

const app = express();

app.set("port", process.env.PORT);
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

export default app;
