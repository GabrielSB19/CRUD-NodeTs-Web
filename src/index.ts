import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { db } from "./config/connect";
import routes from "./routes";

dotenv.config();
const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routes(app);

const port: number = parseInt(process.env.PORT || "8080");

db.then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
