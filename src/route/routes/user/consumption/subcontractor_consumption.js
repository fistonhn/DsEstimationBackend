import express from "express";
const router = express.Router();

import { SubContractorsConsumptionController } from "../../../../controllers";
import {
  verifyAccessToken,
  ValidateParams,
  Validators,
  Exists,
} from "../../../../middlewares";

// get all subcontractor consumption
router.get(
  "/all",
  verifyAccessToken,
  // Exists.isTrialExprired,
  SubContractorsConsumptionController.getAllSubcontractorConsumption
);

// get subcontractor consumption by id
router.get(
  ":id",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  SubContractorsConsumptionController.getSubcontractorConsumptionById
);

// create subcontractor consumption
router.post(
  "/create",
  verifyAccessToken,
  // Exists.isTrialExprired,
  Validators.isSubcontractorConsumptionValid,
  SubContractorsConsumptionController.createSubcontractorConsumption
);

// update subcontractor consumption
router.patch(
  "/:id/update",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  SubContractorsConsumptionController.editSubcontractorConsumption
);

// delete subcontractor consumption
router.delete(
  "/:id/delete",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  SubContractorsConsumptionController.deleteSubcontractorConsumption
);

export default router;
