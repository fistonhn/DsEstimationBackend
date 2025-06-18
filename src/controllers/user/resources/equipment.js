import { onSuccess, onError } from "../../../utils";
import { Projects, UserEquipments, Equipments } from "../../../database/models";

class EquipmentResourceController {
  static async addEquipmentResoucesToProject(req, res) {
    try {
      const { projectId } = req.params;
      const { resourceIds } = req.body;
      const { id: userId } = req.user;

      const project = await Projects.findOne({ where: { id: projectId } });
      if (!project) {
        return onError(res, 404, "Project not found");
      }

      const equipments = await Equipments.findAll({
        where: { id: resourceIds },
      });

      // create new Userequipments and make the resources;

      for (let equipment of equipments) {
        const name = equipment.name;
        const hireRatePrice = equipment.hireRatePrice;
        const unit = equipment.unit;
        const caveragePerUnit = equipment?.caveragePerUnit;
        const currency = equipment?.currency;
        const brand = equipment?.brand;
        const number = equipment?.number;
        await UserEquipments.create({
          isResource: true,
          projectId,
          userId,
          name,
          hireRatePrice,
          unit,
          caveragePerUnit,
          currency,
          brand,
          number,
        });
      }

      // get all resources equipment
      const resourceEquipment = await UserEquipments.findAll({
        where: { isResource: true, projectId },
      });

      return onSuccess(
        res,
        200,
        "equipment resource added successfully",
        resourceEquipment
      );
    } catch (error) {
      console.log(error);
      return onError(res, 500, "something went wrong, try again!");
    }
  }

  static async addMyEquipmentResoucesToProject(req, res) {
    try {
      const { projectId } = req.params;
      const { equipmentIds } = req.body;

      const project = await Projects.findOne({ where: { id: projectId } });
      if (!project) {
        return onError(res, 404, "Project not found");
      }

      // find all user equipments that has equipmentIds
      const equipments = await UserEquipments.findAll({
        where: { id: equipmentIds, projectId: null, isResource: false },
      });

      // create new Userequipments and make the resources;

      for (let equipment of equipments) {
        await UserEquipments.create({
          ...equipment,
          isResource: true,
          projectId,
        });
      }

      // get all resources equipment
      const resourceEquipment = await UserEquipments.findAll({
        where: { isResource: true, projectId },
      });

      return onSuccess(
        res,
        200,
        "equipment resource added successfully",
        resourceEquipment
      );
    } catch (error) {
      return onError(res, 500, "something went wrong, try again!");
    }
  }

  // get all equipment resource
  static async getAllEquipmentResoucesOfProject(req, res) {
    try {
      const { projectId } = req.params;

      const project = await Projects.findOne({ where: { id: projectId } });
      if (!project) {
        return onError(res, 404, "Project not found");
      }

      // find all user equipments that has equipmentIds
      const equipments = await UserEquipments.findAll({
        where: { projectId, isResource: true },
      });

      return onSuccess(
        res,
        200,
        "equipment resource returned successfully",
        equipments
      );
    } catch (error) {
      return onError(res, 500, "something went wrong, try again!");
    }
  }

  // get one equipment resource
  static async getOneEquipmentResoucesOfProject(req, res) {
    try {
      const { projectId, id } = req.params;

      const project = await Projects.findOne({ where: { id: projectId } });
      if (!project) {
        return onError(res, 404, "Project not found");
      }

      // find all user equipments that has equipmentIds
      const equipments = await UserEquipments.findOne({
        where: { id, projectId, isResource: true },
      });

      return onSuccess(
        res,
        200,
        "equipment resource returned successfully",
        equipments
      );
    } catch (error) {
      return onError(res, 500, "something went wrong, try again!");
    }
  }

  // remove equipment resource of project.
  static async removeEquipmentResourceFromProject(req, res) {
    try {
      const { projectId } = req.params;
      const { resourceIds } = req.body;

      const project = await Projects.findOne({ where: { id: projectId } });
      if (!project) {
        return onError(res, 404, "Project not found");
      }

      // find all user equipments that has resourceIds
      const equipment = await UserEquipments.findAll({
        where: { id: resourceIds, projectId, isResource: true },
      });

      if (equipment.length === 0) {
        return onError(res, 404, "Equipment not found");
      }

      // delete the equipment
      await UserEquipments.destroy({
        where: { id: resourceIds, projectId, isResource: true },
      });

      return onSuccess(
        res,
        200,
        "equipment resource removed successfully",
        equipment
      );
    } catch (error) {
      return onError(res, 500, "something went wrong, try again!");
    }
  }
}
export default EquipmentResourceController;
