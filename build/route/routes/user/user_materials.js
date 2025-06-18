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
_controllers.UserMaterialController.getAllMaterials);
router.get("/:id", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isUserMaterialExists, _controllers.UserMaterialController.getMaterialById);
router.post("/create", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.Validators.isMaterialValid, _controllers.UserMaterialController.createMaterial);
router.patch("/:id/update", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isUserMaterialExists, _controllers.UserMaterialController.updateMaterial);
router.delete("/:id/delete", _middlewares.verifyAccessToken,
// Exists.isTrialExprired,
_middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isUserMaterialExists, _controllers.UserMaterialController.deleteMaterial);
var _default = exports.default = router;