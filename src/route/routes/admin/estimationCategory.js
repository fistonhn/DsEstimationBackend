import express from "express";
const router = express.Router();
import { EstimationCategoryController } from "../../../controllers";
import { Role, verifyAccessToken, ValidateParams } from "../../../middlewares";

// routes

router.post(
  "/create",
  verifyAccessToken,
  Role.isOwner,
  EstimationCategoryController.create
);
router.patch(
  "/:id/update",
  verifyAccessToken,
  Role.isOwner,
  ValidateParams.isIdPresentAndValid,
  EstimationCategoryController.update
);
router.delete(
  "/:id/delete",
  verifyAccessToken,
  Role.isOwner,
  ValidateParams.isIdPresentAndValid,
  EstimationCategoryController.delete
);

// get all unverified categories
router.get(
  "/unverified/all",
  verifyAccessToken,
  Role.isOwner,
  EstimationCategoryController.getAllUnverifiedCategory
);
// approve an category
router.patch(
  "/:id/approve",
  verifyAccessToken,
  Role.isOwner,
  ValidateParams.isIdPresentAndValid,
  EstimationCategoryController.approveCategory
);

export default router;
