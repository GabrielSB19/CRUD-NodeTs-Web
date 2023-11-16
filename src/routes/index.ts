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

  app.post("/groups", groupController.create);

  app.post("/groups/:idGroup/:idUser", groupController.addUsersToGroup);
  app.delete("/groups/:idGroup/:idUser", groupController.removeUsersFromGroup);

  app.get("/groups", groupController.getAll);
  app.get("/groups/:id", groupController.getOne);

  app.put("/groups/:id", groupController.update);

  app.delete("/groups/:id", groupController.delete);

  app.get("/groups/:id/users", userController.getUsersByGroup);
  app.get("/users/:id/groups", groupController.getGroupsByUser);
};

export default routes;
