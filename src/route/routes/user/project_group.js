import express from "express";
const router = express.Router();
import { ProjectGroupController } from "../../../controllers";
import { verifyAccessToken } from "../../../middlewares";

// routes
router.get(
  "/all",
  verifyAccessToken,
  ProjectGroupController.getAllProjectGroup
);
router.get(
  "/:id",
  verifyAccessToken,
  ProjectGroupController.getOneProjectGroup
);
router.post("/create", verifyAccessToken, ProjectGroupController.createGroup);
router.patch(
  "/:id/update",
  verifyAccessToken,
  ProjectGroupController.updateGroup
);
router.delete(
  "/:id/delete",
  verifyAccessToken,
  ProjectGroupController.deleteGroup
);
router.patch(
  "/:id/add-project",
  verifyAccessToken,
  ProjectGroupController.addProjectToGroup
);
router.patch(
  "/:id/remove-project",
  verifyAccessToken,
  ProjectGroupController.removeProjectFromGroup
);

export default router;
