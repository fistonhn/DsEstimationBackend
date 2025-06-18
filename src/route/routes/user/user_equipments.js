import express from "express";
const router = express.Router();

import { UserEquipmentController } from "../../../controllers";
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
  UserEquipmentController.getAllEquipments
);
router.get(
  "/:id",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  Exists.isUserEquipmentExists,
  UserEquipmentController.getEquipmentById
);
router.post(
  "/create",
  verifyAccessToken,
  // Exists.isTrialExprired,
  Validators.isEquipmentValid,
  UserEquipmentController.createEquipment
);
router.patch(
  "/:id/update",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  Exists.isUserEquipmentExists,
  UserEquipmentController.updateEquipment
);
router.delete(
  "/:id/delete",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  Exists.isUserEquipmentExists,
  UserEquipmentController.deleteEquipment
);

export default router;
