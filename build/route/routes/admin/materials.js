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

router.post("/create", _middlewares.verifyAccessToken, _middlewares.Role.isOwner, _middlewares.Validators.isMaterialValid, _controllers.MaterialsController.createMaterial);
router.patch("/:id/update", _middlewares.verifyAccessToken, _middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Role.isOwner, _middlewares.Exists.isMaterialExists, _controllers.MaterialsController.updateMaterial);
router.delete("/:id/delete", _middlewares.verifyAccessToken, _middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Role.isOwner, _middlewares.Exists.isMaterialExists, _controllers.MaterialsController.deleteMaterial);

// get all unverified materials
router.get("/unverified/all", _middlewares.verifyAccessToken, _middlewares.Role.isOwner, _controllers.MaterialsController.getAllUnapprovedMaterials);
// approve an material
router.patch("/:id/approve", _middlewares.verifyAccessToken, _middlewares.Role.isOwner, _middlewares.ValidateParams.isIdPresentAndValid, _controllers.MaterialsController.approveMaterial);
var _default = exports.default = router;