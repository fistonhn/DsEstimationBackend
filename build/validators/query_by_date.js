"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const validatefromAndEndDate = date => {
  const schema = _joi.default.object({
    from: _joi.default.date().required(),
    end: _joi.default.date().required()
  });
  return schema.validate(date);
};
var _default = exports.default = validatefromAndEndDate;