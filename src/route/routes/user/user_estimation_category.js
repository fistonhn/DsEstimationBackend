import express from "express";
const router = express.Router();
import {
  UserEstimationCategoryController,
  SubcategoryController,
} from "../../../controllers";
import {
  verifyAccessToken,
  ValidateParams,
  Validators,
} from "../../../middlewares";

// routes
router.get(
  "/all",
  verifyAccessToken,
  // Exists.isTrialExprired,
  UserEstimationCategoryController.getAll
);
router.get(
  "/:id",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  UserEstimationCategoryController.getById
);
router.post(
  "/create",
  verifyAccessToken,
  // Exists.isTrialExprired,
  Validators.isCategoryValid,
  UserEstimationCategoryController.create
);
router.patch(
  "/:id/update",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  UserEstimationCategoryController.update
);
router.delete(
  "/:id/delete",
  verifyAccessToken,
  // Exists.isTrialExprired,
  ValidateParams.isIdPresentAndValid,
  UserEstimationCategoryController.delete
);

// get all subcategory
// router.get(
//   "/subcategory/all",
//   verifyAccessToken,
//   SubcategoryController.getAllSubcategory
// );
// // get subcategory by id
// router.get(
//   "/subcategory/:id",
//   verifyAccessToken,
//   SubcategoryController.getSubcategoryById
// );
// create subcategory
router.post(
  "/subcategory/create",
  verifyAccessToken,
  SubcategoryController.createSubcategory
);
// update subcategory
router.patch(
  "/subcategory/:id/update",
  verifyAccessToken,
  SubcategoryController.updateSubcategory
);

// APPROVE subcategory
router.patch(
  "/subcategory/:id/approve",
  verifyAccessToken,
  SubcategoryController.approveSubcategory
);
// delete subcategory
router.delete(
  "/subcategory/:id/delete",
  verifyAccessToken,
  SubcategoryController.deleteSubcategory
);

export default router;
