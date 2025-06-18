"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const validateRole = role => {
  const schema = _joi.default.object({
    name: _joi.default.string().max(255).required(),
    // righs is an array of strings
    permissions: _joi.default.array().items(_joi.default.string().valid("read", "edit", "add", "delete", "admin")).required()
  });
  return schema.validate(role);
};
var _default = exports.default = validateRole;