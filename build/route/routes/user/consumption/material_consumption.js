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
// get all material consumption
router.get("/all", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_controllers.MaterialConsumptionController.getAllMaterialConsumption);

// get material consumption by id
router.get("/:id", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _controllers.MaterialConsumptionController.getMaterialConsumptionById);

// create material consumption
router.post("/create", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.Validators.isMaterialConsumptionValid, _controllers.MaterialConsumptionController.createMaterialConsumption);

// update material consumption
router.patch("/:id/update", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _controllers.MaterialConsumptionController.editMaterialConsumption);

// delete material consumption
router.delete("/:id/delete", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _controllers.MaterialConsumptionController.deleteMaterialConsumption);
var _default = exports.default = router;