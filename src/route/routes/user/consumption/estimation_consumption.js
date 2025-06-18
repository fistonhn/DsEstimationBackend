import express from "express";
const router = express.Router();

import { EstimationConsumptionController } from "../../../../controllers";
import {
  verifyAccessToken,
  ValidateParams,
  Validators,
  Exists,
} from "../../../../middlewares";

// get all Estimation consumption
router.get(
  "/all",
  verifyAccessToken,
  // Exists.isTrialExprired,
  EstimationConsumptionController.getAllEstimationConsumption
);

// get estimation consumption by id
router.get(
  "/:id",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  EstimationConsumptionController.getEstimationConsumption
);

// create estimation consumption
router.post(
  "/create",
  verifyAccessToken,
  // Exists.isTrialExprired,
  Validators.isEstimationConsumptionValid,
  EstimationConsumptionController.createEstimationConsumption
);

// update estimation consumption
router.patch(
  "/:id/update",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  EstimationConsumptionController.editEstimationConsumption
);

router.delete(
  "/:id/delete",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  EstimationConsumptionController.deleteEstimationConsumption
);

// get estimation consumption by date
router.patch(
  "/date",
  verifyAccessToken,
  // Exists.isTrialExprired,
  Validators.isfromAndEndDateValid,
  EstimationConsumptionController.getEstimationConsumptionByDate
);
router.patch(
  "/:estimationId/date",
  verifyAccessToken,
  // Exists.isTrialExprired,
  Validators.isfromAndEndDateValid,
  EstimationConsumptionController.getOneEstimationConsumptionByDate
);

export default router;
