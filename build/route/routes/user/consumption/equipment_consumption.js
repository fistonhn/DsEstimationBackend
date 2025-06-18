"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _controllers = require("../../../../controllers");
var _middlewares = require("../../../../middlewares");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
// get all equipment consumption
router.get("/all", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_controllers.EquipmentConsumptionController.getAllEquipmentConsumption);

// get equipment consumption by id
router.get("/:id", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _controllers.EquipmentConsumptionController.getEquipmentConsumptionById);

// create equipment consumption
router.post("/create", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.Validators.isEquipmentConsumptionValid, _controllers.EquipmentConsumptionController.createEquipmentConsumption);

// update equipment consumption
router.patch("/:id/update", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _controllers.EquipmentConsumptionController.editEquipmentConsumption);
router.delete("/:id/delete", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _controllers.EquipmentConsumptionController.deleteEquipmentConsumption);
var _default = exports.default = router;