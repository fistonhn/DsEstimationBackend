"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateUserRegister = exports.validateUserLogin = exports.validateEmail = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const validateUserRegister = user => {
  const schema = _joi.default.object({
    name: _joi.default.string().min(3).max(30).required(),
    email: _joi.default.string().min(3).max(255).required().email(),
    password: _joi.default.string().min(6).max(255).required(),
    accessLevel: _joi.default.array().items(_joi.default.string().valid("readonly", "write", "edit", "delete", "admin")),
    readOnlyProjectIds: _joi.default.array().items(_joi.default.number()),
    writeProjectIds: _joi.default.array().items(_joi.default.number()),
    editProjectIds: _joi.default.array().items(_joi.default.number()),
    deleteProjectIds: _joi.default.array().items(_joi.default.number()),
    adminProjectIds: _joi.default.array().items(_joi.default.number())
  });
  return schema.validate(user);
};
exports.validateUserRegister = validateUserRegister;
const validateUserLogin = user => {
  const schema = _joi.default.object({
    email: _joi.default.string().min(3).max(255).required().email(),
    password: _joi.default.string().min(6).max(255).required()
  });
  return schema.validate(user);
};
exports.validateUserLogin = validateUserLogin;
const validateEmail = data => {
  const schema = _joi.default.object({
    email: _joi.default.string().min(3).required().email()
  });
  return schema.validate(data);
};
exports.validateEmail = validateEmail;