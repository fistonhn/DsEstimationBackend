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

// equipment

router.get("/:projectId/equipment/all", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _controllers.EquipmentResourceController.getAllEquipmentResoucesOfProject);
router.get("/:projectId/equipment/:id", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _middlewares.ValidateParams.isIdPresentAndValid, _controllers.EquipmentResourceController.getOneEquipmentResoucesOfProject);
router.post("/:projectId/equipment/add", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _controllers.EquipmentResourceController.addEquipmentResoucesToProject);
router.patch("/:projectId/equipment/remove", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _controllers.EquipmentResourceController.removeEquipmentResourceFromProject);

// material
router.get("/:projectId/material/all", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _controllers.MaterialResourceController.getAllMaterialResourceOfProject);
router.get("/:projectId/material/:id", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _middlewares.ValidateParams.isIdPresentAndValid, _controllers.MaterialResourceController.getOneMaterialResourceOfProject);
router.post("/:projectId/material/add", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _controllers.MaterialResourceController.addMaterialResouceToProject);
router.patch("/:projectId/material/remove", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _controllers.MaterialResourceController.removeMaterialResourceFromProject);

// labour
router.get("/:projectId/labour/all", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _controllers.LabourResourceController.getAllLabourResourceOfProject);
router.get("/:projectId/labour/:id", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _middlewares.ValidateParams.isIdPresentAndValid, _controllers.LabourResourceController.getOneLabourResourceOfProject);
router.post("/:projectId/labour/add", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _controllers.LabourResourceController.addLabourResouceToProject);
router.patch("/:projectId/labour/remove", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _controllers.LabourResourceController.removeLabourResourceFromProject);

// sub contractors
router.get("/:projectId/subcontractors/all", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _controllers.SubContractorsResourceController.getAllSubcontractorResourceOfProject);
router.get("/:projectId/subcontractors/:id", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _middlewares.ValidateParams.isIdPresentAndValid, _controllers.SubContractorsResourceController.getOneSubcontractorResourceOfProject);
router.post("/:projectId/subcontractors/add", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _controllers.SubContractorsResourceController.addSubcontractorResouceToProject);
router.patch("/:projectId/subcontractors/remove", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _controllers.SubContractorsResourceController.removeSubcontractorResourceFromProject);
var _default = exports.default = router;