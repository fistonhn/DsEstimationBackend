import {
  UserEstimations,
  UserEstimationsConsumption,
  UserEquipmentConsumption,
  UserLabourConsumption,
  UserMaterialConsumption,
  UserSubcontractorConsumption,
  UserEquipments,
  UserLabours,
  UserMaterials,
  UserSubContractors
} from "../../../database/models";
import { onSuccess, onError } from "../../../utils/response";
import { Op } from "sequelize";

class EstimationConsumptionController {
  // create estimation consumption
  static async createEstimationConsumption(req, res) {
    try {
      // executedQuantity, estimationId
      const { executedQuantity, estimationId, executedDate } = req.body;
      const estimation = await UserEstimations.findOne({
        where: { id: estimationId },
      });
      if (!estimation) {
        return onError(res, 404, "estimation not found");
      }

      const remainingQuantity =
        +estimation.estimationQuantity - executedQuantity;
      const percentage = +estimation.estimationQuantity / executedQuantity;

      const estimationConsumption = await UserEstimationsConsumption.create({
        executedQuantity,
        estimationId,
        remainingQuantity: remainingQuantity.toFixed(2),
        percentage: percentage.toFixed(2),
        executedDate,
      });

      return onSuccess(
        res,
        201,
        "estimation consumption created successfully",
        estimationConsumption
      );
    } catch (error) {
      console.log("error: ", error);
      return onError(res, 500, "Internal Server Error", error);
    }
  }

  // Update estimation consumption
  static async editEstimationConsumption(req, res) {
    try {
      const { id } = req.params;
      const { executedQuantity, estimationId, executedDate } = req.body;

      const estimation = await UserEstimations.findOne({
        where: { id: estimationId },
      });
      if (!estimation) {
        return onError(res, 404, "estimation not found");
      }
      const estimationConsumption = await UserEstimationsConsumption.findOne({
        where: { id },
      });
      if (!estimationConsumption) {
        return onError(res, 404, "estimation consumption not found");
      }

      const executedQty = executedQuantity
        ? executedQuantity
        : +estimationConsumption.executedQuantity;

      const remainingQuantity = +estimation.estimationQuantity - executedQty;
      const percentage = +estimation.estimationQuantity / executedQty;
      const excDate = executedDate
        ? executedDate
        : estimationConsumption?.executedDate;

      await estimationConsumption.update({
        executedQuantity: executedQty,
        estimationId,
        remainingQuantity: remainingQuantity.toFixed(2),
        percentage: percentage.toFixed(2),
        executedDate: excDate,
      });

      const updated = await estimationConsumption.reload();

      return onSuccess(
        res,
        200,
        "estimation consumption updated successfully",
        updated
      );
    } catch (error) {
      console.log("error: ", error);
      return onError(res, 500, "Internal Server Error", error);
    }
  }

  // Delete estimation consumption
  static async deleteEstimationConsumption(req, res) {
    try {
      const { id } = req.params;
      const estimationConsumption = await UserEstimationsConsumption.findOne({
        where: { id },
      });
      if (!estimationConsumption) {
        return onError(res, 404, "estimation consumption not found");
      }
      await estimationConsumption.destroy();
      return onSuccess(
        res,
        200,
        "estimation consumption deleted successfully",
        estimationConsumption
      );
    } catch (error) {
      console.log("error: ", error);
      return onError(res, 500, "Internal Server Error", error);
    }
  }

  // Get estimation consumption
  static async getEstimationConsumption(req, res) {
    try {
      const { id } = req.params;
      const estimationConsumption = await UserEstimationsConsumption.findOne({
        where: { id },
        include: [
          {
            model: UserEstimations,
            as: "consumed_estimation",
            attributes: ["id", "name", "estimationRate", "estimationQuantity"],
          },
          {
            model: UserEquipmentConsumption,
            as: 'consumed_equipment',
            include: [
              {
                model: UserEquipments,
                as: 'consumed_equipment',
                attributes: ['name', 'unit']
              }
            ]
          },
          {
            model: UserLabourConsumption,
            as: 'consumed_labour',
            include: [
              {
                model: UserLabours,
                as: 'consumed_labour',
                attributes: ['name', 'unit']
              }
            ]
          },
          {
            model: UserMaterialConsumption,
            as: 'consumed_material',
            include: [
              {
                model: UserMaterials,
                as: 'consumed_material',
                attributes: ['name', 'unit']
              }
            ]
          },
          {
            model: UserSubcontractorConsumption,
            as: 'consumed_subcontractor',
            include: [
              {
                model: UserSubContractors,
                as: 'consumed_subcontractor',
                attributes: ['name', 'unit']
              }
            ]
          }
        ],
      });
      if (!estimationConsumption) {
        return onError(res, 404, "estimation consumption not found");
      }

      return onSuccess(
        res,
        200,
        "estimation consumption found",
        estimationConsumption
      );
    } catch (error) {
      console.log("error: ", error);
      return onError(res, 500, "Internal Server Error", error);
    }
  }

  // get all estimation consumption
  static async getAllEstimationConsumption(req, res) {
    try {
      const estimationConsumption = await UserEstimationsConsumption.findAll({
        include: [
          {
            model: UserEstimations,
            as: "consumed_estimation",
            attributes: ["id", "name", "estimationRate", "estimationQuantity"],
          },
          {
            model: UserEquipmentConsumption,
            as: 'consumed_equipment',
            include: [
              {
                model: UserEquipments,
                as: 'consumed_equipment',
                attributes: ['name', 'unit']
              }
            ]
          },
          {
            model: UserLabourConsumption,
            as: 'consumed_labour',
            include: [
              {
                model: UserLabours,
                as: 'consumed_labour',
                attributes: ['name', 'unit']
              }
            ]
          },
          {
            model: UserMaterialConsumption,
            as: 'consumed_material',
            include: [
              {
                model: UserMaterials,
                as: 'consumed_material',
                attributes: ['name', 'unit']
              }
            ]
          },
          {
            model: UserSubcontractorConsumption,
            as: 'consumed_subcontractor',
            include: [
              {
                model: UserSubContractors,
                as: 'consumed_subcontractor',
                attributes: ['name', 'unit']
              }
            ]
          }
        ],
      });

      return onSuccess(
        res,
        200,
        "estimation consumption retrieved",
        estimationConsumption
      );
    } catch (error) {
      console.log("error: ", error);
      return onError(res, 500, "Internal Server Error", error);
    }
  }

  // get estimation consumption based on the specific interval of date
  static async getEstimationConsumptionByDate(req, res) {
    try {
      const { from, end } = req.body;
      const estimationConsumption = await UserEstimationsConsumption.findAll({
        where: {
          executedDate: {
            [Op.between]: [from, end],
          },
        },
        include: [
          {
            model: UserEstimations,
            as: "consumed_estimation",
            attributes: ["id", "name", "estimationRate", "estimationQuantity"],
          },
          {
            model: UserEquipmentConsumption,
            as: 'consumed_equipment',
            include: [
              {
                model: UserEquipments,
                as: 'consumed_equipment',
                attributes: ['name', 'unit']
              }
            ]
          },
          {
            model: UserLabourConsumption,
            as: 'consumed_labour',
            include: [
              {
                model: UserLabours,
                as: 'consumed_labour',
                attributes: ['name', 'unit']
              }
            ]
          },
          {
            model: UserMaterialConsumption,
            as: 'consumed_material',
            include: [
              {
                model: UserMaterials,
                as: 'consumed_material',
                attributes: ['name', 'unit']
              }
            ]
          },
          {
            model: UserSubcontractorConsumption,
            as: 'consumed_subcontractor',
            include: [
              {
                model: UserSubContractors,
                as: 'consumed_subcontractor',
                attributes: ['name', 'unit']
              }
            ]
          }
        ],
      });

      return onSuccess( res, 200, "estimation consumption retrieved", estimationConsumption);
    } catch (error) {
      console.log("error: ", error);
      return onError(res, 500, "Internal Server Error", error);
    }
  }

  // get estimation one consumption based on the specific interval of date
  static async getOneEstimationConsumptionByDate(req, res) {
    try {
      const { estimationId } = req.params;
      const { from, end } = req.body;
      const estimationConsumption = await UserEstimationsConsumption.findAll({
        where: {
          estimationId,
          executedDate: {
            [Op.between]: [from, end],
          },
        },
        include: [
          {
            model: UserEstimations,
            as: "consumed_estimation",
            attributes: ["id", "name", "estimationRate", "estimationQuantity"],
          },
          {
            model: UserEquipmentConsumption,
            as: 'consumed_equipment',
            include: [
              {
                model: UserEquipments,
                as: 'consumed_equipment',
                attributes: ['name', 'unit']
              }
            ]
          },
          {
            model: UserLabourConsumption,
            as: 'consumed_labour',
            include: [
              {
                model: UserLabours,
                as: 'consumed_labour',
                attributes: ['name', 'unit']
              }
            ]
          },
          {
            model: UserMaterialConsumption,
            as: 'consumed_material',
            include: [
              {
                model: UserMaterials,
                as: 'consumed_material',
                attributes: ['name', 'unit']
              }
            ]
          },
          {
            model: UserSubcontractorConsumption,
            as: 'consumed_subcontractor',
            include: [
              {
                model: UserSubContractors,
                as: 'consumed_subcontractor',
                attributes: ['name', 'unit']
              }
            ]
          }
        ],
      });

      return onSuccess( res, 200, "estimation consumption retrieved", estimationConsumption);
    } catch (error) {
      console.log("error: ", error);
      return onError(res, 500, "Internal Server Error", error);
    }
  } 

}

export default EstimationConsumptionController;
