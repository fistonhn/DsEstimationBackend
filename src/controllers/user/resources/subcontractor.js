import { onSuccess, onError } from "../../../utils";
import {
  Projects,
  UserSubContractors,
  SubContractors,
} from "../../../database/models";

class SubcontractorResourceController {
  static async addSubcontractorResouceToProject(req, res) {
    try {
      const { projectId } = req.params;
      const { resourceIds } = req.body;
      const { id: userId } = req.user;

      const project = await Projects.findOne({ where: { id: projectId } });
      if (!project) {
        return onError(res, 404, "Project not found");
      }

      const subcontractors = await SubContractors.findAll({
        where: { id: resourceIds },
      });

      // create new Usersubcontractors and make the resources;

      for (let subcontractor of subcontractors) {
        const name = subcontractor.name;
        const unit = subcontractor.unit;
        const quantity = subcontractor.quantity;
        const price = subcontractor.price;
        await UserSubContractors.create({
          isResource: true,
          projectId,
          userId,
          name,
          unit,
          quantity,
          price,
        });
      }

      // get all resources subcontractor
      const resourceSubcontractor = await UserSubContractors.findAll({
        where: { isResource: true, projectId },
      });

      return onSuccess(
        res,
        200,
        "subcontractor resource added successfully",
        resourceSubcontractor
      );
    } catch (error) {
      return onError(res, 500, "something went wrong, try again!");
    }
  }

  static async addMySubcontractorResourceToProject(req, res) {
    try {
      const { projectId } = req.params;
      const { resourceIds } = req.body;
      const { id: userId } = req.user;

      const project = await Projects.findOne({ where: { id: projectId } });
      if (!project) {
        return onError(res, 404, "Project not found");
      }

      // find all user subcontractors that has resourceIds
      const subcontractors = await UserSubContractors.findAll({
        where: { id: resourceIds, projectId: null, isResource: false },
      });

      // create new Usersubcontractors and make the resources;

      for (let subcontractor of subcontractors) {
        const name = subcontractor.name;
        const unit = subcontractor.unit;
        const quantity = subcontractor.quantity;
        const price = subcontractor.price;

        await UserSubContractors.create({
          isResource: true,
          projectId,
          userId,
          name,
          unit,
          quantity,
          price,
        });
      }

      // get all resources subcontractor
      const resourceSubcontractor = await UserSubContractors.findAll({
        where: { isResource: true, projectId },
      });

      return onSuccess(
        res,
        200,
        "subcontractor resource added successfully",
        resourceSubcontractor
      );
    } catch (error) {
      return onError(res, 500, "something went wrong, try again!");
    }
  }

  // get all subcontractor resource
  static async getAllSubcontractorResourceOfProject(req, res) {
    try {
      const { projectId } = req.params;

      const project = await Projects.findOne({ where: { id: projectId } });
      if (!project) {
        return onError(res, 404, "Project not found");
      }

      // find all user subcontractors that has resourceIds
      const subcontractors = await UserSubContractors.findAll({
        where: { projectId, isResource: true },
      });

      return onSuccess(
        res,
        200,
        "subcontractor resource returned successfully",
        subcontractors
      );
    } catch (error) {
      return onError(res, 500, "something went wrong, try again!");
    }
  }

  // get one subcontractor resource
  static async getOneSubcontractorResourceOfProject(req, res) {
    try {
      const { projectId, id } = req.params;

      const project = await Projects.findOne({ where: { id: projectId } });
      if (!project) {
        return onError(res, 404, "Project not found");
      }

      // find all user subcontractors that has resourceIds
      const subcontractors = await UserSubContractors.findOne({
        where: { id, projectId, isResource: true },
      });

      return onSuccess(
        res,
        200,
        "subcontractor resource returned successfully",
        subcontractors
      );
    } catch (error) {
      return onError(res, 500, "something went wrong, try again!");
    }
  }

  // remove subcontractor resource of project.
  static async removeSubcontractorResourceFromProject(req, res) {
    try {
      const { projectId } = req.params;
      const { resourceIds } = req.body;

      const project = await Projects.findOne({ where: { id: projectId } });
      if (!project) {
        return onError(res, 404, "Project not found");
      }

      // find all user subcontractors that has resourceIds
      const subcontractor = await UserSubContractors.findAll({
        where: { id: resourceIds, projectId, isResource: true },
      });

      if (subcontractor.length === 0) {
        return onError(res, 404, "Equipment not found");
      }

      // delete the subcontractor
      await UserSubContractors.destroy({
        where: { id: resourceIds, projectId, isResource: true },
      });

      return onSuccess(
        res,
        200,
        "subcontractor resource removed successfully",
        subcontractor
      );
    } catch (error) {
      return onError(res, 500, "something went wrong, try again!");
    }
  }
}
export default SubcontractorResourceController;
