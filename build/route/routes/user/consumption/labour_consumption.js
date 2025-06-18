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
// get all labour consumption
router.get("/all", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_controllers.LabourConsumptionController.getAllLabourConsumption);

// get labour consumption by id
router.get("/:id", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _controllers.LabourConsumptionController.getLabourConsumptionById);

// create labour consumption
router.post("/create", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.Validators.isLabourConsumptionValid, _controllers.LabourConsumptionController.createLabourConsumption);

// update labour consumption
router.patch("/:id/update", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.Validators.isLabourConsumptionValid, _controllers.LabourConsumptionController.editLabourConsumption);

// delete labour consumption
router.delete("/:id/delete", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _controllers.LabourConsumptionController.deleteLabourConsumption);
var _default = exports.default = router;