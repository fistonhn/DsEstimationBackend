import express from "express";
const router = express.Router();
import { UserUnitsController } from "../../../controllers";
import {
  Exists,
  Validators,
  verifyAccessToken,
  ValidateParams,
} from "../../../middlewares";

// routes
router.get(
  "/all",
  verifyAccessToken,
  // Exists.isTrialExprired,
  UserUnitsController.getAllUnits
);
router.get(
  "/:id",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  Exists.isUserUnitExists,
  UserUnitsController.getUnitById
);
router.post(
  "/create",
  verifyAccessToken,
  // Exists.isTrialExprired,
  Validators.isUnitValid,
  UserUnitsController.createUnit
);
router.patch(
  "/:id/update",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  Exists.isUserUnitExists,
  UserUnitsController.updateUnit
);
router.delete(
  "/:id/delete",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  Exists.isUserUnitExists,
  UserUnitsController.deleteUnit
);

export default router;
