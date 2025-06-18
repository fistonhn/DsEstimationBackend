"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const validateProjectAddons = addons => {
  const schema = _joi.default.object({
    reasons: _joi.default.string().min(3).required().error(new Error("Addons reason is required")),
    appliedTo: _joi.default.string().min(3).required().error(new Error("where addons will applied is required")),
    amount: _joi.default.number().required().error(new Error("Addons percentage is required"))
  });
  return schema.validate(addons);
};
var _default = exports.default = validateProjectAddons;