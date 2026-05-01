import jwt from "jsonwebtoken";

type ModelType = {
  createJwtToken: (username: string, email: string) => void;
  decode: (token: string) => any;
  verify: (token: string) => jwt.JwtPayload | string;
};

const JWTModel = {} as ModelType;
export default JWTModel;

JWTModel.createJwtToken = (username: string, email: string) => {
  const payload = {
    username: username,
    email: email,
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

JWTModel.verify = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};
