import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export const adminLogin = (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("Email or password missing");
    return res.status(400).json({ message: "Invalid credentials" });
  }

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    console.log("Admin login failed");
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.log("JWT_SECRET not set");
    return res.status(500).json({ message: "Server error" });
  }

  const token = jwt.sign(
    { role: "admin" },
    secret,
    { expiresIn: "24h" }
  );

  return res.json({ token });
};
