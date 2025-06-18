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
_controllers.UserEstimationController.getAllEstimations);
router.get("/:id", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isUserEstimationExists, _controllers.UserEstimationController.getEstimationById);
router.post("/create", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.Validators.isEstimationCreateValid, _controllers.UserEstimationController.createEstimation);
router.patch("/:id/update", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isUserEstimationExists, _controllers.UserEstimationController.updateEstimation);
router.delete("/:id/delete", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isUserEstimationExists, _controllers.UserEstimationController.deleteEstimation);
router.patch("/:id/duplicate", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _controllers.UserEstimationController.copyEstimation);

// equipments
router.patch("/:id/equipment/add", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isUserEstimationExists, _controllers.UserEstimationController.addEquipmentToEstimation);
router.patch("/:id/equipment/remove", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isUserEstimationExists, _controllers.UserEstimationController.removeEquipmentFromEstimation);
router.patch("/:id/equipment/edit", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isUserEstimationExists, _controllers.UserEstimationController.editEstimationEquipment);

// materials
router.patch("/:id/material/add", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isUserEstimationExists, _controllers.UserEstimationController.addMaterialToEstimation);
router.patch("/:id/material/remove", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isUserEstimationExists, _controllers.UserEstimationController.removeMaterialFromEstimation);
router.patch("/:id/material/edit", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isUserEstimationExists, _controllers.UserEstimationController.editEstimationMaterials);

// labor
router.patch("/:id/labour/add", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isUserEstimationExists, _controllers.UserEstimationController.addLabourToEstimation);
router.patch("/:id/labour/remove", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isUserEstimationExists, _controllers.UserEstimationController.removeLabourFromEstimation);
router.patch("/:id/labour/edit", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isUserEstimationExists, _controllers.UserEstimationController.editLabourEstimation);

// subcontractors
router.patch("/:id/subcontractor/add", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isUserEstimationExists, _controllers.UserEstimationController.addSubcontractorToEstimation);
router.patch("/:id/subcontractor/remove", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isUserEstimationExists, _controllers.UserEstimationController.removeSubcontractorFromEstimation);
router.patch("/:id/subcontractor/edit", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isUserEstimationExists, _controllers.UserEstimationController.editSubcontractorEstimation);
var _default = exports.default = router;