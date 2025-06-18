"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _controllers = require("../../../controllers");
var _middlewares = require("../../../middlewares");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
// routes
router.post("/plan/create", _middlewares.verifyAccessToken, _middlewares.Role.isOwner, _middlewares.Validators.isPaymentplanInputValid, _controllers.PaymentController.createPaymentPlan);
router.get("/transaction/all", _middlewares.verifyAccessToken, _middlewares.Role.isOwner, _controllers.PaymentController.getAllPaymentTransaction);

// GET all payment plans
router.get("/plan/all", _controllers.PaymentController.getAllPaymentPlans);

// GET payment plan by id
router.get("/plan/:id", _controllers.PaymentController.getPaymentPlanById);

// update payment plan
router.patch("/plan/:id", _middlewares.verifyAccessToken, _middlewares.Role.isOwner, _controllers.PaymentController.updatePaymentPlan);

// cancel payment plan
router.patch("/plan/:id/cancel", _middlewares.verifyAccessToken, _middlewares.Role.isOwner, _controllers.PaymentController.cancelPaymentPlan);

// create payment plan
router.post("/charge/create", _controllers.PaymentController.createPayment);

// success payment
router.get("/success", _controllers.PaymentController.successPayment);
var _default = exports.default = router;