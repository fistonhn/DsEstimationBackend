"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const validateSubContractor = subcontractor => {
  const schema = _joi.default.object({
    name: _joi.default.string().required(),
    unit: _joi.default.string().required(),
    quantity: _joi.default.number().allow(null),
    price: _joi.default.number().required(),
    currency: _joi.default.string().required().default("RWF")
  });
  return schema.validate(subcontractor);
};
var _default = exports.default = validateSubContractor;