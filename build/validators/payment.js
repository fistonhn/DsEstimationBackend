"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const paymentPlanValidation = plan => {
  const schema = _joi.default.object({
    name: _joi.default.string().required(),
    amount: _joi.default.number().required(),
    interval: _joi.default.string().valid("yearly", "every 6 months", "monthly", "quarterly", "weekly", "daily", "hourly").required(),
    currency: _joi.default.string().required().valid("USD", "RWF")
  });
  return schema.validate(plan);
};
var _default = exports.default = paymentPlanValidation;