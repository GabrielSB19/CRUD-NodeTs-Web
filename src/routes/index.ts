import { Express, Request, Response } from "express";
import userController from "../controllers/user.controller";
import groupController from "../controllers/group.controller";

const routes = (app: Express) => {
  app.post("/users", userController.create);
};
