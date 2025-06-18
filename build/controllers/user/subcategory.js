"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = require("./../../utils");
var _models = require("../../database/models");
class SubcategoryController {
  // get get all subcategory
  static async getAllSubcategory(req, res) {
    try {
      const {
        role,
        id: userId,
        managerId
      } = req.user;
      if (role === "manager" || role === "admin") {
        const defaultSubcategory = await _models.EstimationSubcategory.findAll({
          where: {
            isApproved: true
          },
          include: [{
            model: _models.EstimationCategory,
            as: "defaultmain_category",
            attributes: ["name", "code", "id"]
          }]
        });
        const userSubcategory = await _models.UserEstimationSubcategory.findAll({
          where: {
            userId: managerId ? managerId : userId
          },
          include: [{
            model: _models.UserEstimationCategory,
            as: "userMainCategory",
            attributes: ["name", "code", "id"]
          }]
        });

        // combine both
        const subcategory = [...defaultSubcategory, ...userSubcategory];
        return (0, _utils.onSuccess)(res, 200, "success", subcategory);
      }
      if (role === "owner") {
        const defaultSubcategory = await _models.EstimationSubcategory.findAll({
          include: [{
            model: _models.EstimationCategory,
            as: "defaultmain_category",
            attributes: ["name", "code", "id"]
          }]
        });
        return (0, _utils.onSuccess)(res, 200, "success", defaultSubcategory);
      }
    } catch (error) {
      console.log(error);
      return (0, _utils.onError)(res, 500, "something went wrong, try again");
    }
  }

  // get subcategory by id
  static async getSubcategoryById(req, res) {
    try {
      const {
        role,
        id: userId,
        managerId
      } = req.user;
      const {
        id
      } = req.params;
      if (role === "manager" || role === "admin") {
        const defaultSubcategory = await _models.EstimationSubcategory.findOne({
          where: {
            id,
            isApproved: true
          },
          include: [{
            model: _models.EstimationCategory,
            as: "defaultmain_category",
            attributes: ["name", "code", "id"]
          }]
        });
        const userSubcategory = await _models.UserEstimationSubcategory.findOne({
          where: {
            id,
            userId: managerId ? managerId : userId
          },
          include: [{
            model: _models.UserEstimationCategory,
            as: "userMainCategory",
            attributes: ["name", "code", "id"]
          }]
        });

        // ceck if both are null
        if (!defaultSubcategory && !userSubcategory) {
          return (0, _utils.onError)(res, 404, "subcategory not found");
        }

        // if user subcategory is not null
        if (userSubcategory) {
          return (0, _utils.onSuccess)(res, 200, "success", userSubcategory);
        }

        // if default subcategory is not null
        if (defaultSubcategory) {
          return (0, _utils.onSuccess)(res, 200, "success", defaultSubcategory);
        }
      }
      if (role === "owner") {
        const defaultSubcategory = await _models.EstimationSubcategory.findOne({
          where: {
            id
          },
          include: [{
            model: _models.EstimationCategory,
            as: "defaultmain_category",
            attributes: ["name", "code", "id"]
          }]
        });
        if (!defaultSubcategory) {
          return (0, _utils.onError)(res, 404, "subcategory not found");
        }
        return (0, _utils.onSuccess)(res, 200, "success", defaultSubcategory);
      }
    } catch (error) {
      return (0, _utils.onError)(res, 500, "something went wrong, try again");
    }
  }

  // get create subcategory
  static async createSubcategory(req, res) {
    try {
      const {
        name,
        code,
        mainCategoryId
      } = req.body;
      const {
        role
      } = req.user;
      if (role === "manager" || role === "admin") {
        if (!mainCategoryId) {
          return (0, _utils.onError)(res, 400, "main category is required");
        }

        // check if main category exist
        const mainCategory = await _models.UserEstimationCategory.findOne({
          where: {
            id: mainCategoryId
          }
        });
        const defaultCategory = await _models.EstimationCategory.findOne({
          where: {
            id: mainCategoryId
          }
        });
        if (!mainCategory && !defaultCategory) {
          return (0, _utils.onError)(res, 404, "main category not found");
        }
        if (mainCategory) {
          const created = await _models.UserEstimationSubcategory.create({
            name,
            code,
            mainCategoryId
          });
          return (0, _utils.onSuccess)(res, 201, "sub category created successfully", created);
        }
        if (defaultCategory) {
          const created = await _models.EstimationSubcategory.create({
            name,
            code,
            mainCategoryId
          });
          return (0, _utils.onSuccess)(res, 201, "sub category created successfully", created);
        }
      }
      if (role === "owner") {
        if (!mainCategoryId) {
          return (0, _utils.onError)(res, 400, "main category is required");
        }

        // check if main category exist
        const mainCategory = await _models.EstimationCategory.findOne({
          where: {
            id: mainCategoryId
          }
        });
        if (!mainCategory) {
          return (0, _utils.onError)(res, 404, "main category not found");
        }
        const created = await _models.EstimationSubcategory.create({
          name,
          code,
          mainCategoryId,
          isApproved: false
        });
        return (0, _utils.onSuccess)(res, 201, "sub category created successfully", created);
      }
    } catch (error) {
      return (0, _utils.onError)(res, 500, "something went wrong, try again");
    }
  }

  // update subcategory

  static async updateSubcategory(req, res) {
    try {
      const {
        name,
        code,
        mainCategoryId
      } = req.body;
      const {
        role
      } = req.user;
      const {
        id
      } = req.params;
      if (role === "manager" || role === "admin") {
        const sub = await _models.UserEstimationSubcategory.findOne({
          where: {
            id
          }
        });
        if (!sub) {
          return (0, _utils.onError)(res, 404, "subcategory not found");
        }
        if (!mainCategoryId) {
          return (0, _utils.onError)(res, 400, "main category is required");
        }

        // check if main category exist
        const mainCategory = await _models.UserEstimationCategory.findOne({
          where: {
            id: mainCategoryId
          }
        });
        if (!mainCategory) {
          return (0, _utils.onError)(res, 404, "main category not found");
        }
        await sub.update({
          name,
          code,
          mainCategoryId
        });
        return (0, _utils.onSuccess)(res, 200, "success", sub);
      }
      if (role === "owner") {
        const sub = await _models.EstimationSubcategory.findOne({
          where: {
            id
          }
        });
        if (!sub) {
          return (0, _utils.onError)(res, 404, "subcategory not found");
        }
        if (!mainCategoryId) {
          return (0, _utils.onError)(res, 400, "main category is required");
        }

        // check if main category exist
        const mainCategory = await _models.EstimationCategory.findOne({
          where: {
            id: mainCategoryId
          }
        });
        if (!mainCategory) {
          return (0, _utils.onError)(res, 404, "main category not found");
        }
        await sub.update({
          name,
          code,
          mainCategoryId
        });
        return (0, _utils.onSuccess)(res, 200, "sub category created successfully", sub);
      }
    } catch (error) {
      return (0, _utils.onError)(res, 500, "something went wrong, try again");
    }
  }

  // approve category
  static async approveSubcategory(req, res) {
    try {
      const category = await _models.EstimationSubcategory.findOne({
        where: {
          id: req.params.id
        }
      });
      if (!category) {
        return (0, _utils.onError)(res, 404, "subcategory not found");
      }
      if (category.isApproved) {
        await category.update({
          isApproved: false
        });
        return (0, _utils.onSuccess)(res, 200, "subcategory Unapproved Successfully", category);
      }
      await category.update({
        isApproved: true
      });
      return (0, _utils.onSuccess)(res, 200, "subcategory approved successfully", category);
    } catch (error) {
      return (0, _utils.onError)(res, 500, "something went wrong");
    }
  }

  // delete subcategory

  static async deleteSubcategory(req, res) {
    try {
      const {
        role
      } = req.user;
      const {
        id
      } = req.params;
      if (role === "manager" || role === "admin") {
        const sub = await _models.UserEstimationSubcategory.findOne({
          where: {
            id
          }
        });
        if (!sub) {
          return (0, _utils.onError)(res, 404, "subcategory not found");
        }
        await sub.destroy();
        return (0, _utils.onSuccess)(res, 200, "success", sub);
      }
      if (role === "owner") {
        const sub = await _models.EstimationSubcategory.findOne({
          where: {
            id
          }
        });
        if (!sub) {
          return (0, _utils.onError)(res, 404, "subcategory not found");
        }
        await sub.destroy();
        return (0, _utils.onSuccess)(res, 200, "sub category created successfully", sub);
      }
    } catch (error) {
      return (0, _utils.onError)(res, 500, "something went wrong, try again");
    }
  }
}
var _default = exports.default = SubcategoryController;