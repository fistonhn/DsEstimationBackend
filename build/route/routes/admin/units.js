"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _controllers = require("../../../controllers");
var _middlewares = require("../../../middlewares");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
// routes

router.post("/create", _middlewares.verifyAccessToken, _middlewares.Role.isOwner, _middlewares.Validators.isUnitValid, _controllers.UnitsController.createUnit);
router.patch("/:id/update", _middlewares.verifyAccessToken, _middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Role.isOwner, _middlewares.Exists.isUnitExists, _controllers.UnitsController.updateUnit);
router.delete("/:id/delete", _middlewares.verifyAccessToken, _middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Role.isOwner, _middlewares.Exists.isUnitExists, _controllers.UnitsController.deleteUnit);

// get all unverified units
router.get("/unverified/all", _middlewares.verifyAccessToken, _middlewares.Role.isOwner, _controllers.UnitsController.getAllUnapprovedUnits);
// approve an unit
router.patch("/:id/approve", _middlewares.verifyAccessToken, _middlewares.Role.isOwner, _middlewares.ValidateParams.isIdPresentAndValid, _controllers.UnitsController.approveUnit);
var _default = exports.default = router;