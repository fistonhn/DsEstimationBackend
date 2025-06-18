"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _models = require("../../../database/models");
var _response = require("../../../utils/response");
var _sequelize = require("sequelize");
class EstimationConsumptionController {
  // create estimation consumption
  static async createEstimationConsumption(req, res) {
    try {
      // executedQuantity, estimationId
      const {
        executedQuantity,
        estimationId,
        executedDate
      } = req.body;
      const estimation = await _models.UserEstimations.findOne({
        where: {
          id: estimationId
        }
      });
      if (!estimation) {
        return (0, _response.onError)(res, 404, "estimation not found");
      }
      const remainingQuantity = +estimation.estimationQuantity - executedQuantity;
      const percentage = +estimation.estimationQuantity / executedQuantity;
      const estimationConsumption = await _models.UserEstimationsConsumption.create({
        executedQuantity,
        estimationId,
        remainingQuantity: remainingQuantity.toFixed(2),
        percentage: percentage.toFixed(2),
        executedDate
      });
      return (0, _response.onSuccess)(res, 201, "estimation consumption created successfully", estimationConsumption);
    } catch (error) {
      console.log("error: ", error);
      return (0, _response.onError)(res, 500, "Internal Server Error", error);
    }
  }

  // Update estimation consumption
  static async editEstimationConsumption(req, res) {
    try {
      const {
        id
      } = req.params;
      const {
        executedQuantity,
        estimationId,
        executedDate
      } = req.body;
      const estimation = await _models.UserEstimations.findOne({
        where: {
          id: estimationId
        }
      });
      if (!estimation) {
        return (0, _response.onError)(res, 404, "estimation not found");
      }
      const estimationConsumption = await _models.UserEstimationsConsumption.findOne({
        where: {
          id
        }
      });
      if (!estimationConsumption) {
        return (0, _response.onError)(res, 404, "estimation consumption not found");
      }
      const executedQty = executedQuantity ? executedQuantity : +estimationConsumption.executedQuantity;
      const remainingQuantity = +estimation.estimationQuantity - executedQty;
      const percentage = +estimation.estimationQuantity / executedQty;
      const excDate = executedDate ? executedDate : estimationConsumption?.executedDate;
      await estimationConsumption.update({
        executedQuantity: executedQty,
        estimationId,
        remainingQuantity: remainingQuantity.toFixed(2),
        percentage: percentage.toFixed(2),
        executedDate: excDate
      });
      const updated = await estimationConsumption.reload();
      return (0, _response.onSuccess)(res, 200, "estimation consumption updated successfully", updated);
    } catch (error) {
      console.log("error: ", error);
      return (0, _response.onError)(res, 500, "Internal Server Error", error);
    }
  }

  // Delete estimation consumption
  static async deleteEstimationConsumption(req, res) {
    try {
      const {
        id
      } = req.params;
      const estimationConsumption = await _models.UserEstimationsConsumption.findOne({
        where: {
          id
        }
      });
      if (!estimationConsumption) {
        return (0, _response.onError)(res, 404, "estimation consumption not found");
      }
      await estimationConsumption.destroy();
      return (0, _response.onSuccess)(res, 200, "estimation consumption deleted successfully", estimationConsumption);
    } catch (error) {
      console.log("error: ", error);
      return (0, _response.onError)(res, 500, "Internal Server Error", error);
    }
  }

  // Get estimation consumption
  static async getEstimationConsumption(req, res) {
    try {
      const {
        id
      } = req.params;
      const estimationConsumption = await _models.UserEstimationsConsumption.findOne({
        where: {
          id
        },
        include: [{
          model: _models.UserEstimations,
          as: "consumed_estimation",
          attributes: ["id", "name", "estimationRate", "estimationQuantity"]
        }, {
          model: _models.UserEquipmentConsumption,
          as: 'consumed_equipment',
          include: [{
            model: _models.UserEquipments,
            as: 'consumed_equipment',
            attributes: ['name', 'unit']
          }]
        }, {
          model: _models.UserLabourConsumption,
          as: 'consumed_labour',
          include: [{
            model: _models.UserLabours,
            as: 'consumed_labour',
            attributes: ['name', 'unit']
          }]
        }, {
          model: _models.UserMaterialConsumption,
          as: 'consumed_material',
          include: [{
            model: _models.UserMaterials,
            as: 'consumed_material',
            attributes: ['name', 'unit']
          }]
        }, {
          model: _models.UserSubcontractorConsumption,
          as: 'consumed_subcontractor',
          include: [{
            model: _models.UserSubContractors,
            as: 'consumed_subcontractor',
            attributes: ['name', 'unit']
          }]
        }]
      });
      if (!estimationConsumption) {
        return (0, _response.onError)(res, 404, "estimation consumption not found");
      }
      return (0, _response.onSuccess)(res, 200, "estimation consumption found", estimationConsumption);
    } catch (error) {
      console.log("error: ", error);
      return (0, _response.onError)(res, 500, "Internal Server Error", error);
    }
  }

  // get all estimation consumption
  static async getAllEstimationConsumption(req, res) {
    try {
      const estimationConsumption = await _models.UserEstimationsConsumption.findAll({
        include: [{
          model: _models.UserEstimations,
          as: "consumed_estimation",
          attributes: ["id", "name", "estimationRate", "estimationQuantity"]
        }, {
          model: _models.UserEquipmentConsumption,
          as: 'consumed_equipment',
          include: [{
            model: _models.UserEquipments,
            as: 'consumed_equipment',
            attributes: ['name', 'unit']
          }]
        }, {
          model: _models.UserLabourConsumption,
          as: 'consumed_labour',
          include: [{
            model: _models.UserLabours,
            as: 'consumed_labour',
            attributes: ['name', 'unit']
          }]
        }, {
          model: _models.UserMaterialConsumption,
          as: 'consumed_material',
          include: [{
            model: _models.UserMaterials,
            as: 'consumed_material',
            attributes: ['name', 'unit']
          }]
        }, {
          model: _models.UserSubcontractorConsumption,
          as: 'consumed_subcontractor',
          include: [{
            model: _models.UserSubContractors,
            as: 'consumed_subcontractor',
            attributes: ['name', 'unit']
          }]
        }]
      });
      return (0, _response.onSuccess)(res, 200, "estimation consumption retrieved", estimationConsumption);
    } catch (error) {
      console.log("error: ", error);
      return (0, _response.onError)(res, 500, "Internal Server Error", error);
    }
  }

  // get estimation consumption based on the specific interval of date
  static async getEstimationConsumptionByDate(req, res) {
    try {
      const {
        from,
        end
      } = req.body;
      const estimationConsumption = await _models.UserEstimationsConsumption.findAll({
        where: {
          executedDate: {
            [_sequelize.Op.between]: [from, end]
          }
        },
        include: [{
          model: _models.UserEstimations,
          as: "consumed_estimation",
          attributes: ["id", "name", "estimationRate", "estimationQuantity"]
        }, {
          model: _models.UserEquipmentConsumption,
          as: 'consumed_equipment',
          include: [{
            model: _models.UserEquipments,
            as: 'consumed_equipment',
            attributes: ['name', 'unit']
          }]
        }, {
          model: _models.UserLabourConsumption,
          as: 'consumed_labour',
          include: [{
            model: _models.UserLabours,
            as: 'consumed_labour',
            attributes: ['name', 'unit']
          }]
        }, {
          model: _models.UserMaterialConsumption,
          as: 'consumed_material',
          include: [{
            model: _models.UserMaterials,
            as: 'consumed_material',
            attributes: ['name', 'unit']
          }]
        }, {
          model: _models.UserSubcontractorConsumption,
          as: 'consumed_subcontractor',
          include: [{
            model: _models.UserSubContractors,
            as: 'consumed_subcontractor',
            attributes: ['name', 'unit']
          }]
        }]
      });
      return (0, _response.onSuccess)(res, 200, "estimation consumption retrieved", estimationConsumption);
    } catch (error) {
      console.log("error: ", error);
      return (0, _response.onError)(res, 500, "Internal Server Error", error);
    }
  }

  // get estimation one consumption based on the specific interval of date
  static async getOneEstimationConsumptionByDate(req, res) {
    try {
      const {
        estimationId
      } = req.params;
      const {
        from,
        end
      } = req.body;
      const estimationConsumption = await _models.UserEstimationsConsumption.findAll({
        where: {
          estimationId,
          executedDate: {
            [_sequelize.Op.between]: [from, end]
          }
        },
        include: [{
          model: _models.UserEstimations,
          as: "consumed_estimation",
          attributes: ["id", "name", "estimationRate", "estimationQuantity"]
        }, {
          model: _models.UserEquipmentConsumption,
          as: 'consumed_equipment',
          include: [{
            model: _models.UserEquipments,
            as: 'consumed_equipment',
            attributes: ['name', 'unit']
          }]
        }, {
          model: _models.UserLabourConsumption,
          as: 'consumed_labour',
          include: [{
            model: _models.UserLabours,
            as: 'consumed_labour',
            attributes: ['name', 'unit']
          }]
        }, {
          model: _models.UserMaterialConsumption,
          as: 'consumed_material',
          include: [{
            model: _models.UserMaterials,
            as: 'consumed_material',
            attributes: ['name', 'unit']
          }]
        }, {
          model: _models.UserSubcontractorConsumption,
          as: 'consumed_subcontractor',
          include: [{
            model: _models.UserSubContractors,
            as: 'consumed_subcontractor',
            attributes: ['name', 'unit']
          }]
        }]
      });
      return (0, _response.onSuccess)(res, 200, "estimation consumption retrieved", estimationConsumption);
    } catch (error) {
      console.log("error: ", error);
      return (0, _response.onError)(res, 500, "Internal Server Error", error);
    }
  }
}
var _default = exports.default = EstimationConsumptionController;