"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _models = require("../../../database/models");
var _response = require("../../../utils/response");
class EquipmentConsumptionController {
  // create equipment consumption
  static async createEquipmentConsumption(req, res) {
    try {
      // consumedQuantity, consumedPrice, consumedDate, equipmentId, percentage
      const {
        consumedQuantity,
        consumedPrice,
        consumedDate,
        equipmentId,
        estimationId,
        name,
        unit
      } = req.body;
      if (equipmentId) {
        const equipment = await _models.UserEquipments.findOne({
          where: {
            id: equipmentId
          },
          include: [{
            model: _models.UserEstimationLibrary,
            as: "equipment_calculation",
            attributes: ["equipmentPerformance", "equipmentTotalAmount"]
          }]
        });
        if (!equipment) {
          return (0, _response.onError)(res, 404, "Equipment not found");
        }
        const estimationConsumed = await _models.UserEstimationsConsumption.findOne({
          where: {
            id: estimationId
          }
        });
        if (!estimationConsumed) {
          return (0, _response.onError)(res, 404, "consumed estimation not found");
        }
        const consumedTotal = consumedQuantity * consumedPrice;
        const percentage = consumedTotal / +equipment.equipment_calculation.equipmentTotalAmount;
        const equipmentConsumption = await _models.UserEquipmentConsumption.create({
          consumedQuantity,
          consumedPrice,
          consumedDate,
          equipmentId,
          estimationId,
          consumedTotal: consumedTotal.toFixed(2),
          percentage: percentage.toFixed(2)
        });
        const totalEquipmentConsumed = await _models.UserEquipmentConsumption.sum("consumedTotal", {
          where: {
            estimationId
          }
        });
        await estimationConsumed.update({
          totalEquipmentConsumed: totalEquipmentConsumed.toFixed(2)
        });
        return (0, _response.onSuccess)(res, 201, "Equipment consumption added successfully", equipmentConsumption);
      }
      const estimationConsumed = await _models.UserEstimationsConsumption.findOne({
        where: {
          id: estimationId
        }
      });
      if (!estimationConsumed) {
        return (0, _response.onError)(res, 404, "consumed estimation not found");
      }
      const consumedTotal = consumedQuantity * consumedPrice;
      const percentage = 0;
      const equipmentConsumption = await _models.UserEquipmentConsumption.create({
        name,
        unit,
        estimationId,
        consumedQuantity,
        consumedPrice,
        consumedDate,
        consumedTotal: consumedTotal.toFixed(2),
        percentage
      });

      // calculate the sum of consumedTotal insite UserEquipmentConsumption and add it value totalEquipmentConsumed of UserEstimationsConsumption
      const totalEquipmentConsumed = await _models.UserEquipmentConsumption.sum("consumedTotal", {
        where: {
          estimationId
        }
      });
      await estimationConsumed.update({
        totalEquipmentConsumed: totalEquipmentConsumed.toFixed(2)
      });
      return (0, _response.onSuccess)(res, 201, "Equipment consumption created successfully", equipmentConsumption);
    } catch (error) {
      console.log("error: ", error);
      return (0, _response.onError)(res, 500, "Internal Server Error", error);
    }
  }

  // edit equipment consumption
  static async editEquipmentConsumption(req, res) {
    try {
      const {
        id
      } = req.params;
      const {
        name,
        unit,
        estimationId,
        consumedQuantity,
        consumedPrice,
        consumedDate,
        equipmentId
      } = req.body;
      if (equipmentId) {
        const equipment = await _models.UserEquipments.findOne({
          where: {
            id: equipmentId
          },
          include: [{
            model: _models.UserEstimationLibrary,
            as: "equipment_calculation",
            attributes: ["equipmentPerformance", "equipmentTotalAmount"]
          }]
        });
        if (!equipment) {
          return (0, _response.onError)(res, 404, "Equipment not found");
        }
        const estimation = await _models.UserEstimationsConsumption.findOne({
          where: {
            id: estimationId
          }
        });
        if (!estimation) {
          return (0, _response.onError)(res, 404, "consumed estimation not found");
        }
        const equipmentConsumption = await _models.UserEquipmentConsumption.findOne({
          where: {
            id,
            estimationId
          }
        });
        if (!equipmentConsumption) {
          return (0, _response.onError)(res, 404, "Equipment consumption not found");
        }
        const consumedQty = consumedQuantity ? consumedQuantity : equipmentConsumption.consumedQuantity;
        const consumedPrc = consumedPrice ? consumedPrice : equipmentConsumption.consumedPrice;
        const consumedDt = consumedDate ? consumedDate : equipmentConsumption.consumedDate;
        const eqId = equipmentId;
        const consumedTot = consumedQty * consumedPrc;
        const percentage = consumedTot / equipment.equipment_calculation.equipmentTotalAmount;
        await equipmentConsumption.update({
          consumedQuantity: consumedQty,
          consumedPrice: consumedPrc,
          consumedDate: consumedDt,
          equipmentId: eqId,
          consumedTotal: consumedTot.toFixed(2),
          percentage: percentage.toFixed(2)
        });
        const updatedConsumption = await equipmentConsumption.reload();
        const totalEquipmentConsumed = await _models.UserEquipmentConsumption.sum("consumedTotal", {
          where: {
            estimationId
          }
        });
        await estimation.update({
          totalEquipmentConsumed: totalEquipmentConsumed.toFixed(2)
        });
        return (0, _response.onSuccess)(res, 200, "equipment consumption updated successfully", updatedConsumption);
      }

      // created equipment consumption
      const estimation = await _models.UserEstimationsConsumption.findOne({
        where: {
          id: estimationId
        }
      });
      if (!estimation) {
        return (0, _response.onError)(res, 404, "consumed estimation not found");
      }
      const equipmentConsumption = await _models.UserEquipmentConsumption.findOne({
        where: {
          id,
          estimationId
        }
      });
      if (!equipmentConsumption) {
        return (0, _response.onError)(res, 404, "Equipment consumption not found");
      }
      const consumedQty = consumedQuantity ? consumedQuantity : equipmentConsumption.consumedQuantity;
      const consumedPrc = consumedPrice ? consumedPrice : equipmentConsumption.consumedPrice;
      const consumedDt = consumedDate ? consumedDate : equipmentConsumption.consumedDate;
      const consumedTot = consumedQty * consumedPrc;
      const equipName = name ? name : equipmentConsumption.name;
      const unitName = unit ? unit : equipmentConsumption.unit;
      await equipmentConsumption.update({
        consumedQuantity: consumedQty,
        consumedPrice: consumedPrc,
        consumedDate: consumedDt,
        consumedTotal: consumedTot.toFixed(2),
        name: equipName,
        unit: unitName
      });
      const updatedConsumption = await equipmentConsumption.reload();
      const totalEquipmentConsumed = await _models.UserEquipmentConsumption.sum("consumedTotal", {
        where: {
          estimationId
        }
      });
      await estimation.update({
        totalEquipmentConsumed: totalEquipmentConsumed.toFixed(2)
      });
      return (0, _response.onSuccess)(res, 200, "equipment consumption updated successfully", updatedConsumption);
    } catch (error) {
      console.log("error: ", error);
      return (0, _response.onError)(res, 500, "Internal Server Error", error);
    }
  }

  // delete equipment consumption
  static async deleteEquipmentConsumption(req, res) {
    try {
      const {
        id
      } = req.params;
      const {
        estimationId
      } = req.body;
      const estimation = await _models.UserEstimationsConsumption.findOne({
        where: {
          id: estimationId
        }
      });
      if (!estimation) {
        return (0, _response.onError)(res, 404, "consumed estimation not found");
      }
      const equipmentConsumption = await _models.UserEquipmentConsumption.findOne({
        where: {
          id,
          estimationId
        }
      });
      if (!equipmentConsumption) {
        return (0, _response.onError)(res, 404, "Equipment consumption not found");
      }
      await equipmentConsumption.destroy();
      const totalEquipmentConsumed = await _models.UserEquipmentConsumption.sum("consumedTotal", {
        where: {
          estimationId
        }
      });
      await estimation.update({
        totalEquipmentConsumed: totalEquipmentConsumed.toFixed(2)
      });
      return (0, _response.onSuccess)(res, 200, "Equipment consumption deleted successfully", equipmentConsumption);
    } catch (error) {
      console.log("error: ", error);
      return (0, _response.onError)(res, 500, "Internal Server Error", error);
    }
  }

  // get all equipment consumption
  static async getAllEquipmentConsumption(req, res) {
    try {
      const equipmentConsumption = await _models.UserEquipmentConsumption.findAll({
        include: [{
          model: _models.UserEquipments,
          as: "consumed_equipment",
          attributes: ["id", "name", "unit", "caveragePerUnit", "hireRatePrice", "number"],
          include: [{
            model: _models.UserEstimationLibrary,
            as: "equipment_calculation",
            attributes: ["equipmentPerformance", "equipmentTotalAmount"]
          }]
        }]
      });
      return (0, _response.onSuccess)(res, 200, "Equipment consumption fetched successfully", equipmentConsumption);
    } catch (error) {
      console.log("error: ", error);
      return (0, _response.onError)(res, 500, "Internal Server Error", error);
    }
  }

  // get equipment consumption by id
  static async getEquipmentConsumptionById(req, res) {
    try {
      const {
        id
      } = req.params;
      const equipmentConsumption = await _models.UserEquipmentConsumption.findOne({
        where: {
          id
        },
        include: [{
          model: _models.UserEquipments,
          as: "consumed_equipment",
          attributes: ["id", "name", "unit", "caveragePerUnit", "hireRatePrice", "number"],
          include: [{
            model: _models.UserEstimationLibrary,
            as: "equipment_calculation",
            attributes: ["equipmentPerformance", "equipmentTotalAmount"]
          }]
        }]
      });
      if (!equipmentConsumption) {
        return (0, _response.onError)(res, 404, "Equipment consumption not found");
      }
      return (0, _response.onSuccess)(res, 200, "Equipment consumption fetched successfully", equipmentConsumption);
    } catch (error) {
      console.log("error: ", error);
      return (0, _response.onError)(res, 500, "Internal Server Error", error);
    }
  }
}
var _default = exports.default = EquipmentConsumptionController;