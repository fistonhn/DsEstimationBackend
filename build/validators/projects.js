"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const validateProject = project => {
  const schema = _joi.default.object({
    name: _joi.default.string().min(3).required(),
    description: _joi.default.string().allow(''),
    client: _joi.default.string().min(3).allow(''),
    contractor: _joi.default.string().min(3).allow(''),
    consultant: _joi.default.string().min(3).allow(''),
    startDate: _joi.default.date().allow(null).allow(''),
    endDate: _joi.default.date().allow(null),
    status: _joi.default.string().valid("not started", "on progress", "suspended", "canceled", "completed"),
    currencyCode: _joi.default.string().default("RWF"),
    currencyValue: _joi.default.number().default(1),
    vat: _joi.default.number().default(0),
    category: _joi.default.string().allow(''),
    groupId: _joi.default.number()
  });
  return schema.validate(project);
};
var _default = exports.default = validateProject;