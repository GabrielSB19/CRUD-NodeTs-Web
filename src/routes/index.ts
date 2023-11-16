import { Express, Request, Response } from "express";
import userController from "../controllers/user.controller";
import groupController from "../controllers/group.controller";
import autServices from "../middleware/auth";

const routes = (app: Express) => {
  app.post("/login", userController.login);
  app.post(
    "/users",
    autServices.auth,
    autServices.hasRole("admin"),
    userController.create
  );

  app.get("/users", userController.findAll);
  app.get("/users/:id", userController.findOne);

  app.put("/users/:id", userController.update);

  app.delete("/users/:id", userController.delete);
};

export default routes;
