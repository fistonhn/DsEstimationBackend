"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const validateEquipmentConsumption = equipment => {
  const schema = _joi.default.object({
    name: _joi.default.string(),
    unit: _joi.default.string(),
    estimationId: _joi.default.number(),
    consumedQuantity: _joi.default.number().required(),
    consumedPrice: _joi.default.number().required(),
    consumedDate: _joi.default.date().required(),
    equipmentId: _joi.default.number()
  });
  return schema.validate(equipment);
};
var _default = exports.default = validateEquipmentConsumption;