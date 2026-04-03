import jwt from "jsonwebtoken";

const JWTModel = {};
export default JWTModel;

JWTModel.createJwtToken = (username, email) => {
  const payload = {
    username: username,
    email: email,
  };

  const option = {
    expiresIn: "60min",
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, option);
  return token;
};

JWTModel.decode = (token) => {
  return jwt.decode(token);
};

JWTModel.verify = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
