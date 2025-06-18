"use strict";

var _app = _interopRequireDefault(require("./app"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Port = process.env.PORT || 5000;
_app.default.listen(Port, () => {
  console.log(`Server is listening on port ${Port}`);
});