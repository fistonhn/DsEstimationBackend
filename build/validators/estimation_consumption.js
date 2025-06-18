"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const validateEstimationConsumption = estimation => {
  const schema = _joi.default.object({
    executedQuantity: _joi.default.number().required(),
    executedDate: _joi.default.date(),
    estimationId: _joi.default.number().required()
  });
  return schema.validate(estimation);
};
var _default = exports.default = validateEstimationConsumption;