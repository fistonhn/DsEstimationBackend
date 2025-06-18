"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = require("../../../utils");
var _models = require("../../../database/models");
class MaterialResourceController {
  static async addMaterialResouceToProject(req, res) {
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
      const materials = await _models.Materials.findAll({
        where: {
          id: resourceIds
        }
      });

      // create new Usermaterials and make the resources;

      for (let material of materials) {
        const name = material.name;
        const price = material.price;
        const unit = material.unit;
        const caveragePerUnit = material?.caveragePerUnit;
        const currency = material?.currency;
        const brand = material?.brand;
        const quantity = material?.quantity;
        await _models.UserMaterials.create({
          isResource: true,
          projectId,
          userId,
          name,
          price,
          unit,
          caveragePerUnit,
          currency,
          brand,
          quantity
        });
      }

      // get all resources material
      const resourceMaterial = await _models.UserMaterials.findAll({
        where: {
          isResource: true,
          projectId
        }
      });
      return (0, _utils.onSuccess)(res, 200, "material resource added successfully", resourceMaterial);
    } catch (error) {
      return (0, _utils.onError)(res, 500, "something went wrong, try again!");
    }
  }
  static async addMyMaterialResourceToProject(req, res) {
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

      // find all user materials that has resourceIds
      const materials = await _models.UserMaterials.findAll({
        where: {
          id: resourceIds,
          projectId: null,
          isResource: false
        }
      });

      // create new Usermaterials and make the resources;

      for (let material of materials) {
        const name = material.name;
        const price = material.price;
        const unit = material.unit;
        const caveragePerUnit = material?.caveragePerUnit;
        const currency = material?.currency;
        const brand = material?.brand;
        const quantity = material?.quantity;
        await _models.UserMaterials.create({
          isResource: true,
          projectId,
          userId,
          name,
          price,
          unit,
          caveragePerUnit,
          currency,
          brand,
          quantity
        });
      }

      // get all resources material
      const resourceMaterial = await _models.UserMaterials.findAll({
        where: {
          isResource: true,
          projectId
        }
      });
      return (0, _utils.onSuccess)(res, 200, "material resource added successfully", resourceMaterial);
    } catch (error) {
      return (0, _utils.onError)(res, 500, "something went wrong, try again!");
    }
  }

  // get all material resource
  static async getAllMaterialResourceOfProject(req, res) {
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

      // find all user materials that has resourceIds
      const materials = await _models.UserMaterials.findAll({
        where: {
          projectId,
          isResource: true
        }
      });
      return (0, _utils.onSuccess)(res, 200, "material resource returned successfully", materials);
    } catch (error) {
      return (0, _utils.onError)(res, 500, "something went wrong, try again!");
    }
  }

  // get one material resource
  static async getOneMaterialResourceOfProject(req, res) {
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

      // find all user materials that has resourceIds
      const materials = await _models.UserMaterials.findOne({
        where: {
          id,
          projectId,
          isResource: true
        }
      });
      return (0, _utils.onSuccess)(res, 200, "material resource returned successfully", materials);
    } catch (error) {
      return (0, _utils.onError)(res, 500, "something went wrong, try again!");
    }
  }

  // remove material resource of project.
  static async removeMaterialResourceFromProject(req, res) {
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

      // find all user materials that has resourceIds
      const material = await _models.UserMaterials.findAll({
        where: {
          id: resourceIds,
          projectId,
          isResource: true
        }
      });
      if (material.length === 0) {
        return (0, _utils.onError)(res, 404, "Equipment not found");
      }

      // delete the material
      await _models.UserMaterials.destroy({
        where: {
          id: resourceIds,
          projectId,
          isResource: true
        }
      });
      return (0, _utils.onSuccess)(res, 200, "material resource removed successfully", material);
    } catch (error) {
      return (0, _utils.onError)(res, 500, "something went wrong, try again!");
    }
  }
}
var _default = exports.default = MaterialResourceController;