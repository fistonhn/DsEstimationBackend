"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _models = require("../../../database/models");
var _response = require("../../../utils/response");
class LabourConsumptionController {
  // create labour consumption
  static async createLabourConsumption(req, res) {
    try {
      // consumedQuantity, consumedPrice, consumedDate, labourId, percentage
      const {
        consumedQuantity,
        consumedPrice,
        consumedDate,
        labourId,
        estimationId,
        name,
        unit
      } = req.body;
      if (labourId) {
        const labour = await _models.UserLabours.findOne({
          where: {
            id: labourId
          },
          include: [{
            model: _models.UserEstimationLibrary,
            as: "labour_calculation",
            attributes: ["labourFactorQuantity", "labourTotalAmount"]
          }]
        });
        if (!labour) {
          return (0, _response.onError)(res, 404, "labour not found");
        }
        const estimation = await _models.UserEstimationsConsumption.findOne({
          where: {
            id: estimationId
          }
        });
        if (!estimation) {
          return (0, _response.onError)(res, 404, "consumed estimation not found");
        }
        const consumedTotal = consumedQuantity * consumedPrice;
        const percentage = consumedTotal / labour.labour_calculation.labourTotalAmount;
        const labourConsumption = await _models.UserLabourConsumption.create({
          consumedQuantity,
          consumedPrice,
          consumedDate,
          labourId,
          estimationId,
          consumedTotal: consumedTotal.toFixed(2),
          percentage: percentage.toFixed(2)
        });
        const totalLabourConsumed = await _models.UserLabourConsumption.sum("consumedTotal", {
          where: {
            estimationId
          }
        });
        await estimationConsumed.update({
          totalLabourConsumed: totalLabourConsumed.toFixed(2)
        });
        return (0, _response.onSuccess)(res, 201, "labour consumption created successfully", labourConsumption);
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
      const labourConsumption = await _models.UserLabourConsumption.create({
        name,
        unit,
        estimationId,
        consumedQuantity,
        consumedPrice,
        consumedDate,
        labourId,
        consumedTotal: consumedTotal.toFixed(2),
        percentage: 0
      });
      // calculate the sum of consumedTotal insite UserLabourConsumption and add it value totalLabourConsumed of UserEstimationsConsumption

      const totalLabourConsumed = await _models.UserLabourConsumption.sum("consumedTotal", {
        where: {
          estimationId
        }
      });
      await estimationConsumed.update({
        totalLabourConsumed: totalLabourConsumed.toFixed(2)
      });
      return (0, _response.onSuccess)(res, 201, "labour consumption created successfully", labourConsumption);
    } catch (error) {
      console.log("error: ", error);
      return (0, _response.onError)(res, 500, "Internal Server Error", error);
    }
  }

  // edit equipment consumption
  static async editLabourConsumption(req, res) {
    try {
      const {
        id
      } = req.params;
      const {
        consumedQuantity,
        consumedPrice,
        consumedDate,
        labourId,
        name,
        unit,
        estimationId
      } = req.body;
      if (labourId) {
        const labour = await _models.UserLabours.findOne({
          where: {
            id: labourId
          },
          include: [{
            model: _models.UserEstimationLibrary,
            as: "labour_calculation",
            attributes: ["labourFactorQuantity", "labourTotalAmount"]
          }]
        });
        if (!labour) {
          return (0, _response.onError)(res, 404, "labour not found");
        }
        const estimation = await _models.UserEstimationsConsumption.findOne({
          where: {
            id: estimationId
          }
        });
        if (!estimation) {
          return (0, _response.onError)(res, 404, "consumed estimation not found");
        }
        const labourConsumption = await _models.UserLabourConsumption.findOne({
          where: {
            id,
            estimationId
          }
        });
        if (!labourConsumption) {
          return (0, _response.onError)(res, 404, "labour consumption not found");
        }
        const consumedQty = consumedQuantity ? consumedQuantity : labourConsumption.consumedQuantity;
        const consumedPrc = consumedPrice ? consumedPrice : labourConsumption.consumedPrice;
        const consumedDt = consumedDate ? consumedDate : labourConsumption.consumedDate;
        const consumedTot = consumedQty * consumedPrc;
        const percentage = consumedTot / labour.labour_calculation.labourTotalAmount;
        await labourConsumption.update({
          consumedQuantity: consumedQty,
          consumedPrice: consumedPrc,
          consumedDate: consumedDt,
          consumedTotal: consumedTot.toFixed(2),
          percentage: percentage.toFixed(2)
        });
        const updatedConsumption = await labourConsumption.reload();
        const totalLabourConsumed = await _models.UserLabourConsumption.sum("consumedTotal", {
          where: {
            estimationId
          }
        });
        await estimation.update({
          totalLabourConsumed: totalLabourConsumed.toFixed(2)
        });
        return (0, _response.onSuccess)(res, 200, "labour consumption updated successfully", updatedConsumption);
      }
      // created labour consumption
      const estimation = await _models.UserEstimationsConsumption.findOne({
        where: {
          id: estimationId
        }
      });
      if (!estimation) {
        return (0, _response.onError)(res, 404, "consumed estimation not found");
      }
      const labourConsumption = await _models.UserLabourConsumption.findOne({
        where: {
          id,
          estimationId
        }
      });
      if (!labourConsumption) {
        return (0, _response.onError)(res, 404, "labour consumption not found");
      }
      const consumedQty = consumedQuantity ? consumedQuantity : labourConsumption.consumedQuantity;
      const consumedPrc = consumedPrice ? consumedPrice : labourConsumption.consumedPrice;
      const consumedDt = consumedDate ? consumedDate : labourConsumption.consumedDate;
      const consumedTot = consumedQty * consumedPrc;
      const labourName = name ? name : labourConsumption.name;
      const unitName = unit ? unit : labourConsumption.unit;
      await labourConsumption.update({
        consumedQuantity: consumedQty,
        consumedPrice: consumedPrc,
        consumedDate: consumedDt,
        consumedTotal: consumedTot.toFixed(2),
        name: labourName,
        unit: unitName
      });
      const updatedConsumption = await labourConsumption.reload();
      const totalLabourConsumed = await _models.UserLabourConsumption.sum("consumedTotal", {
        where: {
          estimationId
        }
      });
      await estimation.update({
        totalLabourConsumed: totalLabourConsumed.toFixed(2)
      });
      return (0, _response.onSuccess)(res, 200, "labour consumption updated successfully", updatedConsumption);
    } catch (error) {
      console.log("error: ", error);
      return (0, _response.onError)(res, 500, "Internal Server Error", error);
    }
  }

  // delete equipment consumption
  static async deleteLabourConsumption(req, res) {
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
      const labourConsumption = await _models.UserLabourConsumption.findOne({
        where: {
          id,
          estimationId: estimation.id
        }
      });
      if (!labourConsumption) {
        return (0, _response.onError)(res, 404, "labour consumption not found");
      }
      await labourConsumption.destroy();
      const totalLabourConsumed = await _models.UserLabourConsumption.sum("consumedTotal", {
        where: {
          estimationId
        }
      });
      await estimation.update({
        totalLabourConsumed: totalLabourConsumed.toFixed(2)
      });
      return (0, _response.onSuccess)(res, 200, "Labour consumption deleted successfully", labourConsumption);
    } catch (error) {
      console.log("error: ", error);
      return (0, _response.onError)(res, 500, "Internal Server Error", error);
    }
  }

  // get all equipment consumption
  static async getAllLabourConsumption(req, res) {
    try {
      const labourConsumption = await _models.UserLabourConsumption.findAll({
        include: [{
          model: _models.UserLabours,
          as: "consumed_labour",
          attributes: ["id", "name", "number", "unit", "caveragePerUnit", "wages"],
          include: [{
            model: _models.UserEstimationLibrary,
            as: "labour_calculation",
            attributes: ["labourFactorQuantity", "labourTotalAmount"]
          }]
        }]
      });
      return (0, _response.onSuccess)(res, "Labour consumption fetched successfully", labourConsumption);
    } catch (error) {
      console.log("error: ", error);
      return (0, _response.onError)(res, 500, "Internal Server Error", error);
    }
  }

  // get equipment consumption by id
  static async getLabourConsumptionById(req, res) {
    try {
      const {
        id
      } = req.params;
      const labourConsumption = await _models.UserLabourConsumption.findOne({
        where: {
          id
        },
        include: [{
          model: _models.UserLabours,
          as: "consumed_labour",
          attributes: ["id", "name", "number", "unit", "caveragePerUnit", "wages"],
          include: [{
            model: _models.UserEstimationLibrary,
            as: "labour_calculation",
            attributes: ["labourFactorQuantity", "labourTotalAmount"]
          }]
        }]
      });
      if (!labourConsumption) {
        return (0, _response.onError)(res, 404, "labour consumption not found");
      }
      return (0, _response.onSuccess)(res, "Labour consumption fetched successfully", labourConsumption);
    } catch (error) {
      console.log("error: ", error);
      return (0, _response.onError)(res, 500, "Internal Server Error", error);
    }
  }
}
var _default = exports.default = LabourConsumptionController;