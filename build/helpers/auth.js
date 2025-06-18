"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyLink = exports.encryptPassword = void 0;
var _dotenv = require("dotenv");
var _jsonwebtoken = require("jsonwebtoken");
var _bcryptjs = require("bcryptjs");
(0, _dotenv.config)();
const encryptPassword = async password => {
  const salt = await (0, _bcryptjs.genSalt)(12);
  const hashed = await (0, _bcryptjs.hash)(password, salt);
  return hashed;
};
exports.encryptPassword = encryptPassword;
const verifyLink = (token, secret) => {
  try {
    const data = (0, _jsonwebtoken.verify)(token, secret);
    return data;
  } catch (error) {
    return "Internal Server Error";
  }
};
exports.verifyLink = verifyLink;