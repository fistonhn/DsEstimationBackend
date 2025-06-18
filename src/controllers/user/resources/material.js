import { onSuccess, onError } from "../../../utils";
import { Projects, UserMaterials, Materials } from "../../../database/models";

class MaterialResourceController {
  static async addMaterialResouceToProject(req, res) {
    try {
      const { projectId } = req.params;
      const { resourceIds } = req.body;
      const { id: userId } = req.user;

      const project = await Projects.findOne({ where: { id: projectId } });
      if (!project) {
        return onError(res, 404, "Project not found");
      }

      const materials = await Materials.findAll({
        where: { id: resourceIds },
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
        await UserMaterials.create({
          isResource: true,
          projectId,
          userId,
          name,
          price,
          unit,
          caveragePerUnit,
          currency,
          brand,
          quantity,
        });
      }

      // get all resources material
      const resourceMaterial = await UserMaterials.findAll({
        where: { isResource: true, projectId },
      });

      return onSuccess(
        res,
        200,
        "material resource added successfully",
        resourceMaterial
      );
    } catch (error) {
      return onError(res, 500, "something went wrong, try again!");
    }
  }

  static async addMyMaterialResourceToProject(req, res) {
    try {
      const { projectId } = req.params;
      const { resourceIds } = req.body;
      const { id: userId } = req.user;

      const project = await Projects.findOne({ where: { id: projectId } });
      if (!project) {
        return onError(res, 404, "Project not found");
      }

      // find all user materials that has resourceIds
      const materials = await UserMaterials.findAll({
        where: { id: resourceIds, projectId: null, isResource: false },
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

        await UserMaterials.create({
          isResource: true,
          projectId,
          userId,
          name,
          price,
          unit,
          caveragePerUnit,
          currency,
          brand,
          quantity,
        });
      }

      // get all resources material
      const resourceMaterial = await UserMaterials.findAll({
        where: { isResource: true, projectId },
      });

      return onSuccess(
        res,
        200,
        "material resource added successfully",
        resourceMaterial
      );
    } catch (error) {
      return onError(res, 500, "something went wrong, try again!");
    }
  }

  // get all material resource
  static async getAllMaterialResourceOfProject(req, res) {
    try {
      const { projectId } = req.params;

      const project = await Projects.findOne({ where: { id: projectId } });
      if (!project) {
        return onError(res, 404, "Project not found");
      }

      // find all user materials that has resourceIds
      const materials = await UserMaterials.findAll({
        where: { projectId, isResource: true },
      });

      return onSuccess(
        res,
        200,
        "material resource returned successfully",
        materials
      );
    } catch (error) {
      return onError(res, 500, "something went wrong, try again!");
    }
  }

  // get one material resource
  static async getOneMaterialResourceOfProject(req, res) {
    try {
      const { projectId, id } = req.params;

      const project = await Projects.findOne({ where: { id: projectId } });
      if (!project) {
        return onError(res, 404, "Project not found");
      }

      // find all user materials that has resourceIds
      const materials = await UserMaterials.findOne({
        where: { id, projectId, isResource: true },
      });

      return onSuccess(
        res,
        200,
        "material resource returned successfully",
        materials
      );
    } catch (error) {
      return onError(res, 500, "something went wrong, try again!");
    }
  }

  // remove material resource of project.
  static async removeMaterialResourceFromProject(req, res) {
    try {
      const { projectId } = req.params;
      const { resourceIds } = req.body;

      const project = await Projects.findOne({ where: { id: projectId } });
      if (!project) {
        return onError(res, 404, "Project not found");
      }

      // find all user materials that has resourceIds
      const material = await UserMaterials.findAll({
        where: { id: resourceIds, projectId, isResource: true },
      });

      if (material.length === 0) {
        return onError(res, 404, "Equipment not found");
      }

      // delete the material
      await UserMaterials.destroy({
        where: { id: resourceIds, projectId, isResource: true },
      });

      return onSuccess(
        res,
        200,
        "material resource removed successfully",
        material
      );
    } catch (error) {
      return onError(res, 500, "something went wrong, try again!");
    }
  }
}
export default MaterialResourceController;
