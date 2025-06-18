"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _models = require("../../database/models");
var _response = require("../../utils/response");
class UserUnitsController {
  // get all units
  static async getAllUnits(req, res) {
    try {
      const {
        id: userId,
        managerId
      } = req.user;
      const units = await _models.UserUnits.findAll({
        where: {
          userId: managerId ? managerId : userId
        }
      });
      return (0, _response.onSuccess)(res, 200, "Units retrieved successfully", units);
    } catch (error) {
      return (0, _response.onError)(res, 500, "Internal Server Error");
    }
  }

  // get unit by id
  static async getUnitById(req, res) {
    try {
      const {
        id: userId,
        managerId
      } = req.user;
      const unit = await _models.UserUnits.findOne({
        where: {
          id: req.params.id,
          userId: managerId ? managerId : userId
        }
      });
      return (0, _response.onSuccess)(res, 200, "Unit retrieved successfully", unit);
    } catch (error) {
      return (0, _response.onError)(res, 500, "Internal Server Error");
    }
  }

  // create new unit
  static async createUnit(req, res) {
    try {
      const {
        id: userId,
        managerId
      } = req.user;
      const unit = await _models.UserUnits.create({
        ...req.body,
        userId: managerId ? managerId : userId
      });
      await _models.Units.create({
        ...req.body,
        userId: managerId ? managerId : userId,
        isApproved: false
      });
      return (0, _response.onSuccess)(res, 201, "Unit created successfully", unit);
    } catch (error) {
      return (0, _response.onError)(res, 500, "Internal Server Error");
    }
  }

  // update unit
  static async updateUnit(req, res) {
    try {
      const {
        id: userId,
        managerId
      } = req.user;
      const {
        id
      } = req.params;
      const unit = await _models.UserUnits.findOne({
        where: {
          id,
          userId: managerId ? managerId : userId
        }
      });
      return (0, _response.onSuccess)(res, 200, "Unit updated successfully", unit);
    } catch (error) {
      return (0, _response.onError)(res, 500, "Internal Server Error");
    }
  }

  // delete unit
  static async deleteUnit(req, res) {
    try {
      const {
        id: userId,
        managerId,
        role
      } = req.user;
      const {
        id
      } = req.params;
      if (role === 'manager' || role === 'admin') {
        const unit = await _models.UserUnits.findOne({
          where: {
            id,
            userId: managerId ? managerId : userId
          }
        });
        if (!unit) {
          return (0, _response.onError)(res, 404, "Unit not found");
        }
        await unit.destroy();
        return (0, _response.onSuccess)(res, 200, "Unit deleted successfully", unit);
      }
      const unit = await _models.Units.findOne({
        where: {
          id
        }
      });
      if (!unit) {
        return (0, _response.onError)(res, 404, "Unit not found");
      }
      await unit.destroy();
      return (0, _response.onSuccess)(res, 200, "Unit deleted successfully", unit);
    } catch (error) {
      return (0, _response.onError)(res, 500, "Internal Server Error");
    }
  }
}
var _default = exports.default = UserUnitsController;