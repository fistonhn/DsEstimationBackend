"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _models = require("../../database/models");
var _response = require("../../utils/response");
class UnitsController {
  // get all units
  static async getAllUnits(req, res) {
    try {
      const units = await _models.Units.findAll({
        where: {
          isApproved: true
        }
      });
      if (units.length === 0) {
        return (0, _response.onSuccess)(res, 200, "You have no units", units);
      }
      return (0, _response.onSuccess)(res, 200, "Units retrieved successfully", units);
    } catch (error) {
      return (0, _response.onError)(res, 500, "Internal Server Error");
    }
  }

  // get all units where isApproved=false
  static async getAllUnapprovedUnits(req, res) {
    try {
      const units = await _models.Units.findAll({
        where: {
          isApproved: false
        }
      });
      if (units.length === 0) {
        return (0, _response.onSuccess)(res, 200, "You have zero un-approved units", units);
      }
      return (0, _response.onSuccess)(res, 200, "Units Retrieved Successfully", units);
    } catch (error) {
      return (0, _response.onError)(res, 500, "sowmething went wrong, try again");
    }
  }

  // Approve un approved unit
  static async approveUnit(req, res) {
    try {
      const {
        id
      } = req.params;
      const unit = await _models.Units.findByPk(id);
      if (!unit) {
        return (0, _response.onError)(res, 404, "Unit not found");
      }
      // check if unit is already approved then update isApproved false
      if (unit.isApproved) {
        await unit.update({
          isApproved: false
        });
        return (0, _response.onSuccess)(res, 200, "Unit disapproved successfully", unit);
      }
      await unit.update({
        isApproved: true
      });
      return (0, _response.onSuccess)(res, 200, "Unit Approved Successfully", unit);
    } catch (error) {
      return (0, _response.onError)(res, 500, "something went wrong, try again");
    }
  }

  // get unit by id
  static async getUnitById(req, res) {
    try {
      const unit = await _models.Units.findOne({
        where: {
          id: req.params.id
        }
      });
      if (!unit) {
        return (0, _response.onError)(res, 404, "Unit not found");
      }
      return (0, _response.onSuccess)(res, 200, "Unit retrieved successfully", unit);
    } catch (error) {
      return (0, _response.onError)(res, 500, "Internal Server Error");
    }
  }

  // create new unit
  static async createUnit(req, res) {
    try {
      const unit = await _models.Units.create({
        ...req.body
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
        id
      } = req.params;
      const unit = await _models.Units.findOne({
        where: {
          id
        }
      });
      await unit.update({
        ...req.body
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
        id
      } = req.params;
      const unit = await _models.Units.findOne({
        where: {
          id
        }
      });
      await unit.destroy();
      return (0, _response.onSuccess)(res, 200, "Unit deleted successfully", unit);
    } catch (error) {
      return (0, _response.onError)(res, 500, "Internal Server Error");
    }
  }
}
var _default = exports.default = UnitsController;