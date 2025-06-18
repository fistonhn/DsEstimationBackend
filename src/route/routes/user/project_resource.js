import express from "express";
const router = express.Router();
import {
  EquipmentResourceController,
  MaterialResourceController,
  LabourResourceController,
  SubContractorsResourceController,
} from "../../../controllers";
import {
  Validators,
  verifyAccessToken,
  Exists,
  ValidateParams,
  Role,
} from "../../../middlewares";

// routes

// equipment

router.get(
  "/:projectId/equipment/all",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  EquipmentResourceController.getAllEquipmentResoucesOfProject
);
router.get(
  "/:projectId/equipment/:id",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  ValidateParams.isIdPresentAndValid,
  EquipmentResourceController.getOneEquipmentResoucesOfProject
);

router.post(
  "/:projectId/equipment/add",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  EquipmentResourceController.addEquipmentResoucesToProject
);
router.patch(
  "/:projectId/equipment/remove",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  EquipmentResourceController.removeEquipmentResourceFromProject
);

// material
router.get(
  "/:projectId/material/all",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  MaterialResourceController.getAllMaterialResourceOfProject
);
router.get(
  "/:projectId/material/:id",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  ValidateParams.isIdPresentAndValid,
  MaterialResourceController.getOneMaterialResourceOfProject
);

router.post(
  "/:projectId/material/add",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  MaterialResourceController.addMaterialResouceToProject
);
router.patch(
  "/:projectId/material/remove",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  MaterialResourceController.removeMaterialResourceFromProject
);

// labour
router.get(
  "/:projectId/labour/all",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  LabourResourceController.getAllLabourResourceOfProject
);
router.get(
  "/:projectId/labour/:id",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  ValidateParams.isIdPresentAndValid,
  LabourResourceController.getOneLabourResourceOfProject
);

router.post(
  "/:projectId/labour/add",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  LabourResourceController.addLabourResouceToProject
);
router.patch(
  "/:projectId/labour/remove",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  LabourResourceController.removeLabourResourceFromProject
);

// sub contractors
router.get(
  "/:projectId/subcontractors/all",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  SubContractorsResourceController.getAllSubcontractorResourceOfProject
);
router.get(
  "/:projectId/subcontractors/:id",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  ValidateParams.isIdPresentAndValid,
  SubContractorsResourceController.getOneSubcontractorResourceOfProject
);

router.post(
  "/:projectId/subcontractors/add",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  SubContractorsResourceController.addSubcontractorResouceToProject
);
router.patch(
  "/:projectId/subcontractors/remove",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isProjectIdPresentAndValid,
  SubContractorsResourceController.removeSubcontractorResourceFromProject
);

export default router;
