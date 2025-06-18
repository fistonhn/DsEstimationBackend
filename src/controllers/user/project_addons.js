import { onSuccess, onError } from "./../../utils";
import {
  ProjectAddons,
  Projects,
  UserMaterials,
  UserEquipments,
  UserEstimations,
  UserSubContractors,
  UserLabours,
  UserEstimationLibrary,
  UserEstimationCategory,
} from "../../database/models";

class ProjectAddonsController {
  // create addons
  static async createAddons(req, res) {
    try {
      const { projectId } = req.params;
      const addons = await ProjectAddons.create({
        ...req.body,
        projectId,
      });
      return onSuccess(res, 201, "addons added successfully", addons);
    } catch (error) {
      console.log(error);
      return onError(res, 500, "something went wrong, try again");
    }
  }

  // update addons
  static async updateAddons(req, res) {
    try {
      const { projectId } = req.params;
      const { id } = req.params;
      const addons = await ProjectAddons.findOne({
        where: { id },
      });
      if (!addons) {
        return onError(res, 404, "addons not found");
      }
      await addons.update({
        ...req.body,
        projectId,
      });
      return onSuccess(res, 200, "addons updated successfully", addons);
    } catch (error) {
      return onError(res, 500, "something went wrong, try again");
    }
  }

  // delete addons
  static async deleteAddons(req, res) {
    try {
      const { id, projectId } = req.params;
      const addons = await ProjectAddons.findOne({
        where: { id, projectId },
      });
      if (!addons) {
        return onError(res, 404, "addons not found");
      }
      await addons.destroy();
      return onSuccess(res, 200, "addons deleted successfully");
    } catch (error) {
      return onError(res, 500, "something went wrong, try again");
    }
  }

  // get all addons
  static async getAllAddons(req, res) {
    try {
      const { projectId } = req.params;
      const addons = await ProjectAddons.findAll({
        where: { projectId },
        include: [
          {
            model: Projects,
            as: "project_addons",
          },
        ],
      });
      if (!addons) {
        return onError(res, 404, "addons not found");
      }
      return onSuccess(res, 200, "addons found", addons);
    } catch (error) {
      console.log(error);
      return onError(res, 500, "something went wrong, try again");
    }
  }

  // get single addons
  static async getSingleAddons(req, res) {
    try {
      const { id, projectId } = req.params;
      const addons = await ProjectAddons.findOne({
        where: { id, projectId },
        include: [
          {
            model: Projects,
            as: "project_addons",
          },
        ],
      });
      if (!addons) {
        return onError(res, 404, "addons not found");
      }
      return onSuccess(res, 200, "addons found", addons);
    } catch (error) {
      console.log(error);
      return onError(res, 500, "something went wrong, try again");
    }
  }
}

export default ProjectAddonsController;
