import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  console.log(req.headers)

  // Check if Authorization header exists and contains Bearer token
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized, token missing or malformed" });
  }

  // Extract the token from Authorization header
  const token = authorization.split(" ")[1];

  try {
    // Verify the token
    const payload = verifyToken(token);
    console.log("Token received --- >",token)
    // Attach payload to the request object
    // @ts-ignore
    req.user = payload;

    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Unauthorized, invalid token" });
  }
};

export default isAuthenticated;
