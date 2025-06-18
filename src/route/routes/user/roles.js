import express from "express";
const router = express.Router();
import { RolesController } from "../../../controllers";
import { verifyAccessToken, Validators, Role } from "../../../middlewares";

//routes
router.get(
  "/all",
  verifyAccessToken,
  Role.isOwnerOrManager,
  RolesController.getAllRoles
);
router.get(
  "/:id",
  verifyAccessToken,
  Role.isOwnerOrManager,
  RolesController.getOneRoles
);
router.post(
  "/create",
  verifyAccessToken,
  Role.isOwnerOrManager,
  Validators.isRoleValid,
  RolesController.createRole
);
router.patch(
  "/:id/update",
  verifyAccessToken,
  Role.isOwnerOrManager,
  RolesController.updateRole
);
router.delete(
  "/:id/delete",
  verifyAccessToken,
  Role.isOwnerOrManager,
  RolesController.deleteRole
);
// assign role to user
router.patch(
  "/:id/assign",
  verifyAccessToken,
  Role.isOwnerOrManager,
  RolesController.assignRoleToUser
);

router.patch(
  "/assign/:id/update",
  verifyAccessToken,
  Role.isOwnerOrManager,
  RolesController.updateRoleToUser
);

router.patch(
  "/assign/project/remove",
  verifyAccessToken,
  Role.isOwnerOrManager,
  RolesController.removeProjectFromUserRole
);
router.get(
  "/assign/project/access/:id/all",
  verifyAccessToken,
  Role.isOwnerOrManager,
  RolesController.getAllProjectsAssignedToUser
);

export default router;
