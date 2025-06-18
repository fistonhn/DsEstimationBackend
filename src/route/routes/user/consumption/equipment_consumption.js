import express from "express";
const router = express.Router();

import { EquipmentConsumptionController } from "../../../../controllers";
import {
  verifyAccessToken,
  ValidateParams,
  Validators,
  Exists,
} from "../../../../middlewares";

// get all equipment consumption
router.get(
  "/all",
  verifyAccessToken,
  // Exists.isTrialExprired,
  EquipmentConsumptionController.getAllEquipmentConsumption
);

// get equipment consumption by id
router.get(
  "/:id",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  EquipmentConsumptionController.getEquipmentConsumptionById
);

// create equipment consumption
router.post(
  "/create",
  verifyAccessToken,
  // Exists.isTrialExprired,
  Validators.isEquipmentConsumptionValid,
  EquipmentConsumptionController.createEquipmentConsumption
);

// update equipment consumption
router.patch(
  "/:id/update",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  EquipmentConsumptionController.editEquipmentConsumption
);

router.delete(
  "/:id/delete",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  EquipmentConsumptionController.deleteEquipmentConsumption
);

export default router;
