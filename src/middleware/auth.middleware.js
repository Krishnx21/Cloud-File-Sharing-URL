// 1. Reads token from Authorization: Bearer <token>
// 2. Also checks cookies: accessToken or token
// 3. Verifies token with JWT_SECRET
// 4. Gets user id from token
// 5. Finds user in MongoDB
// 6. Removes password from user data
// 7. Stores user in req.user
// 8. Allows request to continue with next()

import jwt from "jsonwebtoken";
import { User } from "../modules/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getTokenFromRequest = (req) => {
  const authHeader = req.headers.authorization || "";
  const bearerToken = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  return (
    bearerToken ||
    req.cookies?.accessToken ||
    req.cookies?.token ||
    null
  );
};

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = getTokenFromRequest(req);

  if (!token) {
    throw new ApiError(401, "Unauthorized: No token provided");
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
  } catch (error) {
    throw new ApiError(401, "Unauthorized: Invalid token");
  }

  const userId = decodedToken?._id || decodedToken?.id;
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new ApiError(401, "Unauthorized: User not found");
  }

  req.user = user;
  next();
});

export { verifyJWT };
