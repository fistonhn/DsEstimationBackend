"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _models = require("../../database/models");
var _response = require("../../utils/response");
class LabourController {
  // Get all labours
  static async getAllLabour(req, res) {
    try {
      const labours = await _models.Labours.findAll({
        where: {
          isApproved: true,
          templateId: null
        }
      });
      if (labours.length === 0) {
        return (0, _response.onSuccess)(res, 200, "You have no labours", labours);
      }
      return (0, _response.onSuccess)(res, 200, "Labours retrieved successfully", labours);
    } catch (error) {
      return (0, _response.onError)(res, 500, "Internal  Server Error", error.message);
    }
  }

  // Get all labours where isApproved=false
  static async getAllUnapprovedLabour(req, res) {
    try {
      const labours = await _models.Labours.findAll({
        where: {
          isApproved: false
        }
      });
      if (labours.length === 0) {
        return (0, _response.onSuccess)(res, 200, "You have zero un-approved labours", labours);
      }
      return (0, _response.onSuccess)(res, 200, "Labours Retrieved Successfully", labours);
    } catch (error) {
      return (0, _response.onError)(res, 500, "sowmething went wrong, try again");
    }
  }

  // Approve un approved labour
  static async approveLabour(req, res) {
    try {
      const {
        id
      } = req.params;
      const labour = await _models.Labours.findByPk(id);
      if (!labour) {
        return (0, _response.onError)(res, 404, "Labour not found");
      }
      if (labour.isApproved) {
        await labour.update({
          isApproved: false
        });
        return (0, _response.onSuccess)(res, 200, "Labour Unapproved Successfully", labour);
      }
      await labour.update({
        isApproved: true
      });
      return (0, _response.onSuccess)(res, 200, "Labour Approved Successfully", labour);
    } catch (error) {
      return (0, _response.onError)(res, 500, "something went wrong, try again");
    }
  }

  // get labour by id
  static async getLabourById(req, res) {
    try {
      const labour = await _models.Labours.findOne({
        where: {
          id: req.params.id
        }
      });
      if (!labour) {
        return (0, _response.onError)(res, 404, "Labour not found");
      }
      return (0, _response.onSuccess)(res, 200, "Labour retrieved successfully", labour);
    } catch (error) {
      return (0, _response.onError)(res, 500, "Internal  Server Error", error.message);
    }
  }

  // create labour
  static async createLabour(req, res) {
    try {
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
      const labour = await _models.Labours.findOne({
        where: {
          id
        }
      });
      await labour.update({
        ...req.body
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
      const labour = await _models.Labours.findOne({
        where: {
          id
        }
      });
      await labour.destroy();
      return (0, _response.onSuccess)(res, 200, "Labour deleted successfully", labour);
    } catch (error) {
      return (0, _response.onError)(res, 500, "Internal  Server Error", error.message);
    }
  }
}
var _default = exports.default = LabourController;