"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = require("./../../utils");
var _models = require("../../database/models");
class ProjectAddonsController {
  // create addons
  static async createAddons(req, res) {
    try {
      const {
        projectId
      } = req.params;
      const addons = await _models.ProjectAddons.create({
        ...req.body,
        projectId
      });
      return (0, _utils.onSuccess)(res, 201, "addons added successfully", addons);
    } catch (error) {
      console.log(error);
      return (0, _utils.onError)(res, 500, "something went wrong, try again");
    }
  }

  // update addons
  static async updateAddons(req, res) {
    try {
      const {
        projectId
      } = req.params;
      const {
        id
      } = req.params;
      const addons = await _models.ProjectAddons.findOne({
        where: {
          id
        }
      });
      if (!addons) {
        return (0, _utils.onError)(res, 404, "addons not found");
      }
      await addons.update({
        ...req.body,
        projectId
      });
      return (0, _utils.onSuccess)(res, 200, "addons updated successfully", addons);
    } catch (error) {
      return (0, _utils.onError)(res, 500, "something went wrong, try again");
    }
  }

  // delete addons
  static async deleteAddons(req, res) {
    try {
      const {
        id,
        projectId
      } = req.params;
      const addons = await _models.ProjectAddons.findOne({
        where: {
          id,
          projectId
        }
      });
      if (!addons) {
        return (0, _utils.onError)(res, 404, "addons not found");
      }
      await addons.destroy();
      return (0, _utils.onSuccess)(res, 200, "addons deleted successfully");
    } catch (error) {
      return (0, _utils.onError)(res, 500, "something went wrong, try again");
    }
  }

  // get all addons
  static async getAllAddons(req, res) {
    try {
      const {
        projectId
      } = req.params;
      const addons = await _models.ProjectAddons.findAll({
        where: {
          projectId
        },
        include: [{
          model: _models.Projects,
          as: "project_addons"
        }]
      });
      if (!addons) {
        return (0, _utils.onError)(res, 404, "addons not found");
      }
      return (0, _utils.onSuccess)(res, 200, "addons found", addons);
    } catch (error) {
      console.log(error);
      return (0, _utils.onError)(res, 500, "something went wrong, try again");
    }
  }

  // get single addons
  static async getSingleAddons(req, res) {
    try {
      const {
        id,
        projectId
      } = req.params;
      const addons = await _models.ProjectAddons.findOne({
        where: {
          id,
          projectId
        },
        include: [{
          model: _models.Projects,
          as: "project_addons"
        }]
      });
      if (!addons) {
        return (0, _utils.onError)(res, 404, "addons not found");
      }
      return (0, _utils.onSuccess)(res, 200, "addons found", addons);
    } catch (error) {
      console.log(error);
      return (0, _utils.onError)(res, 500, "something went wrong, try again");
    }
  }
}
var _default = exports.default = ProjectAddonsController;