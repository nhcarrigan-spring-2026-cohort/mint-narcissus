import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || "jwt_secret",
    {
      expiresIn: process.env.JWT_EXPIRE || "1d",
    },
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(
      token,
      process.env.JWT_SECRET || "jwt_secret",
    );
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
