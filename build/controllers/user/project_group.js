"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = require("./../../utils");
var _models = require("../../database/models");
class ProjectGroupController {
  // get all project groups with is projects
  static async getAllProjectGroup(req, res) {
    try {
      const {
        id: userId
      } = req.user;
      const group = await _models.ProjectGroup.findAll({
        where: {
          userId
        },
        include: [{
          model: _models.Projects,
          as: "projects"
        }]
      });
      return (0, _utils.onSuccess)(res, 200, "success", group);
    } catch (error) {
      console.log(error);
      return (0, _utils.onError)(res, 500, "something went wrong, try again");
    }
  }

  // get one project group with is projects
  static async getOneProjectGroup(req, res) {
    try {
      const {
        id: userId
      } = req.user;
      const {
        id
      } = req.params;
      const group = await _models.ProjectGroup.findOne({
        where: {
          userId,
          id
        },
        include: [{
          model: _models.Projects,
          as: "projects"
        }]
      });
      return (0, _utils.onSuccess)(res, 200, "success", group);
    } catch (error) {
      return (0, _utils.onError)(res, 500, "something went wrong, try again");
    }
  }

  // create project group
  static async createGroup(req, res) {
    try {
      const {
        id: userId
      } = req.user;
      const {
        name
      } = req.body;
      if (name.trim().length < 3) {
        return (0, _utils.onError)(res, 400, "Project group can not be less than 3 character");
      }
      const created = await _models.ProjectGroup.create({
        name,
        userId
      });
      return (0, _utils.onSuccess)(res, 201, "success", created);
    } catch (error) {
      return (0, _utils.onError)(res, 500, "something went wrong, try again");
    }
  }

  // update project group
  static async updateGroup(req, res) {
    try {
      const {
        id: userId
      } = req.user;
      const {
        id
      } = req.params;
      const {
        name
      } = req.body;
      const group = await _models.ProjectGroup.findOne({
        where: {
          id,
          userId
        }
      });
      if (!group) {
        return (0, _utils.onError)(res, 404, "Project group not found");
      }
      await group.update({
        name
      });
      return (0, _utils.onSuccess)(res, 200, "success", group);
    } catch (error) {
      return (0, _utils.onError)(res, 500, "something went wrong, try again");
    }
  }

  // delete project group
  static async deleteGroup(req, res) {
    try {
      const {
        id: userId
      } = req.user;
      const {
        id
      } = req.params;
      const group = await _models.ProjectGroup.findOne({
        where: {
          userId,
          id
        },
        include: [{
          model: _models.Projects,
          as: "projects",
          include: [{
            model: _models.UserEstimations,
            as: 'estimations'
          }]
        }]
      });
      if (!group) {
        return (0, _utils.onError)(res, 404, "Project group not found");
      }

      // delete all projects in group
      const projects = group?.projects;
      for (let i = 0; i < projects.length; i++) {
        const projectId = projects[i]?.id;
        const estimations = projects[i]?.estimations;
        await _models.Projects.destroy({
          where: {
            id: projectId
          }
        });
        await _models.UserEquipments.destroy({
          where: {
            projectId
          }
        });
        await _models.UserMaterials.destroy({
          where: {
            projectId
          }
        });
        await _models.UserLabours.destroy({
          where: {
            projectId
          }
        });
        await _models.UserSubContractors.destroy({
          where: {
            projectId
          }
        });
        await _models.UserEstimationCategory.destroy({
          where: {
            projectId
          }
        });
        for (let j = 0; j < estimations.length; j++) {
          const activityId = estimations[i]?.id;
          await _models.UserEstimationLibrary.destroy({
            where: {
              estimationId: activityId
            }
          });
          await _models.UserEstimations.destroy({
            where: {
              id: activityId
            }
          });
        }
      }
      await group.destroy();
      return (0, _utils.onSuccess)(res, 200, "project deleted successfully", group);
    } catch (error) {
      console.log(error);
      return (0, _utils.onError)(res, 500, "something went wrong, try again");
    }
  }

  // add project to project group
  static async addProjectToGroup(req, res) {
    try {
      const {
        id: userId
      } = req.user;
      const {
        id
      } = req.params;
      const {
        projectId
      } = req.body;
      const group = await _models.ProjectGroup.findOne({
        where: {
          id,
          userId
        }
      });
      if (!group) {
        return (0, _utils.onError)(res, 404, "Project group not found");
      }
      const project = await _models.Projects.findOne({
        where: {
          id: projectId,
          userId
        }
      });
      if (!project) {
        return (0, _utils.onError)(res, 404, "Project not found");
      }
      await project.update({
        groupId: id
      });
      return (0, _utils.onSuccess)(res, 200, "project added successfully", group);
    } catch (error) {
      return (0, _utils.onError)(res, 500, "something went wrong, try again");
    }
  }

  // remove project from project group
  static async removeProjectFromGroup(req, res) {
    try {
      const {
        id: userId
      } = req.user;
      const {
        id
      } = req.params;
      const {
        projectId
      } = req.body;
      const group = await _models.ProjectGroup.findOne({
        where: {
          id,
          userId
        }
      });
      if (!group) {
        return (0, _utils.onError)(res, 404, "Project group not found");
      }
      const project = await _models.Projects.findOne({
        where: {
          id: projectId,
          userId
        }
      });
      if (!project) {
        return (0, _utils.onError)(res, 404, "Project not found");
      }
      await project.update({
        groupId: null
      });
      return (0, _utils.onSuccess)(res, 200, "project removed successfully", group);
    } catch (error) {
      return (0, _utils.onError)(res, 500, "something went wrong, try again");
    }
  }
}
var _default = exports.default = ProjectGroupController;