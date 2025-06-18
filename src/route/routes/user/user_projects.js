import express from "express";
const router = express.Router();
import {
  UserProjectController,
  ProjectAddonsController,
  UserEstimationCategoryController,
  UserEstimationController,
} from "../../../controllers";
import {
  Validators,
  verifyAccessToken,
  Exists,
  ValidateParams,
  Role,
} from "../../../middlewares";

// routes
router.get(
  "/all",
  verifyAccessToken,
  // Exists.isTrialExprired,
  UserProjectController.getAllProjects
);
router.get(
  "/status",
  verifyAccessToken,
  // Exists.isTrialExprired,
  UserProjectController.getProjectByStatus
);
router.get(
  "/templates/all",
  verifyAccessToken,
  UserProjectController.getAllProjectsTemplates
);
router.get(
  "/:id",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  Exists.isProjectExists,
  Role.canReadProject,
  UserProjectController.getProjectById
);
router.post(
  "/create",
  verifyAccessToken,
  // Exists.isTrialExprired,
  Validators.isProjectInputValid,
  UserProjectController.createProject
);

router.patch(
  "/:id/update",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  Exists.isProjectExists,
  Exists.isProjectApproved,
  UserProjectController.editProject
);

router.patch(
  "/:id/approve",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  Exists.isProjectExists,
  UserProjectController.approveProject
);
router.patch(
  "/:id/duplicate",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  Exists.isProjectExists,
  UserProjectController.copyProjectData
);
router.patch(
  "/:id/template/create",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  Exists.isProjectExists,
  UserProjectController.createProjectFromTemplate
);
router.patch(
  "/move/estimation/:id/to-another-project",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  UserProjectController.copyEstimationFromProjectToAnother
);
router.delete(
  "/:id/delete",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  Exists.isProjectExists,
  UserProjectController.deleteProject
);

router.get(
  "/:projectId/estimation/:id",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  ValidateParams.isIdPresentAndValid,
  UserProjectController.getProjectEstimationById
);

router.patch(
  "/:projectId/estimation/:id/update",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  ValidateParams.isIdPresentAndValid,
  Exists.isProjectAlreadyApproved,
  Exists.isProjectExistsWithEstimation,
  Exists.isUserEstimationExists,
  UserProjectController.updateEstimation
);

router.patch(
  "/:projectId/estimation/:id/equipment/add",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  ValidateParams.isIdPresentAndValid,
  Exists.isProjectAlreadyApproved,
  Exists.isProjectExistsWithEstimation,
  UserProjectController.addEquipmentToProjectEstimation
);
router.patch(
  "/:projectId/estimation/:id/equipment/remove",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  ValidateParams.isIdPresentAndValid,
  Exists.isProjectAlreadyApproved,
  Exists.isProjectExistsWithEstimation,
  UserProjectController.removeEquipmentFromProjectEstimation
);
router.patch(
  "/:projectId/activity/add",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  Exists.isProjectAlreadyApproved,
  UserProjectController.addProjectActivity
);
router.patch(
  "/:projectId/activity/remove",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  Exists.isProjectAlreadyApproved,
  UserProjectController.removeActivityFromProject
);
router.patch(
  "/:projectId/estimation/add",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  Exists.isProjectAlreadyApproved,
  UserProjectController.addEstimationToProject
);
router.patch(
  "/:projectId/estimation/remove",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  Exists.isProjectAlreadyApproved,
  UserProjectController.removeEstimationFromProject
);

// equipments
router.patch(
  "/:projectId/estimation/:id/equipment/add",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  ValidateParams.isIdPresentAndValid,
  Exists.isProjectAlreadyApproved,
  Exists.isUserEstimationExists,
  UserProjectController.addEquipmentToProjectEstimation
);
router.patch(
  "/:projectId/estimation/:id/equipment/remove",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  ValidateParams.isIdPresentAndValid,
  Exists.isProjectAlreadyApproved,
  Exists.isUserEstimationExists,
  UserProjectController.removeEquipmentFromProjectEstimation
);
router.patch(
  "/:projectId/estimation/:id/equipment/edit",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  ValidateParams.isIdPresentAndValid,
  Exists.isProjectAlreadyApproved,
  Exists.isUserEstimationExists,
  UserProjectController.editProjectEstimationEquipment
);

// materials
router.patch(
  "/:projectId/estimation/:id/material/add",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  ValidateParams.isIdPresentAndValid,
  Exists.isProjectAlreadyApproved,
  Exists.isUserEstimationExists,
  UserProjectController.addMaterialToProjectEstimation
);
router.patch(
  "/:projectId/estimation/:id/material/remove",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  ValidateParams.isIdPresentAndValid,
  Exists.isProjectAlreadyApproved,
  Exists.isUserEstimationExists,
  UserProjectController.removeMaterialFromProjectEstimation
);
router.patch(
  "/:projectId/estimation/:id/material/edit",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  ValidateParams.isIdPresentAndValid,
  Exists.isProjectAlreadyApproved,
  Exists.isUserEstimationExists,
  UserProjectController.editProjectEstimationMaterials
);

// labor
router.patch(
  "/:projectId/estimation/:id/labour/add",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  ValidateParams.isIdPresentAndValid,
  Exists.isProjectAlreadyApproved,
  Exists.isUserEstimationExists,
  UserProjectController.addLabourToProjectEstimation
);
router.patch(
  "/:projectId/estimation/:id/labour/remove",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  ValidateParams.isIdPresentAndValid,
  Exists.isProjectAlreadyApproved,
  Exists.isUserEstimationExists,
  UserProjectController.removeLabourFromProjectEstimation
);
router.patch(
  "/:projectId/estimation/:id/labour/edit",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  ValidateParams.isIdPresentAndValid,
  Exists.isProjectAlreadyApproved,
  Exists.isUserEstimationExists,
  UserProjectController.editLabourProjectEstimation
);

// subcontractors
router.patch(
  "/:projectId/estimation/:id/subcontractor/add",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  ValidateParams.isIdPresentAndValid,
  Exists.isProjectAlreadyApproved,
  Exists.isUserEstimationExists,
  UserProjectController.addSubcontractorToProjectEstimation
);
router.patch(
  "/:projectId/estimation/:id/subcontractor/remove",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  ValidateParams.isIdPresentAndValid,
  Exists.isProjectAlreadyApproved,
  Exists.isUserEstimationExists,
  UserProjectController.removeSubcontractorFromProjectEstimation
);
router.patch(
  "/:projectId/estimation/:id/subcontractor/edit",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  ValidateParams.isIdPresentAndValid,
  Exists.isProjectAlreadyApproved,
  Exists.isUserEstimationExists,
  UserProjectController.editSubcontractorProjectEstimation
);
router.patch(
  "/:projectId/boq/import",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  Exists.isProjectAlreadyApproved,
  UserProjectController.importBOQViaCSV
);
router.patch(
  "/:projectId/estimation/resource/map",
  verifyAccessToken,
  // Exists.isTrialExprired,
  Exists.isProjectAlreadyApproved,
  UserProjectController.mapEstimationToAnotherEstimation
);

// addons
router.post(
  "/:projectId/addons/create",
  verifyAccessToken,
  // Exists.isTrialExprired,
  Exists.isProjectExistsWithEstimation,
  Validators.isAddonsCreateValid,
  Exists.isProjectAlreadyApproved,
  ProjectAddonsController.createAddons
);

router.patch(
  "/:projectId/addons/:id/edit",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  ValidateParams.isIdPresentAndValid,
  Exists.isProjectExistsWithEstimation,
  Validators.isAddonsCreateValid,
  Exists.isProjectAlreadyApproved,
  ProjectAddonsController.updateAddons
);
router.delete(
  "/:projectId/addons/:id/remove",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  ValidateParams.isIdPresentAndValid,
  Exists.isProjectExistsWithEstimation,
  Exists.isProjectAlreadyApproved,
  ProjectAddonsController.deleteAddons
);

router.get(
  "/:projectId/addons/all",
  verifyAccessToken,
  // Exists.isTrialExprired,
  Exists.isProjectExistsWithEstimation,
  ProjectAddonsController.getAllAddons
);
router.get(
  "/:projectId/addons/:id",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  ValidateParams.isIdPresentAndValid,
  Exists.isProjectExistsWithEstimation,
  Exists.isProjectAlreadyApproved,
  ProjectAddonsController.getSingleAddons
);

// categories
router.get(
  "/:projectId/category/all",
  verifyAccessToken,
  // Exists.isTrialExprired,
  Exists.isProjectExistsWithEstimation,
  UserEstimationCategoryController.getAllProjectCategory
);
router.get(
  "/:projectId/category/:id",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  ValidateParams.isIdPresentAndValid,
  Exists.isProjectExistsWithEstimation,
  UserEstimationCategoryController.getByIdProjectCategory
);

router.get(
  "/estimation/all",
  verifyAccessToken,
  UserEstimationController.getAllProjectEstimation
);

export default router;
