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
router.get("/all", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_controllers.UserEstimationCategoryController.getAll);
router.get("/:id", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _controllers.UserEstimationCategoryController.getById);
router.post("/create", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.Validators.isCategoryValid, _controllers.UserEstimationCategoryController.create);
router.patch("/:id/update", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _controllers.UserEstimationCategoryController.update);
router.delete("/:id/delete", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _controllers.UserEstimationCategoryController.delete);

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
router.post("/subcategory/create", _middlewares.verifyAccessToken, _controllers.SubcategoryController.createSubcategory);
// update subcategory
router.patch("/subcategory/:id/update", _middlewares.verifyAccessToken, _controllers.SubcategoryController.updateSubcategory);

// APPROVE subcategory
router.patch("/subcategory/:id/approve", _middlewares.verifyAccessToken, _controllers.SubcategoryController.approveSubcategory);
// delete subcategory
router.delete("/subcategory/:id/delete", _middlewares.verifyAccessToken, _controllers.SubcategoryController.deleteSubcategory);
var _default = exports.default = router;