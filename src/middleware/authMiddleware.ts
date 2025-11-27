import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Middleware to check if the user is logged in
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get the authorization header from the request
  const authHeader = req.headers.authorization;

  // If no header, return 401 Unauthorized
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  // Extract token from header (format: "Bearer <token>")
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    // Attach the decoded user info to the request object
    // so controllers can access it later
    (req as any).user = decoded;

    // Call next() to continue to the next middleware or controller
    next();
  } catch (err) {
    // If token is invalid or expired, return 401 Unauthorized
    return res.status(401).json({ message: "Invalid token" });
  }
};
