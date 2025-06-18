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
// get all Estimation consumption
router.get("/all", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_controllers.EstimationConsumptionController.getAllEstimationConsumption);

// get estimation consumption by id
router.get("/:id", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _controllers.EstimationConsumptionController.getEstimationConsumption);

// create estimation consumption
router.post("/create", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.Validators.isEstimationConsumptionValid, _controllers.EstimationConsumptionController.createEstimationConsumption);

// update estimation consumption
router.patch("/:id/update", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _controllers.EstimationConsumptionController.editEstimationConsumption);
router.delete("/:id/delete", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _controllers.EstimationConsumptionController.deleteEstimationConsumption);

// get estimation consumption by date
router.patch("/date", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.Validators.isfromAndEndDateValid, _controllers.EstimationConsumptionController.getEstimationConsumptionByDate);
router.patch("/:estimationId/date", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.Validators.isfromAndEndDateValid, _controllers.EstimationConsumptionController.getOneEstimationConsumptionByDate);
var _default = exports.default = router;