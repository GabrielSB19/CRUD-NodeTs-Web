import { Request, Response } from "express";
import groupService from "../services/group.service";
import { GroupDocument } from "../models/group.model";
import userService from "../services/user.service";

class GroupController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const groupExis = await groupService.findByName(req.body.name);
      if (groupExis) {
        return res.status(400).json({ message: "Group already exists" });
      }
      const groupRecord = await groupService.create(req.body);
      return res.status(201).json(groupRecord);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const groupRecords = await groupService.findAll();
      return res.status(200).json(groupRecords);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  public async getOne(req: Request, res: Response): Promise<Response> {
    try {
      const groupRecord = await groupService.findOne(req.params.id);
      if (!groupRecord) {
        return res.status(404).json({ message: "Group not found" });
      }
      return res.status(200).json(groupRecord);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const groupRecord = await groupService.update(req.params.id, req.body);
      if (!groupRecord) {
        return res.status(404).json({ message: "Group not found" });
      }
      return res.status(200).json(groupRecord);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const groupRecord = await groupService.delete(req.params.id);
      if (!groupRecord) {
        return res.status(404).json({ message: "Group not found" });
      }
      return res.status(200).json(groupRecord);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  public async getGroupsByUser(req: Request, res: Response): Promise<Response> {
    try {
      const groupRecords = await groupService.getGroupsByUserName(
        req.body.name
      );
      if (!groupRecords) {
        return res.status(404).json({ message: "Group not found" });
      }
      return res.status(200).json(groupRecords);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  public async addUsersToGroup(req: Request, res: Response): Promise<Response> {
    try {
      const user = await userService.findOne(req.params.idUser);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const groupRecord = await groupService.addUserToGroup(
        req.params.idGroup,
        req.params.idUser
      );

      return res.status(200).json(groupRecord);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  public async removeUsersFromGroup(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const user = await userService.findOne(req.params.idUser);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const groupRecord = await groupService.removeUserFromGroup(
        req.params.idGroup,
        req.params.idUser
      );

      return res.status(200).json(groupRecord);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
}

export default new GroupController();
