import jwt from "jsonwebtoken";
import mongoose from 'mongoose'



type ModelType = {
  createJwtToken: (username: string, email: string, _id: mongoose.Types.ObjectId) => void;
  decode: (token: string) => any;
  verify: (token: string) => JWTPayload;
};

export type JWTPayload = {
  username: string;
  email: string;
  _id: mongoose.Types.ObjectId
};

const JWTModel = {} as ModelType;
export default JWTModel;

JWTModel.createJwtToken = (username: string, email: string, _id: mongoose.Types.ObjectId) => {
  const payload: JWTPayload = {
    username: username,
    email: email,
    _id: _id
  };

  const option: jwt.SignOptions = {
    expiresIn: "60min",
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET as jwt.Secret, option);
  return token;
};

JWTModel.decode = (token: string) => {
  return jwt.decode(token);
};

//@ts-ignore
JWTModel.verify = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};
