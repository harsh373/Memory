import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.log("No authorization header");
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    console.log("Token missing");
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.log("JWT_SECRET not defined");
      return res.status(500).json({ message: "Server error" });
    }

    jwt.verify(token, secret);
    next();
  } catch (error) {
    console.log("Invalid token", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default requireAdmin;
