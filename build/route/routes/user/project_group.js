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
router.get("/all", _middlewares.verifyAccessToken, _controllers.ProjectGroupController.getAllProjectGroup);
router.get("/:id", _middlewares.verifyAccessToken, _controllers.ProjectGroupController.getOneProjectGroup);
router.post("/create", _middlewares.verifyAccessToken, _controllers.ProjectGroupController.createGroup);
router.patch("/:id/update", _middlewares.verifyAccessToken, _controllers.ProjectGroupController.updateGroup);
router.delete("/:id/delete", _middlewares.verifyAccessToken, _controllers.ProjectGroupController.deleteGroup);
router.patch("/:id/add-project", _middlewares.verifyAccessToken, _controllers.ProjectGroupController.addProjectToGroup);
router.patch("/:id/remove-project", _middlewares.verifyAccessToken, _controllers.ProjectGroupController.removeProjectFromGroup);
var _default = exports.default = router;