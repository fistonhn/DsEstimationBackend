import express from "express";
const router = express.Router();
import { UserEstimationController } from "../../../controllers";
import {
  verifyAccessToken,
  Exists,
  ValidateParams,
  Validators,
} from "../../../middlewares";

// routes
router.get(
  "/all",
  verifyAccessToken,
  // Exists.isTrialExprired,
  UserEstimationController.getAllEstimations
);
router.get(
  "/:id",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  Exists.isUserEstimationExists,
  UserEstimationController.getEstimationById
);
router.post(
  "/create",
  verifyAccessToken,
  // Exists.isTrialExprired,
  Validators.isEstimationCreateValid,
  UserEstimationController.createEstimation
);
router.patch(
  "/:id/update",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  Exists.isUserEstimationExists,
  UserEstimationController.updateEstimation
);
router.delete(
  "/:id/delete",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  Exists.isUserEstimationExists,
  UserEstimationController.deleteEstimation
);
router.patch(
  "/:id/duplicate",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  UserEstimationController.copyEstimation
);

// equipments
router.patch(
  "/:id/equipment/add",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  Exists.isUserEstimationExists,
  UserEstimationController.addEquipmentToEstimation
);
router.patch(
  "/:id/equipment/remove",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  Exists.isUserEstimationExists,
  UserEstimationController.removeEquipmentFromEstimation
);
router.patch(
  "/:id/equipment/edit",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  Exists.isUserEstimationExists,
  UserEstimationController.editEstimationEquipment
);

// materials
router.patch(
  "/:id/material/add",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  Exists.isUserEstimationExists,
  UserEstimationController.addMaterialToEstimation
);
router.patch(
  "/:id/material/remove",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  Exists.isUserEstimationExists,
  UserEstimationController.removeMaterialFromEstimation
);
router.patch(
  "/:id/material/edit",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  Exists.isUserEstimationExists,
  UserEstimationController.editEstimationMaterials
);

// labor
router.patch(
  "/:id/labour/add",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  Exists.isUserEstimationExists,
  UserEstimationController.addLabourToEstimation
);
router.patch(
  "/:id/labour/remove",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  Exists.isUserEstimationExists,
  UserEstimationController.removeLabourFromEstimation
);
router.patch(
  "/:id/labour/edit",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  Exists.isUserEstimationExists,
  UserEstimationController.editLabourEstimation
);

// subcontractors
router.patch(
  "/:id/subcontractor/add",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  Exists.isUserEstimationExists,
  UserEstimationController.addSubcontractorToEstimation
);
router.patch(
  "/:id/subcontractor/remove",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  Exists.isUserEstimationExists,
  UserEstimationController.removeSubcontractorFromEstimation
);
router.patch(
  "/:id/subcontractor/edit",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  Exists.isUserEstimationExists,
  UserEstimationController.editSubcontractorEstimation
);

export default router;
