"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _models = require("../../database/models");
var _response = require("../../utils/response");
class EstimationCategoryController {
  // get all estimation categories
  static async getAll(req, res) {
    try {
      // sort in ascending order
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
    } catch (error) {
      console.log("error", error);
      return (0, _response.onError)(res, 500, "something went wrong, try again after 5 minutes, otherwise contact us", error.message);
    }
  }

  // get all un-verified category
  static async getAllUnverifiedCategory(req, res) {
    try {
      const categories = await _models.EstimationCategory.findAll({
        where: {
          isApproved: false
        }
      });
      return (0, _response.onSuccess)(res, 200, "activity retrieved successfully", categories);
    } catch (error) {
      return (0, _response.onError)(res, 500, "something went wrong");
    }
  }

  // approve category
  static async approveCategory(req, res) {
    try {
      const category = await _models.EstimationCategory.findOne({
        where: {
          id: req.params.id
        }
      });
      if (!category) {
        return (0, _response.onError)(res, 404, "Category not found");
      }
      if (category.isApproved) {
        await category.update({
          isApproved: false
        });
        return (0, _response.onSuccess)(res, 200, "Category Unapproved Successfully", category);
      }
      await category.update({
        isApproved: true
      });
      return (0, _response.onSuccess)(res, 200, "Category approved successfully", category);
    } catch (error) {
      return (0, _response.onError)(res, 500, "something went wrong");
    }
  }

  // get estimation category by id
  static async getById(req, res) {
    try {
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
    } catch (error) {
      return (0, _response.onError)(res, 500, "something went wrong, try again after 5 minutes, otherwise contact us", error.message);
    }
  }

  // create estimation category
  static async create(req, res) {
    try {
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
      const category = await _models.EstimationCategory.findOne({
        where: {
          id: req.params.id
        }
      });
      if (!category) {
        return (0, _response.onError)(res, 404, "Estimation category not found");
      }
      await category.update({
        ...req.body
      });
      return (0, _response.onSuccess)(res, 200, "Estimation category updated successfully", category);
    } catch (error) {
      return (0, _response.onError)(res, 500, "something went wrong, try again after 5 minutes, otherwise contact us", error.message);
    }
  }

  // delete estimation category
  static async delete(req, res) {
    try {
      const category = await _models.EstimationCategory.findOne({
        where: {
          id: req.params.id
        }
      });
      if (!category) {
        return (0, _response.onError)(res, 404, "Estimation category not found");
      }
      await category.destroy();
      return (0, _response.onSuccess)(res, 200, "Estimation category deleted successfully");
    } catch (error) {
      return (0, _response.onError)(res, 500, "something went wrong, try again after 5 minutes, otherwise contact us", error.message);
    }
  }
}
var _default = exports.default = EstimationCategoryController;