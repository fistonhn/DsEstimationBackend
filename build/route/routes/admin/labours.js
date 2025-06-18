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

router.post("/create", _middlewares.verifyAccessToken, _middlewares.Role.isOwner, _controllers.LabourController.createLabour);
router.patch("/:id/update", _middlewares.verifyAccessToken, _middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Role.isOwner, _controllers.LabourController.updateLabour);
router.delete("/:id/delete", _middlewares.verifyAccessToken, _middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Role.isOwner, _controllers.LabourController.deleteLabour);

// get all unverified labour
router.get("/unverified/all", _middlewares.verifyAccessToken, _middlewares.Role.isOwner, _controllers.LabourController.getAllUnapprovedLabour);
// approve an labour
router.patch("/:id/approve", _middlewares.verifyAccessToken, _middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Role.isOwner, _controllers.LabourController.approveLabour);
var _default = exports.default = router;