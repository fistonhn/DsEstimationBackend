"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = require("../../../utils");
var _models = require("../../../database/models");
class LabourResourceController {
  static async addLabourResouceToProject(req, res) {
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
      const labours = await _models.Labours.findAll({
        where: {
          id: resourceIds
        }
      });

      // create new Userlabours and make the resources;

      for (let labour of labours) {
        const name = labour.name;
        const unit = labour.unit;
        const number = labour.number;
        const caveragePerUnit = labour?.caveragePerUnit;
        const currency = labour?.currency;
        const brand = labour?.brand;
        const wages = labour?.wages;
        await _models.UserLabours.create({
          isResource: true,
          projectId,
          userId,
          name,
          unit,
          number,
          caveragePerUnit,
          currency,
          brand,
          wages
        });
      }

      // get all resources labour
      const resourceMaterial = await _models.UserLabours.findAll({
        where: {
          isResource: true,
          projectId
        }
      });
      return (0, _utils.onSuccess)(res, 200, "labour resource added successfully", resourceMaterial);
    } catch (error) {
      return (0, _utils.onError)(res, 500, "something went wrong, try again!");
    }
  }
  static async addMyLabouresourceToProject(req, res) {
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

      // find all user labours that has resourceIds
      const labours = await _models.UserLabours.findAll({
        where: {
          id: resourceIds,
          projectId: null,
          isResource: false
        }
      });

      // create new Userlabours and make the resources;

      for (let labour of labours) {
        const name = labour.name;
        const unit = labour.unit;
        const number = labour.number;
        const caveragePerUnit = labour?.caveragePerUnit;
        const currency = labour?.currency;
        const brand = labour?.brand;
        const wages = labour?.wages;
        await _models.UserLabours.create({
          isResource: true,
          projectId,
          userId,
          name,
          unit,
          number,
          caveragePerUnit,
          currency,
          brand,
          wages
        });
      }

      // get all resources labour
      const resourceMaterial = await _models.UserLabours.findAll({
        where: {
          isResource: true,
          projectId
        }
      });
      return (0, _utils.onSuccess)(res, 200, "labour resource added successfully", resourceMaterial);
    } catch (error) {
      return (0, _utils.onError)(res, 500, "something went wrong, try again!");
    }
  }

  // get all labour resource
  static async getAllLabourResourceOfProject(req, res) {
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

      // find all user labours that has resourceIds
      const labours = await _models.UserLabours.findAll({
        where: {
          projectId,
          isResource: true
        }
      });
      return (0, _utils.onSuccess)(res, 200, "labour resource returned successfully", labours);
    } catch (error) {
      return (0, _utils.onError)(res, 500, "something went wrong, try again!");
    }
  }

  // get one labour resource
  static async getOneLabourResourceOfProject(req, res) {
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

      // find all user labours that has resourceIds
      const labours = await _models.UserLabours.findOne({
        where: {
          id,
          projectId,
          isResource: true
        }
      });
      return (0, _utils.onSuccess)(res, 200, "labour resource returned successfully", labours);
    } catch (error) {
      return (0, _utils.onError)(res, 500, "something went wrong, try again!");
    }
  }

  // remove labour resource of project.
  static async removeLabourResourceFromProject(req, res) {
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

      // find all user labours that has resourceIds
      const labour = await _models.UserLabours.findAll({
        where: {
          id: resourceIds,
          projectId,
          isResource: true
        }
      });
      if (labour.length === 0) {
        return (0, _utils.onError)(res, 404, "Equipment not found");
      }

      // delete the labour
      await _models.UserLabours.destroy({
        where: {
          id: resourceIds,
          projectId,
          isResource: true
        }
      });
      return (0, _utils.onSuccess)(res, 200, "labour resource removed successfully", labour);
    } catch (error) {
      return (0, _utils.onError)(res, 500, "something went wrong, try again!");
    }
  }
}
var _default = exports.default = LabourResourceController;