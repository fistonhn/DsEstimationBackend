"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const validateSupplier = supply => {
  const schema = _joi.default.object({
    name: _joi.default.string().required(),
    address: _joi.default.string(),
    price: _joi.default.number().required(),
    currency: _joi.default.string().required().default("RWF")
  });
  return schema.validate(supply);
};
var _default = exports.default = validateSupplier;