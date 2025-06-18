"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _response = require("../utils/response");
var _validators = require("../validators");
class ValidateParams {
  static async isIdPresentAndValid(req, res, next) {
    const {
      error
    } = (0, _validators.validateIdParamas)(req.params.id);
    if (error) {
      return (0, _response.onError)(res, 400, error.message);
    }
    next();
  }
  static async isProjectIdPresentAndValid(req, res, next) {
    const {
      error
    } = (0, _validators.validateProjectIdParamas)(req.params.projectId);
    if (error) {
      return (0, _response.onError)(res, 400, error.message);
    }
    next();
  }
}
var _default = exports.default = ValidateParams;