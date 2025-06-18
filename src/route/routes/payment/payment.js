import express from "express";
const router = express.Router();

import { PaymentController } from "../../../controllers";
import { verifyAccessToken, Validators, Role } from "../../../middlewares";

// routes
router.post(
  "/plan/create",
  verifyAccessToken,
  Role.isOwner,
  Validators.isPaymentplanInputValid,
  PaymentController.createPaymentPlan
);
router.get(
  "/transaction/all",
  verifyAccessToken,
  Role.isOwner,
  PaymentController.getAllPaymentTransaction
);

// GET all payment plans
router.get("/plan/all", PaymentController.getAllPaymentPlans);

// GET payment plan by id
router.get("/plan/:id", PaymentController.getPaymentPlanById);

// update payment plan
router.patch(
  "/plan/:id",
  verifyAccessToken,
  Role.isOwner,
  PaymentController.updatePaymentPlan
);

// cancel payment plan
router.patch(
  "/plan/:id/cancel",
  verifyAccessToken,
  Role.isOwner,
  PaymentController.cancelPaymentPlan
);

// create payment plan
router.post("/charge/create", PaymentController.createPayment);

// success payment
router.get("/success", PaymentController.successPayment);
export default router;
