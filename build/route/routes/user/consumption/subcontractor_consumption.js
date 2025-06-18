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
// get all subcontractor consumption
router.get("/all", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_controllers.SubContractorsConsumptionController.getAllSubcontractorConsumption);

// get subcontractor consumption by id
router.get(":id", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _controllers.SubContractorsConsumptionController.getSubcontractorConsumptionById);

// create subcontractor consumption
router.post("/create", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.Validators.isSubcontractorConsumptionValid, _controllers.SubContractorsConsumptionController.createSubcontractorConsumption);

// update subcontractor consumption
router.patch("/:id/update", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _controllers.SubContractorsConsumptionController.editSubcontractorConsumption);

// delete subcontractor consumption
router.delete("/:id/delete", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _controllers.SubContractorsConsumptionController.deleteSubcontractorConsumption);
var _default = exports.default = router;