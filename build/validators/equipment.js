"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const validateEquipment = equipment => {
  const schema = _joi.default.object({
    name: _joi.default.string().required(),
    caveragePerUnit: _joi.default.number().allow(null),
    unit: _joi.default.string().required(),
    hireRatePrice: _joi.default.number().required(),
    number: _joi.default.number().default(1),
    supplierId: _joi.default.number().allow(null),
    currency: _joi.default.string().required().default("RWF")
  });
  return schema.validate(equipment);
};
var _default = exports.default = validateEquipment;