import express from "express";
const router = express.Router();
import { UserMaterialController } from "../../../controllers";
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
  UserMaterialController.getAllMaterials
);

router.get(
  "/:id",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  Exists.isUserMaterialExists,
  UserMaterialController.getMaterialById
);
router.post(
  "/create",
  verifyAccessToken,
  // Exists.isTrialExprired,
  Validators.isMaterialValid,
  UserMaterialController.createMaterial
);
router.patch(
  "/:id/update",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  Exists.isUserMaterialExists,
  UserMaterialController.updateMaterial
);
router.delete(
  "/:id/delete",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  Exists.isUserMaterialExists,
  UserMaterialController.deleteMaterial
);

export default router;
