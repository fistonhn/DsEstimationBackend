"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyAccessToken = exports.isNotVerified = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _models = require("../database/models");
var _response = require("../utils/response");
var _helpers = require("../helpers");
var _memoryCache = _interopRequireDefault(require("memory-cache"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const verifyAccessToken = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return (0, _response.onError)(res, 401, "Not Allowed");
  _jsonwebtoken.default.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, decod) => {
    if (error) {
      return (0, _response.onError)(res, 401, "Token is incorrect or expired");
    } else {
      req.user = decod.payload;
      return next();
      // const response = await cache.get(`accessToken-${decod.payload.id}`);
      // if (response) {
      //   req.user = decod.payload;
      //   return next();
      // } else {
      //   return onError(res, 401, "Session is expired, login again!");
      // }
    }
  });
};

// Check if user is verified or not function
exports.verifyAccessToken = verifyAccessToken;
const isNotVerified = async (req, res, next) => {
  try {
    const user = await _models.Users.findOne({
      where: {
        email: req.body.email
      }
    });
    if (!user) {
      return (0, _response.onError)(res, 400, "User doesn't exist! If you have been registered, Please check you email to verify your account!");
    } else if (user.isConfirmed) {
      return next();
    } else {
      return (0, _response.onError)(res, 401, "Your account has not been verified,Please check your email to Verify you email to continue!");
    }
  } catch (error) {
    return (0, _response.onError)(res, 500, "Internal server error");
  }
};
exports.isNotVerified = isNotVerified;