import { onSuccess, onError } from "../../../utils";
import { Projects, UserLabours, Labours } from "../../../database/models";

class LabourResourceController {
  static async addLabourResouceToProject(req, res) {
    try {
      const { projectId } = req.params;
      const { resourceIds } = req.body;
      const { id: userId } = req.user;

      const project = await Projects.findOne({ where: { id: projectId } });
      if (!project) {
        return onError(res, 404, "Project not found");
      }

      const labours = await Labours.findAll({
        where: { id: resourceIds },
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
        await UserLabours.create({
          isResource: true,
          projectId,
          userId,
          name,
          unit,
          number,
          caveragePerUnit,
          currency,
          brand,
          wages,
        });
      }

      // get all resources labour
      const resourceMaterial = await UserLabours.findAll({
        where: { isResource: true, projectId },
      });

      return onSuccess(
        res,
        200,
        "labour resource added successfully",
        resourceMaterial
      );
    } catch (error) {
      return onError(res, 500, "something went wrong, try again!");
    }
  }

  static async addMyLabouresourceToProject(req, res) {
    try {
      const { projectId } = req.params;
      const { resourceIds } = req.body;
      const { id: userId } = req.user;

      const project = await Projects.findOne({ where: { id: projectId } });
      if (!project) {
        return onError(res, 404, "Project not found");
      }

      // find all user labours that has resourceIds
      const labours = await UserLabours.findAll({
        where: { id: resourceIds, projectId: null, isResource: false },
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

        await UserLabours.create({
          isResource: true,
          projectId,
          userId,
          name,
          unit,
          number,
          caveragePerUnit,
          currency,
          brand,
          wages,
        });
      }

      // get all resources labour
      const resourceMaterial = await UserLabours.findAll({
        where: { isResource: true, projectId },
      });

      return onSuccess(
        res,
        200,
        "labour resource added successfully",
        resourceMaterial
      );
    } catch (error) {
      return onError(res, 500, "something went wrong, try again!");
    }
  }

  // get all labour resource
  static async getAllLabourResourceOfProject(req, res) {
    try {
      const { projectId } = req.params;

      const project = await Projects.findOne({ where: { id: projectId } });
      if (!project) {
        return onError(res, 404, "Project not found");
      }

      // find all user labours that has resourceIds
      const labours = await UserLabours.findAll({
        where: { projectId, isResource: true },
      });

      return onSuccess(
        res,
        200,
        "labour resource returned successfully",
        labours
      );
    } catch (error) {
      return onError(res, 500, "something went wrong, try again!");
    }
  }

  // get one labour resource
  static async getOneLabourResourceOfProject(req, res) {
    try {
      const { projectId, id } = req.params;

      const project = await Projects.findOne({ where: { id: projectId } });
      if (!project) {
        return onError(res, 404, "Project not found");
      }

      // find all user labours that has resourceIds
      const labours = await UserLabours.findOne({
        where: { id, projectId, isResource: true },
      });

      return onSuccess(
        res,
        200,
        "labour resource returned successfully",
        labours
      );
    } catch (error) {
      return onError(res, 500, "something went wrong, try again!");
    }
  }

  // remove labour resource of project.
  static async removeLabourResourceFromProject(req, res) {
    try {
      const { projectId } = req.params;
      const { resourceIds } = req.body;

      const project = await Projects.findOne({ where: { id: projectId } });
      if (!project) {
        return onError(res, 404, "Project not found");
      }

      // find all user labours that has resourceIds
      const labour = await UserLabours.findAll({
        where: { id: resourceIds, projectId, isResource: true },
      });

      if (labour.length === 0) {
        return onError(res, 404, "Equipment not found");
      }

      // delete the labour
      await UserLabours.destroy({
        where: { id: resourceIds, projectId, isResource: true },
      });

      return onSuccess(
        res,
        200,
        "labour resource removed successfully",
        labour
      );
    } catch (error) {
      return onError(res, 500, "something went wrong, try again!");
    }
  }
}
export default LabourResourceController;
