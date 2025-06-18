import {
  UserEstimationCategory,
  EstimationCategory,
  UserEstimationSubcategory,
  EstimationSubcategory,
  UserEstimations,
  Estimations,
} from "../../database/models";
import { onError, onSuccess } from "../../utils/response";

class UserEstimationCategoryController {
  // get all estimation categories
  static async getAll(req, res) {
    try {
      const { id: userId, managerId, role } = req.user;
      if (role === "manager" || role === "admin") {
        const categories = await UserEstimationCategory.findAll({
          where: { userId: managerId ? managerId : userId, projectId: null },
          order: [["id", "ASC"]],
          include: [
            {
              model: UserEstimationSubcategory,
              as: "subcategory",
              attributes: ["id", "name", "code"],
            },
          ],
        });
        return onSuccess(
          res,
          200,
          "All estimation categories retrieved successfully",
          categories
        );
      }

      if (role === "owner") {
        const categories = await EstimationCategory.findAll({
          where: { isApproved: true },
          include: [
            {
              model: EstimationSubcategory,
              as: "subcategory",
              attributes: ["id", "name", "code"],
            },
          ],
          order: [["id", "ASC"]],
        });
        return onSuccess(
          res,
          200,
          "All estimation categories retrieved successfully",
          categories
        );
      }
    } catch (error) {
      return onError(
        res,
        500,
        "something went wrong, try again after 5 minutes, otherwise contact us",
        error.message
      );
    }
  }

  // get all category of the project
  static async getAllProjectCategory(req, res) {
    try {
      const { id: userId, managerId, role } = req.user;
      const { projectId } = req.params;
      if (role === "manager" || role === "admin") {
        const categories = await UserEstimationCategory.findAll({
          where: { userId: managerId ? managerId : userId, projectId },
          order: [["id", "ASC"]],
          include: [
            {
              model: UserEstimationSubcategory,
              as: "subcategory",
              attributes: ["id", "name", "code"],
            },
          ],
        });
        return onSuccess(
          res,
          200,
          "All estimation categories retrieved successfully",
          categories
        );
      }

      if (role === "owner") {
        const categories = await EstimationCategory.findAll({
          where: { isApproved: true, templateId: projectId },
          include: [
            {
              model: EstimationSubcategory,
              as: "subcategory",
              attributes: ["id", "name", "code"],
            },
          ],
          order: [["id", "ASC"]],
        });
        return onSuccess(
          res,
          200,
          "All estimation categories retrieved successfully",
          categories
        );
      }
    } catch (error) {
      return onError(
        res,
        500,
        "something went wrong, try again after 5 minutes, otherwise contact us",
        error.message
      );
    }
  }

  // get category of project by id
  static async getByIdProjectCategory(req, res) {
    try {
      const { id: userId, managerId, role } = req.user;
      const { projectId } = req.params;

      if (role === "manager" || role === "admin") {
        const category = await UserEstimationCategory.findOne({
          where: {
            id: req.params.id,
            userId: managerId ? managerId : userId,
            projectId,
          },
          include: [
            {
              model: UserEstimationSubcategory,
              as: "subcategory",
              attributes: ["id", "name", "code"],
            },
            {
              model: UserEstimations,
              as: "activities",
            },
          ],
        });
        if (!category) {
          return onError(res, 404, "Estimation category not found");
        }
        const activities = await UserEstimations.findAll({
          where: { userEstimationCategoryId: category.id, projectId },
        });

        return onSuccess(
          res,
          200,
          "activities retrieved successfully",
          activities
        );
      }

      if (role === "owner") {
        const category = await EstimationCategory.findOne({
          where: { id: req.params.id, templateId: projectId },
          include: [
            {
              model: EstimationSubcategory,
              as: "subcategory",
              attributes: ["id", "name", "code"],
            },
            {
              model: Estimations,
              as: "activities",
            },
          ],
        });
        if (!category) {
          return onError(res, 404, "Estimation category not found");
        }
        return onSuccess(
          res,
          200,
          "Estimation category retrieved successfully",
          category
        );
      }
    } catch (error) {
      return onError(
        res,
        500,
        "something went wrong, try again after 5 minutes, otherwise contact us",
        error.message
      );
    }
  }

  // get estimation category by id
  static async getById(req, res) {
    try {
      const { id: userId, managerId, role } = req.user;

      if (role === "manager" || role === "admin") {
        const category = await UserEstimationCategory.findOne({
          where: { id: req.params.id, userId: managerId ? managerId : userId },
          include: [
            {
              model: UserEstimationSubcategory,
              as: "subcategory",
              attributes: ["id", "name", "code"],
            },
          ],
        });
        if (!category) {
          return onError(res, 404, "Estimation category not found");
        }
        return onSuccess(
          res,
          200,
          "Estimation category retrieved successfully",
          category
        );
      }

      if (role === "owner") {
        const category = await EstimationCategory.findOne({
          where: { id: req.params.id },
          include: [
            {
              model: EstimationSubcategory,
              as: "subcategory",
              attributes: ["id", "name", "code"],
            },
          ],
        });
        if (!category) {
          return onError(res, 404, "Estimation category not found");
        }
        return onSuccess(
          res,
          200,
          "Estimation category retrieved successfully",
          category
        );
      }
    } catch (error) {
      return onError(
        res,
        500,
        "something went wrong, try again after 5 minutes, otherwise contact us",
        error.message
      );
    }
  }

  // create estimation category
  static async create(req, res) {
    try {
      const { id: userId, role, managerId } = req.user;
      if (role === "manager" || role === "admin") {
        const category = await UserEstimationCategory.create({
          ...req.body,
          userId: managerId ? managerId : userId,
        });
        await EstimationCategory.create({
          ...req.body,
          userId: managerId ? managerId : userId,
          isApproved: false,
        });
        return onSuccess(
          res,
          201,
          "Estimation category created successfully",
          category
        );
      }

      const category = await EstimationCategory.create({
        ...req.body,
      });
      return onSuccess(
        res,
        201,
        "Estimation category created successfully",
        category
      );
    } catch (error) {
      return onError(
        res,
        500,
        "something went wrong, try again after 5 minutes, otherwise contact us",
        error.message
      );
    }
  }

  // update estimation category
  static async update(req, res) {
    try {
      const { categoryName, code } = req.body;
      const { id: userId, role } = req.user;
      if (role === "manager" || role === "admin") {
        const category = await UserEstimationCategory.findOne({
          where: { id: req.params.id, userId: managerId ? managerId : userId },
        });
        if (!category) {
          return onError(res, 404, "Estimation category not found");
        }

        const editedName = categoryName ? categoryName : category.name;
        const editCode = code ? code : category.code;

        category.update({
          name: editedName,
          code: editCode,
        });

        return onSuccess(
          res,
          200,
          "Estimation category updated successfully",
          category
        );
      }

      const category = await EstimationCategory.findOne({
        where: { id: req.params.id },
      });

      if (!category) {
        return onError(res, 404, "Estimation category not found");
      }
      const editedName = categoryName ? categoryName : category.name;
      const editCode = code ? code : category.code;
      category.update({ name: editedName, code: editCode });

      return onSuccess(
        res,
        200,
        "Estimation category updated successfully",
        category
      );
    } catch (error) {
      return onError(
        res,
        500,
        "something went wrong, try again after 5 minutes, otherwise contact us",
        error.message
      );
    }
  }

  // delete estimation category
  static async delete(req, res) {
    try {
      const { id: userId, role } = req.user;
      if (role === "manager" || role === "admin") {
        const category = await UserEstimationCategory.findOne({
          where: { id: req.params.id, userId: managerId ? managerId : userId },
        });
        if (!category) {
          return onError(res, 404, "Estimation category not found");
        }
        await category.destroy();
        return onSuccess(
          res,
          200,
          "Estimation category deleted successfully",
          category
        );
      }
      const category = await EstimationCategory.findOne({
        where: { id: req.params.id },
      });
      if (!category) {
        return onError(res, 404, "Estimation category not found");
      }
      await category.destroy();
      return onSuccess(
        res,
        200,
        "Estimation category deleted successfully",
        category
      );
    } catch (error) {
      return onError(
        res,
        500,
        "something went wrong, try again after 5 minutes, otherwise contact us",
        error.message
      );
    }
  }
}

export default UserEstimationCategoryController;
