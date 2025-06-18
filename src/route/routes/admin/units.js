import express from "express";
const router = express.Router();
import { UnitsController } from "../../../controllers";
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
  Validators.isUnitValid,
  UnitsController.createUnit
);
router.patch(
  "/:id/update",
  verifyAccessToken,
  ValidateParams.isIdPresentAndValid,
  Role.isOwner,
  Exists.isUnitExists,
  UnitsController.updateUnit
);
router.delete(
  "/:id/delete",
  verifyAccessToken,
  ValidateParams.isIdPresentAndValid,
  Role.isOwner,
  Exists.isUnitExists,
  UnitsController.deleteUnit
);

// get all unverified units
router.get(
  "/unverified/all",
  verifyAccessToken,
  Role.isOwner,
  UnitsController.getAllUnapprovedUnits
);
// approve an unit
router.patch(
  "/:id/approve",
  verifyAccessToken,
  Role.isOwner,
  ValidateParams.isIdPresentAndValid,
  UnitsController.approveUnit
);

export default router;
