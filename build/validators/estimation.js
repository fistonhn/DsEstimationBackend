"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateCreateEstimation = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const validateCreateEstimation = estimation => {
  const schema = _joi.default.object({
    name: _joi.default.string().max(255).required().error(new Error("Estimation Name is required")),
    estimationUnit: _joi.default.string().required().error(new Error("Estimation Unit is required")),
    estimationQuantity: _joi.default.number().required().error(new Error("Estimation Quantity is required")),
    categoryId: _joi.default.number().required().error(new Error("Category is required")),
    subcategoryId: _joi.default.number()
  });
  return schema.validate(estimation);
};
exports.validateCreateEstimation = validateCreateEstimation;