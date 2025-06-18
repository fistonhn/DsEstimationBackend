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
router.get("/unverified/all", _middlewares.verifyAccessToken, _middlewares.Role.isOwner, _controllers.EstimationController.getAllUnverifiedEstimations);

// approve an estimation
router.post("/create", _middlewares.verifyAccessToken, _middlewares.Validators.isEstimationCreateValid, _middlewares.Role.isOwner, _controllers.EstimationController.createEstimation);
router.patch("/:id/approve", _middlewares.verifyAccessToken, _middlewares.Role.isOwner, _middlewares.ValidateParams.isIdPresentAndValid, _controllers.EstimationController.approveEstimation);
router.patch("/:id/update", _middlewares.verifyAccessToken, _middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Role.isOwner, _controllers.EstimationController.updateEstimation);
router.delete("/:id/delete", _middlewares.verifyAccessToken, _middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Role.isOwner, _controllers.EstimationController.deleteEstimation);

// equipments
router.patch("/:id/add-equipment", _middlewares.verifyAccessToken, _middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Role.isOwner, _controllers.EstimationController.addEquipmentToEstimation);
router.patch("/:id/remove-equipment", _middlewares.verifyAccessToken, _middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Role.isOwner, _controllers.EstimationController.removeEquipmentFromEstimation);
router.patch("/:id/equipment/edit", _middlewares.verifyAccessToken, _middlewares.ValidateParams.isIdPresentAndValid, _controllers.EstimationController.editEstimationEquipment);

// materials
router.patch("/:id/material/add", _middlewares.verifyAccessToken, _middlewares.ValidateParams.isIdPresentAndValid, _controllers.EstimationController.addMaterialToEstimation);
router.patch("/:id/material/remove", _middlewares.verifyAccessToken, _middlewares.ValidateParams.isIdPresentAndValid, _controllers.EstimationController.removeMaterialFromEstimation);
router.patch("/:id/material/edit", _middlewares.verifyAccessToken, _middlewares.ValidateParams.isIdPresentAndValid,
// Validators.isEstimationEquipmentEditValid,
_controllers.EstimationController.editEstimationMaterials);

// labor
router.patch("/:id/labour/add", _middlewares.verifyAccessToken, _middlewares.ValidateParams.isIdPresentAndValid, _controllers.EstimationController.addLabourToEstimation);
router.patch("/:id/labour/remove", _middlewares.verifyAccessToken, _middlewares.ValidateParams.isIdPresentAndValid, _controllers.EstimationController.removeLabourFromEstimation);
router.patch("/:id/labour/edit", _middlewares.verifyAccessToken, _middlewares.ValidateParams.isIdPresentAndValid,
// Validators.isEstimationEquipmentEditValid,
_controllers.EstimationController.editLabourEstimation);

// subcontractors
router.patch("/:id/subcontractor/add", _middlewares.verifyAccessToken, _middlewares.ValidateParams.isIdPresentAndValid, _controllers.EstimationController.addSubcontractorToEstimation);
router.patch("/:id/subcontractor/remove", _middlewares.verifyAccessToken, _middlewares.ValidateParams.isIdPresentAndValid, _controllers.EstimationController.removeSubcontractorFromEstimation);
router.patch("/:id/subcontractor/edit", _middlewares.verifyAccessToken, _middlewares.ValidateParams.isIdPresentAndValid,
// Validators.isEstimationEquipmentEditValid,
_controllers.EstimationController.editSubcontractorEstimation);
var _default = exports.default = router;