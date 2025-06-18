import express from "express";
const router = express.Router();

import { UserSuppliersController } from "../../../controllers";
import {
  verifyAccessToken,
  Validators,
  ValidateParams,
  Exists,
} from "../../../middlewares";

// routes
router.get(
  "/all",
  verifyAccessToken,
  // Exists.isTrialExprired,
  UserSuppliersController.getAllSuppliers
);
router.get(
  "/:id",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  UserSuppliersController.getSupplierById
);
router.post(
  "/create",
  verifyAccessToken,
  // Exists.isTrialExprired,
  Validators.isSupplierInputValid,
  UserSuppliersController.createSupplier
);
router.patch(
  "/:id/update",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  UserSuppliersController.updateSupplier
);
router.delete(
  "/:id/delete",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  UserSuppliersController.deleteSupplier
);

export default router;
