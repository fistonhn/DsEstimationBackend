"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _models = require("../../database/models");
var _response = require("../../utils/response");
class UserEstimationCategoryController {
  // get all estimation categories
  static async getAll(req, res) {
    try {
      const {
        id: userId,
        managerId,
        role
      } = req.user;
      if (role === "manager" || role === "admin") {
        const categories = await _models.UserEstimationCategory.findAll({
          where: {
            userId: managerId ? managerId : userId,
            projectId: null
          },
          order: [["id", "ASC"]],
          include: [{
            model: _models.UserEstimationSubcategory,
            as: "subcategory",
            attributes: ["id", "name", "code"]
          }]
        });
        return (0, _response.onSuccess)(res, 200, "All estimation categories retrieved successfully", categories);
      }
      if (role === "owner") {
        const categories = await _models.EstimationCategory.findAll({
          where: {
            isApproved: true
          },
          include: [{
            model: _models.EstimationSubcategory,
            as: "subcategory",
            attributes: ["id", "name", "code"]
          }],
          order: [["id", "ASC"]]
        });
        return (0, _response.onSuccess)(res, 200, "All estimation categories retrieved successfully", categories);
      }
    } catch (error) {
      return (0, _response.onError)(res, 500, "something went wrong, try again after 5 minutes, otherwise contact us", error.message);
    }
  }

  // get all category of the project
  static async getAllProjectCategory(req, res) {
    try {
      const {
        id: userId,
        managerId,
        role
      } = req.user;
      const {
        projectId
      } = req.params;
      if (role === "manager" || role === "admin") {
        const categories = await _models.UserEstimationCategory.findAll({
          where: {
            userId: managerId ? managerId : userId,
            projectId
          },
          order: [["id", "ASC"]],
          include: [{
            model: _models.UserEstimationSubcategory,
            as: "subcategory",
            attributes: ["id", "name", "code"]
          }]
        });
        return (0, _response.onSuccess)(res, 200, "All estimation categories retrieved successfully", categories);
      }
      if (role === "owner") {
        const categories = await _models.EstimationCategory.findAll({
          where: {
            isApproved: true,
            templateId: projectId
          },
          include: [{
            model: _models.EstimationSubcategory,
            as: "subcategory",
            attributes: ["id", "name", "code"]
          }],
          order: [["id", "ASC"]]
        });
        return (0, _response.onSuccess)(res, 200, "All estimation categories retrieved successfully", categories);
      }
    } catch (error) {
      return (0, _response.onError)(res, 500, "something went wrong, try again after 5 minutes, otherwise contact us", error.message);
    }
  }

  // get category of project by id
  static async getByIdProjectCategory(req, res) {
    try {
      const {
        id: userId,
        managerId,
        role
      } = req.user;
      const {
        projectId
      } = req.params;
      if (role === "manager" || role === "admin") {
        const category = await _models.UserEstimationCategory.findOne({
          where: {
            id: req.params.id,
            userId: managerId ? managerId : userId,
            projectId
          },
          include: [{
            model: _models.UserEstimationSubcategory,
            as: "subcategory",
            attributes: ["id", "name", "code"]
          }, {
            model: _models.UserEstimations,
            as: "activities"
          }]
        });
        if (!category) {
          return (0, _response.onError)(res, 404, "Estimation category not found");
        }
        const activities = await _models.UserEstimations.findAll({
          where: {
            userEstimationCategoryId: category.id,
            projectId
          }
        });
        return (0, _response.onSuccess)(res, 200, "activities retrieved successfully", activities);
      }
      if (role === "owner") {
        const category = await _models.EstimationCategory.findOne({
          where: {
            id: req.params.id,
            templateId: projectId
          },
          include: [{
            model: _models.EstimationSubcategory,
            as: "subcategory",
            attributes: ["id", "name", "code"]
          }, {
            model: _models.Estimations,
            as: "activities"
          }]
        });
        if (!category) {
          return (0, _response.onError)(res, 404, "Estimation category not found");
        }
        return (0, _response.onSuccess)(res, 200, "Estimation category retrieved successfully", category);
      }
    } catch (error) {
      return (0, _response.onError)(res, 500, "something went wrong, try again after 5 minutes, otherwise contact us", error.message);
    }
  }

  // get estimation category by id
  static async getById(req, res) {
    try {
      const {
        id: userId,
        managerId,
        role
      } = req.user;
      if (role === "manager" || role === "admin") {
        const category = await _models.UserEstimationCategory.findOne({
          where: {
            id: req.params.id,
            userId: managerId ? managerId : userId
          },
          include: [{
            model: _models.UserEstimationSubcategory,
            as: "subcategory",
            attributes: ["id", "name", "code"]
          }]
        });
        if (!category) {
          return (0, _response.onError)(res, 404, "Estimation category not found");
        }
        return (0, _response.onSuccess)(res, 200, "Estimation category retrieved successfully", category);
      }
      if (role === "owner") {
        const category = await _models.EstimationCategory.findOne({
          where: {
            id: req.params.id
          },
          include: [{
            model: _models.EstimationSubcategory,
            as: "subcategory",
            attributes: ["id", "name", "code"]
          }]
        });
        if (!category) {
          return (0, _response.onError)(res, 404, "Estimation category not found");
        }
        return (0, _response.onSuccess)(res, 200, "Estimation category retrieved successfully", category);
      }
    } catch (error) {
      return (0, _response.onError)(res, 500, "something went wrong, try again after 5 minutes, otherwise contact us", error.message);
    }
  }

  // create estimation category
  static async create(req, res) {
    try {
      const {
        id: userId,
        role,
        managerId
      } = req.user;
      if (role === "manager" || role === "admin") {
        const category = await _models.UserEstimationCategory.create({
          ...req.body,
          userId: managerId ? managerId : userId
        });
        await _models.EstimationCategory.create({
          ...req.body,
          userId: managerId ? managerId : userId,
          isApproved: false
        });
        return (0, _response.onSuccess)(res, 201, "Estimation category created successfully", category);
      }
      const category = await _models.EstimationCategory.create({
        ...req.body
      });
      return (0, _response.onSuccess)(res, 201, "Estimation category created successfully", category);
    } catch (error) {
      return (0, _response.onError)(res, 500, "something went wrong, try again after 5 minutes, otherwise contact us", error.message);
    }
  }

  // update estimation category
  static async update(req, res) {
    try {
      const {
        categoryName,
        code
      } = req.body;
      const {
        id: userId,
        role
      } = req.user;
      if (role === "manager" || role === "admin") {
        const category = await _models.UserEstimationCategory.findOne({
          where: {
            id: req.params.id,
            userId: managerId ? managerId : userId
          }
        });
        if (!category) {
          return (0, _response.onError)(res, 404, "Estimation category not found");
        }
        const editedName = categoryName ? categoryName : category.name;
        const editCode = code ? code : category.code;
        category.update({
          name: editedName,
          code: editCode
        });
        return (0, _response.onSuccess)(res, 200, "Estimation category updated successfully", category);
      }
      const category = await _models.EstimationCategory.findOne({
        where: {
          id: req.params.id
        }
      });
      if (!category) {
        return (0, _response.onError)(res, 404, "Estimation category not found");
      }
      const editedName = categoryName ? categoryName : category.name;
      const editCode = code ? code : category.code;
      category.update({
        name: editedName,
        code: editCode
      });
      return (0, _response.onSuccess)(res, 200, "Estimation category updated successfully", category);
    } catch (error) {
      return (0, _response.onError)(res, 500, "something went wrong, try again after 5 minutes, otherwise contact us", error.message);
    }
  }

  // delete estimation category
  static async delete(req, res) {
    try {
      const {
        id: userId,
        role
      } = req.user;
      if (role === "manager" || role === "admin") {
        const category = await _models.UserEstimationCategory.findOne({
          where: {
            id: req.params.id,
            userId: managerId ? managerId : userId
          }
        });
        if (!category) {
          return (0, _response.onError)(res, 404, "Estimation category not found");
        }
        await category.destroy();
        return (0, _response.onSuccess)(res, 200, "Estimation category deleted successfully", category);
      }
      const category = await _models.EstimationCategory.findOne({
        where: {
          id: req.params.id
        }
      });
      if (!category) {
        return (0, _response.onError)(res, 404, "Estimation category not found");
      }
      await category.destroy();
      return (0, _response.onSuccess)(res, 200, "Estimation category deleted successfully", category);
    } catch (error) {
      return (0, _response.onError)(res, 500, "something went wrong, try again after 5 minutes, otherwise contact us", error.message);
    }
  }
}
var _default = exports.default = UserEstimationCategoryController;