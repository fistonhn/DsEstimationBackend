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
_controllers.UserProjectController.getAllProjects);
router.get("/status", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_controllers.UserProjectController.getProjectByStatus);
router.get("/templates/all", _middlewares.verifyAccessToken, _controllers.UserProjectController.getAllProjectsTemplates);
router.get("/:id", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isProjectExists, _middlewares.Role.canReadProject, _controllers.UserProjectController.getProjectById);
router.post("/create", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.Validators.isProjectInputValid, _controllers.UserProjectController.createProject);
router.patch("/:id/update", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isProjectExists, _middlewares.Exists.isProjectApproved, _controllers.UserProjectController.editProject);
router.patch("/:id/approve", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isProjectExists, _controllers.UserProjectController.approveProject);
router.patch("/:id/duplicate", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isProjectExists, _controllers.UserProjectController.copyProjectData);
router.patch("/:id/template/create", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isProjectExists, _controllers.UserProjectController.createProjectFromTemplate);
router.patch("/move/estimation/:id/to-another-project", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _controllers.UserProjectController.copyEstimationFromProjectToAnother);
router.delete("/:id/delete", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isProjectExists, _controllers.UserProjectController.deleteProject);
router.get("/:projectId/estimation/:id", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _middlewares.ValidateParams.isIdPresentAndValid, _controllers.UserProjectController.getProjectEstimationById);
router.patch("/:projectId/estimation/:id/update", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isProjectAlreadyApproved, _middlewares.Exists.isProjectExistsWithEstimation, _middlewares.Exists.isUserEstimationExists, _controllers.UserProjectController.updateEstimation);
router.patch("/:projectId/estimation/:id/equipment/add", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isProjectAlreadyApproved, _middlewares.Exists.isProjectExistsWithEstimation, _controllers.UserProjectController.addEquipmentToProjectEstimation);
router.patch("/:projectId/estimation/:id/equipment/remove", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isProjectAlreadyApproved, _middlewares.Exists.isProjectExistsWithEstimation, _controllers.UserProjectController.removeEquipmentFromProjectEstimation);
router.patch("/:projectId/activity/add", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _middlewares.Exists.isProjectAlreadyApproved, _controllers.UserProjectController.addProjectActivity);
router.patch("/:projectId/activity/remove", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _middlewares.Exists.isProjectAlreadyApproved, _controllers.UserProjectController.removeActivityFromProject);
router.patch("/:projectId/estimation/add", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _middlewares.Exists.isProjectAlreadyApproved, _controllers.UserProjectController.addEstimationToProject);
router.patch("/:projectId/estimation/remove", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _middlewares.Exists.isProjectAlreadyApproved, _controllers.UserProjectController.removeEstimationFromProject);

// equipments
router.patch("/:projectId/estimation/:id/equipment/add", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isProjectAlreadyApproved, _middlewares.Exists.isUserEstimationExists, _controllers.UserProjectController.addEquipmentToProjectEstimation);
router.patch("/:projectId/estimation/:id/equipment/remove", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isProjectAlreadyApproved, _middlewares.Exists.isUserEstimationExists, _controllers.UserProjectController.removeEquipmentFromProjectEstimation);
router.patch("/:projectId/estimation/:id/equipment/edit", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isProjectAlreadyApproved, _middlewares.Exists.isUserEstimationExists, _controllers.UserProjectController.editProjectEstimationEquipment);

// materials
router.patch("/:projectId/estimation/:id/material/add", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isProjectAlreadyApproved, _middlewares.Exists.isUserEstimationExists, _controllers.UserProjectController.addMaterialToProjectEstimation);
router.patch("/:projectId/estimation/:id/material/remove", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isProjectAlreadyApproved, _middlewares.Exists.isUserEstimationExists, _controllers.UserProjectController.removeMaterialFromProjectEstimation);
router.patch("/:projectId/estimation/:id/material/edit", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isProjectAlreadyApproved, _middlewares.Exists.isUserEstimationExists, _controllers.UserProjectController.editProjectEstimationMaterials);

// labor
router.patch("/:projectId/estimation/:id/labour/add", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isProjectAlreadyApproved, _middlewares.Exists.isUserEstimationExists, _controllers.UserProjectController.addLabourToProjectEstimation);
router.patch("/:projectId/estimation/:id/labour/remove", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isProjectAlreadyApproved, _middlewares.Exists.isUserEstimationExists, _controllers.UserProjectController.removeLabourFromProjectEstimation);
router.patch("/:projectId/estimation/:id/labour/edit", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isProjectAlreadyApproved, _middlewares.Exists.isUserEstimationExists, _controllers.UserProjectController.editLabourProjectEstimation);

// subcontractors
router.patch("/:projectId/estimation/:id/subcontractor/add", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isProjectAlreadyApproved, _middlewares.Exists.isUserEstimationExists, _controllers.UserProjectController.addSubcontractorToProjectEstimation);
router.patch("/:projectId/estimation/:id/subcontractor/remove", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isProjectAlreadyApproved, _middlewares.Exists.isUserEstimationExists, _controllers.UserProjectController.removeSubcontractorFromProjectEstimation);
router.patch("/:projectId/estimation/:id/subcontractor/edit", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isProjectAlreadyApproved, _middlewares.Exists.isUserEstimationExists, _controllers.UserProjectController.editSubcontractorProjectEstimation);
router.patch("/:projectId/boq/import", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _middlewares.Exists.isProjectAlreadyApproved, _controllers.UserProjectController.importBOQViaCSV);
router.patch("/:projectId/estimation/resource/map", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.Exists.isProjectAlreadyApproved, _controllers.UserProjectController.mapEstimationToAnotherEstimation);

// addons
router.post("/:projectId/addons/create", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.Exists.isProjectExistsWithEstimation, _middlewares.Validators.isAddonsCreateValid, _middlewares.Exists.isProjectAlreadyApproved, _controllers.ProjectAddonsController.createAddons);
router.patch("/:projectId/addons/:id/edit", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isProjectExistsWithEstimation, _middlewares.Validators.isAddonsCreateValid, _middlewares.Exists.isProjectAlreadyApproved, _controllers.ProjectAddonsController.updateAddons);
router.delete("/:projectId/addons/:id/remove", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isProjectExistsWithEstimation, _middlewares.Exists.isProjectAlreadyApproved, _controllers.ProjectAddonsController.deleteAddons);
router.get("/:projectId/addons/all", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.Exists.isProjectExistsWithEstimation, _controllers.ProjectAddonsController.getAllAddons);
router.get("/:projectId/addons/:id", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isProjectExistsWithEstimation, _middlewares.Exists.isProjectAlreadyApproved, _controllers.ProjectAddonsController.getSingleAddons);

// categories
router.get("/:projectId/category/all", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.Exists.isProjectExistsWithEstimation, _controllers.UserEstimationCategoryController.getAllProjectCategory);
router.get("/:projectId/category/:id", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isProjectIdPresentAndValid, _middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isProjectExistsWithEstimation, _controllers.UserEstimationCategoryController.getByIdProjectCategory);
router.get("/estimation/all", _middlewares.verifyAccessToken, _controllers.UserEstimationController.getAllProjectEstimation);
var _default = exports.default = router;