"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const validateCurrency = currency => {
  const schema = _joi.default.object({
    name: _joi.default.string().max(255).required(),
    code: _joi.default.string().max(255).required(),
    value: _joi.default.number().required()
  });
  return schema.validate(currency);
};
var _default = exports.default = validateCurrency;