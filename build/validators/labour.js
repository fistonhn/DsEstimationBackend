"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const validateLabour = labour => {
  const schema = _joi.default.object({
    name: _joi.default.string().required(),
    number: _joi.default.number().default(1),
    unit: _joi.default.string().required(),
    caveragePerUnit: _joi.default.number().allow(null),
    wages: _joi.default.number().required(),
    currency: _joi.default.string().required().default("RWF")
  });
  return schema.validate(labour);
};
var _default = exports.default = validateLabour;