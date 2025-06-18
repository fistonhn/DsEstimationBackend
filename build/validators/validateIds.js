"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateSupplierIdParamas = exports.validateProjectIdParamas = exports.validateIdParamas = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const validateIdParamas = id => {
  const schema = _joi.default.number().required().error(new Error("Id is required and must be a number"));
  return schema.validate(id);
};
exports.validateIdParamas = validateIdParamas;
const validateProjectIdParamas = projectId => {
  const schema = _joi.default.number().required().error(new Error("ProjectId is required and must be a number"));
  return schema.validate(projectId);
};
exports.validateProjectIdParamas = validateProjectIdParamas;
const validateSupplierIdParamas = supplierId => {
  const schema = _joi.default.number().required().error(new Error("supplier is required"));
  return schema.validate(supplierId);
};
exports.validateSupplierIdParamas = validateSupplierIdParamas;