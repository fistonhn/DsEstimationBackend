"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const validateUnit = unit => {
  const schema = _joi.default.object({
    symbol: _joi.default.string().required(),
    meaning: _joi.default.string().required()
  });
  return schema.validate(unit);
};
var _default = exports.default = validateUnit;