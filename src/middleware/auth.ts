import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserDocument } from "../models/user.model";

dotenv.config();

interface JwtPayload {
  email: string;
  role: string;
  timeExp: number;
}

const secret = process.env.JWT_SECRET || "";
const currentTime = Math.floor(Date.now() / 1000);

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!isTokenValid(token)) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, secret);
    req.body.logged = decoded;
    console.log("Decode Token" + req.body.logged);
    next();
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const isTokenValid = (token: string): boolean => {
  try {
    const decoded = jwt.verify(token, secret) as { timeExp: number };
    return decoded.timeExp > currentTime;
  } catch (error) {
    return false;
  }
};

const generateToken = (user: UserDocument) => {
  console.log("Generate Token");
  try {
    const token = jwt.sign(
      { email: user.email, role: user.role, timeExp: currentTime + 3600 },
      secret,
      { expiresIn: "2h" }
    );
    return token;
  } catch (error) {
    throw error;
  }
};

const hasRole =
  (role: string) => (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Not logged in" });
    }
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: err.message });
      }
      if (!isJwtPayload(decoded) || role !== decoded.role) {
        return res.status(403).json({
          message:
            "You do not have the authorization and permissions to access this resource.",
        });
      }

      next();
    });
  };

const isJwtPayload = (decoded: any): decoded is JwtPayload => {
  return decoded && typeof decoded === "object" && "role" in decoded;
};

const autServices = {
  auth,
  generateToken,
  hasRole,
};

export default autServices;
