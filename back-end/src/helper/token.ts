import jwt, { type JwtPayload } from "jsonwebtoken";

export const generateToken = (id: number, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || "secret", {
    expiresIn: "30d",
  });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "secret");
  } catch (error) {
    return null;
  }
};
