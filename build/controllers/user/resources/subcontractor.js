"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = require("../../../utils");
var _models = require("../../../database/models");
class SubcontractorResourceController {
  static async addSubcontractorResouceToProject(req, res) {
    try {
      const {
        projectId
      } = req.params;
      const {
        resourceIds
      } = req.body;
      const {
        id: userId
      } = req.user;
      const project = await _models.Projects.findOne({
        where: {
          id: projectId
        }
      });
      if (!project) {
        return (0, _utils.onError)(res, 404, "Project not found");
      }
      const subcontractors = await _models.SubContractors.findAll({
        where: {
          id: resourceIds
        }
      });

      // create new Usersubcontractors and make the resources;

      for (let subcontractor of subcontractors) {
        const name = subcontractor.name;
        const unit = subcontractor.unit;
        const quantity = subcontractor.quantity;
        const price = subcontractor.price;
        await _models.UserSubContractors.create({
          isResource: true,
          projectId,
          userId,
          name,
          unit,
          quantity,
          price
        });
      }

      // get all resources subcontractor
      const resourceSubcontractor = await _models.UserSubContractors.findAll({
        where: {
          isResource: true,
          projectId
        }
      });
      return (0, _utils.onSuccess)(res, 200, "subcontractor resource added successfully", resourceSubcontractor);
    } catch (error) {
      return (0, _utils.onError)(res, 500, "something went wrong, try again!");
    }
  }
  static async addMySubcontractorResourceToProject(req, res) {
    try {
      const {
        projectId
      } = req.params;
      const {
        resourceIds
      } = req.body;
      const {
        id: userId
      } = req.user;
      const project = await _models.Projects.findOne({
        where: {
          id: projectId
        }
      });
      if (!project) {
        return (0, _utils.onError)(res, 404, "Project not found");
      }

      // find all user subcontractors that has resourceIds
      const subcontractors = await _models.UserSubContractors.findAll({
        where: {
          id: resourceIds,
          projectId: null,
          isResource: false
        }
      });

      // create new Usersubcontractors and make the resources;

      for (let subcontractor of subcontractors) {
        const name = subcontractor.name;
        const unit = subcontractor.unit;
        const quantity = subcontractor.quantity;
        const price = subcontractor.price;
        await _models.UserSubContractors.create({
          isResource: true,
          projectId,
          userId,
          name,
          unit,
          quantity,
          price
        });
      }

      // get all resources subcontractor
      const resourceSubcontractor = await _models.UserSubContractors.findAll({
        where: {
          isResource: true,
          projectId
        }
      });
      return (0, _utils.onSuccess)(res, 200, "subcontractor resource added successfully", resourceSubcontractor);
    } catch (error) {
      return (0, _utils.onError)(res, 500, "something went wrong, try again!");
    }
  }

  // get all subcontractor resource
  static async getAllSubcontractorResourceOfProject(req, res) {
    try {
      const {
        projectId
      } = req.params;
      const project = await _models.Projects.findOne({
        where: {
          id: projectId
        }
      });
      if (!project) {
        return (0, _utils.onError)(res, 404, "Project not found");
      }

      // find all user subcontractors that has resourceIds
      const subcontractors = await _models.UserSubContractors.findAll({
        where: {
          projectId,
          isResource: true
        }
      });
      return (0, _utils.onSuccess)(res, 200, "subcontractor resource returned successfully", subcontractors);
    } catch (error) {
      return (0, _utils.onError)(res, 500, "something went wrong, try again!");
    }
  }

  // get one subcontractor resource
  static async getOneSubcontractorResourceOfProject(req, res) {
    try {
      const {
        projectId,
        id
      } = req.params;
      const project = await _models.Projects.findOne({
        where: {
          id: projectId
        }
      });
      if (!project) {
        return (0, _utils.onError)(res, 404, "Project not found");
      }

      // find all user subcontractors that has resourceIds
      const subcontractors = await _models.UserSubContractors.findOne({
        where: {
          id,
          projectId,
          isResource: true
        }
      });
      return (0, _utils.onSuccess)(res, 200, "subcontractor resource returned successfully", subcontractors);
    } catch (error) {
      return (0, _utils.onError)(res, 500, "something went wrong, try again!");
    }
  }

  // remove subcontractor resource of project.
  static async removeSubcontractorResourceFromProject(req, res) {
    try {
      const {
        projectId
      } = req.params;
      const {
        resourceIds
      } = req.body;
      const project = await _models.Projects.findOne({
        where: {
          id: projectId
        }
      });
      if (!project) {
        return (0, _utils.onError)(res, 404, "Project not found");
      }

      // find all user subcontractors that has resourceIds
      const subcontractor = await _models.UserSubContractors.findAll({
        where: {
          id: resourceIds,
          projectId,
          isResource: true
        }
      });
      if (subcontractor.length === 0) {
        return (0, _utils.onError)(res, 404, "Equipment not found");
      }

      // delete the subcontractor
      await _models.UserSubContractors.destroy({
        where: {
          id: resourceIds,
          projectId,
          isResource: true
        }
      });
      return (0, _utils.onSuccess)(res, 200, "subcontractor resource removed successfully", subcontractor);
    } catch (error) {
      return (0, _utils.onError)(res, 500, "something went wrong, try again!");
    }
  }
}
var _default = exports.default = SubcontractorResourceController;