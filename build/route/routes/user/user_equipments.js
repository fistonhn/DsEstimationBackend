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
router.get("/all", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_controllers.UserEquipmentController.getAllEquipments);
router.get("/:id", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isUserEquipmentExists, _controllers.UserEquipmentController.getEquipmentById);
router.post("/create", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.Validators.isEquipmentValid, _controllers.UserEquipmentController.createEquipment);
router.patch("/:id/update", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isUserEquipmentExists, _controllers.UserEquipmentController.updateEquipment);
router.delete("/:id/delete", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isUserEquipmentExists, _controllers.UserEquipmentController.deleteEquipment);
var _default = exports.default = router;