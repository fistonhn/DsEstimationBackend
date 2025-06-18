import express from "express";
const router = express.Router();
import { UserSubContractorsController } from "../../../controllers";
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
  UserSubContractorsController.getAllSubContractors
);
router.get(
  "/:id",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  Exists.isUserSubContractorExists,
  UserSubContractorsController.getSubContractorById
);
router.post(
  "/create",
  verifyAccessToken,
  // Exists.isTrialExprired,
  Validators.isSubContractorInputValid,
  UserSubContractorsController.createSubContractor
);
router.patch(
  "/:id/update",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  Exists.isUserSubContractorExists,
  UserSubContractorsController.updateSubContractor
);
router.delete(
  "/:id/delete",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  Exists.isUserSubContractorExists,
  UserSubContractorsController.deleteSubContractor
);

export default router;
