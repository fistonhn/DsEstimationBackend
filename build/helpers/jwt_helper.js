"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signRefreshToken = exports.signNewAccessToken = exports.signAccessToken = exports.generateTokenVerify = exports.generateTokenCreateStaff = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _memoryCache = _interopRequireDefault(require("memory-cache"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable linebreak-style */

const signAccessToken = async userInfo => {
  try {
    const payload = {
      id: userInfo?.id,
      role: userInfo?.role,
      name: userInfo?.name,
      company: userInfo?.company,
      managerId: userInfo?.managerId
    };
    const token = _jsonwebtoken.default.sign({
      payload
    }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1y"
    });
    await _memoryCache.default.put(`accessToken-${payload.id.toString()}`, token.toString());
    return token;
  } catch (error) {
    return error;
  }
};
exports.signAccessToken = signAccessToken;
const signNewAccessToken = async userInfo => {
  try {
    const payload = {
      id: userInfo?.id,
      role: userInfo?.role,
      name: userInfo?.name,
      company: userInfo?.company,
      managerId: userInfo?.managerId
    };
    const token = _jsonwebtoken.default.sign({
      payload
    }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h"
    });
    await _memoryCache.default.put(`accessToken-${payload.id.toString()}`, token.toString());
    return token;
  } catch (error) {
    return error;
  }
};
exports.signNewAccessToken = signNewAccessToken;
const signRefreshToken = async userInfo => {
  try {
    const payload = {
      id: userInfo.id,
      role: userInfo?.role,
      name: userInfo?.name,
      company: userInfo?.company,
      managerId: userInfo?.managerId
    };
    const token = _jsonwebtoken.default.sign({
      payload
    }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1y"
    });
    await _memoryCache.default.put(`refreshToken-${payload.id.toString()}`, token.toString());
    return token;
  } catch (error) {
    return error;
  }
};

// generate token for verify email
exports.signRefreshToken = signRefreshToken;
const generateTokenVerify = userinfo => {
  try {
    const payload = {
      name: userinfo.name,
      email: userinfo.email,
      password: userinfo.password
    };
    const token = _jsonwebtoken.default.sign({
      payload: payload
    }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "24h"
    });
    return token;
  } catch (error) {
    return "Internal server error";
  }
};

// generate token for creating staff
exports.generateTokenVerify = generateTokenVerify;
const generateTokenCreateStaff = userinfo => {
  try {
    const payload = {
      name: userinfo.name,
      email: userinfo.email,
      password: userinfo.password,
      company: userinfo?.company,
      managerId: userinfo?.managerId
    };
    const token = _jsonwebtoken.default.sign({
      payload: payload
    }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "24h"
    });
    return token;
  } catch (error) {
    return "Internal server error";
  }
};
exports.generateTokenCreateStaff = generateTokenCreateStaff;