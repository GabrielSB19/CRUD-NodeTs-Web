import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserDocument } from "../models/user.model";

dotenv.config();

// Interfaz que define la estructura del payload del token JWT
interface JwtPayload {
  email: string;
  role: string;
  timeExp: number;
}

// Obtención del secreto para firmar y verificar tokens JWT desde las variables de entorno
const secret = process.env.JWT_SECRET || "";
// Tiempo actual en segundos
const currentTime = Math.floor(Date.now() / 1000);

/**
 * Middleware de autenticación que verifica la validez de un token JWT en las cabeceras de la solicitud.
 * Agrega el payload del token descifrado a la propiedad `logged` del cuerpo de la solicitud.
 * @param req - Objeto de solicitud.
 * @param res - Objeto de respuesta.
 * @param next - Función para pasar la solicitud al siguiente middleware.
 */
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
    next();
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

/**
 * Verifica la validez de un token JWT.
 * @param token - Token JWT a verificar.
 * @returns boolean - `true` si el token es válido, `false` de lo contrario.
 */
const isTokenValid = (token: string): boolean => {
  try {
    const decoded = jwt.verify(token, secret) as { timeExp: number };
    return decoded.timeExp > currentTime;
  } catch (error) {
    return false;
  }
};

/**
 * Genera un nuevo token JWT basado en la información del usuario.
 * @param user - Documento del usuario.
 * @returns string - Token JWT generado.
 * @throws Error si hay un problema al generar el token.
 */
const generateToken = (user: UserDocument) => {
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

/**
 * Middleware de autorización que verifica si el usuario tiene el rol requerido.
 * @param role - Rol requerido para acceder al recurso.
 * @returns Middleware - Middleware de autorización.
 */
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

/**
 * Verifica si un objeto es un payload válido de un token JWT.
 * @param decoded - Objeto decodificado del token JWT.
 * @returns boolean - `true` si es un payload válido, `false` de lo contrario.
 */
const isJwtPayload = (decoded: any): decoded is JwtPayload => {
  return decoded && typeof decoded === "object" && "role" in decoded;
};

const autServices = {
  auth,
  generateToken,
  hasRole,
};

export default autServices;
