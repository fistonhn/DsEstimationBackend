import express from "express";
const router = express.Router();
import { MaterialsController } from "../../../controllers";
import {
  Exists,
  Validators,
  Role,
  verifyAccessToken,
  ValidateParams,
} from "../../../middlewares";

// routes

router.post(
  "/create",
  verifyAccessToken,
  Role.isOwner,
  Validators.isMaterialValid,
  MaterialsController.createMaterial
);
router.patch(
  "/:id/update",
  verifyAccessToken,
  ValidateParams.isIdPresentAndValid,
  Role.isOwner,
  Exists.isMaterialExists,
  MaterialsController.updateMaterial
);
router.delete(
  "/:id/delete",
  verifyAccessToken,
  ValidateParams.isIdPresentAndValid,
  Role.isOwner,
  Exists.isMaterialExists,
  MaterialsController.deleteMaterial
);

// get all unverified materials
router.get(
  "/unverified/all",
  verifyAccessToken,
  Role.isOwner,
  MaterialsController.getAllUnapprovedMaterials
);
// approve an material
router.patch(
  "/:id/approve",
  verifyAccessToken,
  Role.isOwner,
  ValidateParams.isIdPresentAndValid,
  MaterialsController.approveMaterial
);

export default router;
