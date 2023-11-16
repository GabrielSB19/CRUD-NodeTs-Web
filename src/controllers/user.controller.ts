import { Request, Response } from "express";
import userService from "../services/user.service";
import authServices from "../middleware/auth";
import { UserDocument } from "../models/user.model";
import bcrypt from "bcrypt";

class UserController {
  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const user: UserDocument | null = await userService.findByEmail(
        req.body.email
      );
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const validPassword: boolean = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = authServices.generateToken(user);

      return res.status(200).json({ email: user.email, token: token });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const userExists = await userService.findByEmail(req.body.email);
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const userRecord = await userService.create(req.body);
      return res.status(201).json(userRecord);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  public async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const userRecords = await userService.findAll();
      return res.status(200).json(userRecords);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  public async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const userRecord = await userService.findOne(req.params.id);
      if (!userRecord) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(userRecord);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const userRecord = await userService.update(req.params.id, req.body);
      if (!userRecord) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(userRecord);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const userRecord = await userService.delete(req.params.id);
      if (!userRecord) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(userRecord);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  public async getUsersByGroup(req: Request, res: Response): Promise<Response> {
    try {
      const userRecords = await userService.getUsersByGroup(req.params.id);
      return res.status(200).json(userRecords);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
}

export default new UserController();
