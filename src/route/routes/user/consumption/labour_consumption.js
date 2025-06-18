import express from "express";
const router = express.Router();

import { LabourConsumptionController } from "../../../../controllers";
import {
  verifyAccessToken,
  ValidateParams,
  Validators,
  Exists,
} from "../../../../middlewares";

// get all labour consumption
router.get(
  "/all",
  verifyAccessToken,
  // Exists.isTrialExprired,
  LabourConsumptionController.getAllLabourConsumption
);

// get labour consumption by id
router.get(
  "/:id",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  LabourConsumptionController.getLabourConsumptionById
);

// create labour consumption
router.post(
  "/create",
  verifyAccessToken,
  // Exists.isTrialExprired,
  Validators.isLabourConsumptionValid,
  LabourConsumptionController.createLabourConsumption
);

// update labour consumption
router.patch(
  "/:id/update",
  verifyAccessToken,
  // Exists.isTrialExprired,
  Validators.isLabourConsumptionValid,
  LabourConsumptionController.editLabourConsumption
);

// delete labour consumption
router.delete(
  "/:id/delete",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  LabourConsumptionController.deleteLabourConsumption
);

export default router;
