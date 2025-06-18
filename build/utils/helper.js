"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.returnNumber = void 0;
const returnNumber = num => {
  if (isNaN(num)) {
    return 0;
  }
  return num;
};
exports.returnNumber = returnNumber;