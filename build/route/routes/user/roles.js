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
//routes
router.get("/all", _middlewares.verifyAccessToken, _middlewares.Role.isOwnerOrManager, _controllers.RolesController.getAllRoles);
router.get("/:id", _middlewares.verifyAccessToken, _middlewares.Role.isOwnerOrManager, _controllers.RolesController.getOneRoles);
router.post("/create", _middlewares.verifyAccessToken, _middlewares.Role.isOwnerOrManager, _middlewares.Validators.isRoleValid, _controllers.RolesController.createRole);
router.patch("/:id/update", _middlewares.verifyAccessToken, _middlewares.Role.isOwnerOrManager, _controllers.RolesController.updateRole);
router.delete("/:id/delete", _middlewares.verifyAccessToken, _middlewares.Role.isOwnerOrManager, _controllers.RolesController.deleteRole);
// assign role to user
router.patch("/:id/assign", _middlewares.verifyAccessToken, _middlewares.Role.isOwnerOrManager, _controllers.RolesController.assignRoleToUser);
router.patch("/assign/:id/update", _middlewares.verifyAccessToken, _middlewares.Role.isOwnerOrManager, _controllers.RolesController.updateRoleToUser);
router.patch("/assign/project/remove", _middlewares.verifyAccessToken, _middlewares.Role.isOwnerOrManager, _controllers.RolesController.removeProjectFromUserRole);
router.get("/assign/project/access/:id/all", _middlewares.verifyAccessToken, _middlewares.Role.isOwnerOrManager, _controllers.RolesController.getAllProjectsAssignedToUser);
var _default = exports.default = router;