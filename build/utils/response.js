"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onSuccess = exports.onError = void 0;
const onSuccess = (res, status, message, data) => {
  return res.status(status).json({
    status,
    message,
    data
  });
};
exports.onSuccess = onSuccess;
const onError = (res, status, error, data) => {
  return res.status(status).json({
    status,
    error,
    data
  });
};
exports.onError = onError;