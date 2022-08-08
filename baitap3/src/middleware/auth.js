import jwt from "jsonwebtoken";
export const auth = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    const error = new Error(
      "Token is required,please log in to get access token"
    );
    error.statusCode = 401;
    return next(error);
  }
  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN);
    req.staff = decoded;
  } catch (error) {
    console.error("name error:" + error.name);
    return next(error);
  }
  next();
};

export const verifyIsRoot = async (req, res, next) => {
  try {
    if (!req.staff) {
      const error = new Error(
        "Something went wrong while verifying the root accessToken"
      );
      error.statusCode = 401;
      return next(error);
    }
    console.log(typeof req.staff.isRoot);
    if (!req.staff.isRoot) {
      const error = new Error("User is not a root");
      error.statusCode = 403;
      return next(error);
    }
    next();
  } catch (error) {
    console.error("name error:" + error.name);
    return next(error);
  }
};
