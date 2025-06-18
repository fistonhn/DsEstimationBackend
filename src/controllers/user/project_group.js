import { onSuccess, onError } from "./../../utils";
import { 
  ProjectGroup, 
  Projects, 
  UserMaterials,
  UserEquipments,
  UserEstimations,
  UserSubContractors,
  UserLabours,
  UserEstimationLibrary,
  UserEstimationCategory
} from "../../database/models";

class ProjectGroupController {
  // get all project groups with is projects
  static async getAllProjectGroup(req, res) {
    try {
      const { id: userId } = req.user;
      const group = await ProjectGroup.findAll({
        where: {
          userId,
        },
        include: [
          {
            model: Projects,
            as: "projects",
          },
        ],
      });

      return onSuccess(res, 200, "success", group);
    } catch (error) {
      console.log(error);
      return onError(res, 500, "something went wrong, try again");
    }
  }

  // get one project group with is projects
  static async getOneProjectGroup(req, res) {
    try {
      const { id: userId } = req.user;
      const {id} = req.params
      const group = await ProjectGroup.findOne({
        where: {
          userId,
          id,
        },
        include: [
          {
            model: Projects,
            as: "projects",
          },
        ],
      });

      return onSuccess(res, 200, "success", group);
    } catch (error) {
      return onError(res, 500, "something went wrong, try again");
    }
  }

  // create project group
  static async createGroup(req, res) {
    try {
      const { id: userId } = req.user;
      const { name } = req.body;
      if (name.trim().length < 3) {
        return onError(
          res,
          400,
          "Project group can not be less than 3 character"
        );
      }

      const created = await ProjectGroup.create({
        name,
        userId,
      });

      return onSuccess(res, 201, "success", created);
    } catch (error) {
      return onError(res, 500, "something went wrong, try again");
    }
  }

  // update project group
  static async updateGroup(req, res) {
    try {
      const { id: userId } = req.user;
      const { id } = req.params;
      const { name } = req.body;
      const group = await ProjectGroup.findOne({
        where: {
          id,
          userId,
        },
      });
      if (!group) {
        return onError(res, 404, "Project group not found");
      }

      await group.update({
        name,
      });

      return onSuccess(res, 200, "success", group);
    } catch (error) {
      return onError(res, 500, "something went wrong, try again");
    }
  }

  // delete project group
  static async deleteGroup(req, res) {
    try {
      const { id: userId } = req.user;
      const { id } = req.params;
      const group = await ProjectGroup.findOne({
        where: {
          userId,
          id,
        },
        include: [
          {
            model: Projects,
            as: "projects",
            include: [
              {
                model: UserEstimations,
                as: 'estimations'
              }
            ]
          },
        ],
      });
      if (!group) {
        return onError(res, 404, "Project group not found");
      }

      // delete all projects in group
      const projects = group?.projects;

      for(let i =0; i<projects.length; i++){
        const projectId = projects[i]?.id;
        const estimations = projects[i]?.estimations;

        await Projects.destroy({
          where: {id: projectId}
        })
        await UserEquipments.destroy({
          where: { projectId },
        });
        await UserMaterials.destroy({
          where: { projectId },
        });
        await UserLabours.destroy({
          where: { projectId },
        });
        await UserSubContractors.destroy({
          where: { projectId },
        });
        await UserEstimationCategory.destroy({
            where: { projectId },
          });

        for(let j = 0; j<estimations.length; j++){
          const activityId = estimations[i]?.id;
          await UserEstimationLibrary.destroy({
            where: { estimationId: activityId },
          });
          await UserEstimations.destroy({
            where: { id: activityId },
          });
          
        }
        
      }

      await group.destroy();

      return onSuccess(res, 200, "project deleted successfully", group);
    } catch (error) {
      console.log(error)
      return onError(res, 500, "something went wrong, try again");
    }
  }

  // add project to project group
  static async addProjectToGroup(req, res) {
    try {
      const { id: userId } = req.user;
      const { id } = req.params;
      const { projectId } = req.body;
      const group = await ProjectGroup.findOne({
        where: {
          id,
          userId,
        },
      });
      if (!group) {
        return onError(res, 404, "Project group not found");
      }

      const project = await Projects.findOne({
        where: {
          id: projectId,
          userId,
        },
      });
      if (!project) {
        return onError(res, 404, "Project not found");
      }

      await project.update({
        groupId: id,
      });

      return onSuccess(res, 200, "project added successfully", group);
    } catch (error) {
      return onError(res, 500, "something went wrong, try again");
    }
  }

  // remove project from project group
  static async removeProjectFromGroup(req, res) {
    try {
      const { id: userId } = req.user;
      const { id } = req.params;
      const { projectId } = req.body;
      const group = await ProjectGroup.findOne({
        where: {
          id,
          userId,
        },
      });
      if (!group) {
        return onError(res, 404, "Project group not found");
      }

      const project = await Projects.findOne({
        where: {
          id: projectId,
          userId,
        },
      });
      if (!project) {
        return onError(res, 404, "Project not found");
      }

      await project.update({
        groupId: null,
      });

      return onSuccess(res, 200, "project removed successfully", group);
    } catch (error) {
      return onError(res, 500, "something went wrong, try again");
    }
  }
}

export default ProjectGroupController;
