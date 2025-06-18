import express from "express";
const router = express.Router();

import { MaterialConsumptionController } from "../../../../controllers";
import {
  verifyAccessToken,
  ValidateParams,
  Validators,
  Exists,
} from "../../../../middlewares";

// get all material consumption
router.get(
  "/all",
  verifyAccessToken,
  // Exists.isTrialExprired,
  MaterialConsumptionController.getAllMaterialConsumption
);

// get material consumption by id
router.get(
  "/:id",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  MaterialConsumptionController.getMaterialConsumptionById
);

// create material consumption
router.post(
  "/create",
  verifyAccessToken,
  // Exists.isTrialExprired,
  Validators.isMaterialConsumptionValid,
  MaterialConsumptionController.createMaterialConsumption
);

// update material consumption
router.patch(
  "/:id/update",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  MaterialConsumptionController.editMaterialConsumption
);

// delete material consumption
router.delete(
  "/:id/delete",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  MaterialConsumptionController.deleteMaterialConsumption
);

export default router;
