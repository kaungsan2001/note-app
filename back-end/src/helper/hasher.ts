import bcrypt from "bcrypt";

const salt = 10;

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, salt);
};

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
