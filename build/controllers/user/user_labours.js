"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _models = require("../../database/models");
var _response = require("../../utils/response");
class UserLabourController {
  // Get all labours
  static async getAllLabour(req, res) {
    try {
      const {
        id: userId,
        managerId
      } = req.user;
      const labours = await _models.UserLabours.findAll({
        where: {
          userId: managerId ? managerId : userId
        },
        include: [{
          model: _models.UserEstimationLibrary,
          as: "labour_calculation",
          attributes: ["labourFactorQuantity", "labourTotalAmount"]
        }]
      });
      return (0, _response.onSuccess)(res, 200, "Labours retrieved successfully", labours);
    } catch (error) {
      return (0, _response.onError)(res, 500, "Internal  Server Error", error.message);
    }
  }

  // get labour by id
  static async getLabourById(req, res) {
    try {
      const {
        id
      } = req.params;
      const {
        id: userId,
        managerId
      } = req.user;
      const labour = await _models.UserLabours.findOne({
        where: {
          id,
          userId: managerId ? managerId : userId
        },
        include: [{
          model: _models.UserEstimationLibrary,
          as: "labour_calculation",
          attributes: ["labourFactorQuantity", "labourTotalAmount"]
        }]
      });
      return (0, _response.onSuccess)(res, 200, "Labour retrieved successfully", labour);
    } catch (error) {
      return (0, _response.onError)(res, 500, "Internal  Server Error", error.message);
    }
  }

  // create labour
  static async createLabour(req, res) {
    try {
      const {
        id: userId,
        role,
        managerId
      } = req.user;
      if (role === "manager" || role === "admin") {
        // find if labour already exists
        const labourExist = await _models.UserLabours.findOne({
          where: {
            userId: managerId ? managerId : userId,
            name: req.body.name
          }
        });
        if (labourExist) {
          return (0, _response.onError)(res, 400, "Labour already exists in your data store");
        }
        const ourLabour = await _models.Labours.findOne({
          where: {
            name: req.body.name
          }
        });
        if (ourLabour) {
          return (0, _response.onError)(res, 409, "Labour already exists in our data store, please use the existing labour");
        }
        const labour = await _models.UserLabours.create({
          ...req.body,
          userId: managerId ? managerId : userId
        });
        await _models.Labours.create({
          ...req.body,
          userId: managerId ? managerId : userId,
          isApproved: false
        });
        return (0, _response.onSuccess)(res, 201, "Labour created successfully", labour);
      }
      const ourLabour = await _models.Labours.findOne({
        where: {
          name: req.body.name
        }
      });
      if (ourLabour) {
        return (0, _response.onError)(res, 409, "Labour already exists in our data store, please use the existing labour");
      }
      const labour = await _models.Labours.create({
        ...req.body
      });
      return (0, _response.onSuccess)(res, 201, "Labour created successfully", labour);
    } catch (error) {
      return (0, _response.onError)(res, 500, "Internal  Server Error", error.message);
    }
  }

  // update labour
  static async updateLabour(req, res) {
    try {
      const {
        id
      } = req.params;
      const {
        id: userId,
        managerId,
        role
      } = req.user;
      const {
        caveragePerUnit,
        wages,
        number,
        editName,
        editUnit
      } = req.body;

      // if incoming data is not one of the fields to be updated return error
      if (!caveragePerUnit && !wages && !number && !editName && !editUnit) {
        return (0, _response.onError)(res, 400, "Please provide a field to update");
      }
      if (role === "manager" || role === "admin") {
        const labour = await _models.UserLabours.findOne({
          where: {
            id,
            userId: managerId ? managerId : userId
          }
        });
        if (!labour) {
          return (0, _response.onError)(res, 404, "Labour not found");
        }
        const caverage = caveragePerUnit ? caveragePerUnit : labour?.caveragePerUnit;

        // labour price

        const labWages = wages ? wages : labour?.wages;
        // labour id
        const labourNumber = number ? number : labour?.number;
        const editLabourName = editName ? editName : labour.name;
        const editLabourUnit = editUnit ? editUnit : labour.unit;
        await labour.update({
          caveragePerUnit: caverage,
          wages: labWages,
          number: labourNumber,
          name: editLabourName,
          unit: editLabourUnit
        });
        return (0, _response.onSuccess)(res, 200, "Labour updated successfully", labour);
      }
      const labour = await _models.Labours.findOne({
        where: {
          id
        }
      });
      if (!labour) {
        return (0, _response.onError)(res, 404, "Labour not found");
      }
      const caverage = caveragePerUnit ? caveragePerUnit : labour?.caveragePerUnit;

      // labour price

      const labWages = wages ? wages : labour?.wages;
      // labour id
      const labourNumber = number ? number : labour?.number;
      const editLabourName = editName ? editName : labour.name;
      const editLabourUnit = editUnit ? editUnit : labour.unit;
      await labour.update({
        caveragePerUnit: caverage,
        wages: labWages,
        number: labourNumber,
        name: editLabourName,
        unit: editLabourUnit
      });
      return (0, _response.onSuccess)(res, 200, "Labour updated successfully", labour);
    } catch (error) {
      return (0, _response.onError)(res, 500, "Internal  Server Error", error.message);
    }
  }

  // delete labour

  static async deleteLabour(req, res) {
    try {
      const {
        id
      } = req.params;
      const {
        id: userId,
        managerId,
        role
      } = req.user;
      if (role === "manager" || role === "admin") {
        const labour = await _models.UserLabours.findOne({
          where: {
            id,
            userId: managerId ? managerId : userId
          }
        });
        if (!labour) {
          return (0, _response.onError)(res, 404, "Labour not found");
        }
        await labour.destroy();
        return (0, _response.onSuccess)(res, 200, "Labour deleted successfully", labour);
      }
      const labour = await _models.Labours.findOne({
        where: {
          id
        }
      });
      if (!labour) {
        return (0, _response.onError)(res, 404, "Labour not found");
      }
      await labour.destroy();
      return (0, _response.onSuccess)(res, 200, "Labour deleted successfully", labour);
    } catch (error) {
      return (0, _response.onError)(res, 500, "Internal  Server Error", error.message);
    }
  }
}
var _default = exports.default = UserLabourController;