"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _models = require("../../database/models");
var _response = require("../../utils/response");
class EquipmentController {
  // get all equipments
  static async getAllEquipments(req, res) {
    try {
      const equipments = await _models.Equipments.findAll({
        where: {
          isApproved: true,
          templateId: null
        }
      });
      if (equipments.length === 0) {
        return (0, _response.onError)(res, 404, "You have no equipments");
      }
      return (0, _response.onSuccess)(res, 200, "Equipments Retrieved Successfully", equipments);
    } catch (error) {
      return (0, _response.onError)(res, 500, error);
    }
  }

  // get all equipment where isApproved=false
  static async getUnverifiedEquipments(req, res) {
    try {
      const equipments = await _models.Equipments.findAll({
        where: {
          isApproved: false
        }
      });
      if (equipments.length === 0) {
        return (0, _response.onSuccess)(res, 200, "You have zero un-approved equipments", equipments);
      }
      return (0, _response.onSuccess)(res, 200, "Equipments Retrieved Successfully", equipments);
    } catch (error) {
      return (0, _response.onError)(res, 500, "sowmething went wrong, try again");
    }
  }

  // Approve un approved equipment
  static async approveEquipment(req, res) {
    try {
      const {
        id
      } = req.params;
      const equipment = await _models.Equipments.findByPk(id);
      if (!equipment) {
        return (0, _response.onError)(res, 404, "Equipment not found");
      }
      if (equipment.isApproved) {
        await equipment.update({
          isApproved: false
        });
        return (0, _response.onSuccess)(res, 200, "Equipment unapproved Successfully", equipment);
      }
      await equipment.update({
        isApproved: true
      });
      return (0, _response.onSuccess)(res, 200, "Equipment Approved Successfully", equipment);
    } catch (error) {
      return (0, _response.onError)(res, 500, "something went wrong, try again");
    }
  }

  // get equipment by id
  static async getEquipmentById(req, res) {
    try {
      const {
        id
      } = req.params;
      const equipment = await _models.Equipments.findOne({
        where: {
          id
        }
      });
      if (!equipment) {
        return (0, _response.onError)(res, 404, "Equipment not found");
      }
      return (0, _response.onSuccess)(res, 200, "Equipment Retrieved Successfully", equipment);
    } catch (error) {
      return (0, _response.onError)(res, 500, error);
    }
  }

  // create equipment
  static async createEquipment(req, res) {
    try {
      const equipment = await _models.Equipments.create({
        ...req.body
      });
      return (0, _response.onSuccess)(res, 201, "Equipment Created Successfully", equipment);
    } catch (error) {
      return (0, _response.onError)(res, 500, "Internal Server Error", error.message);
    }
  }

  // update equipment
  static async updateEquipment(req, res) {
    try {
      const {
        id
      } = req.params;
      const equipment = await _models.Equipments.findOne({
        where: {
          id
        }
      });
      await equipment.update({
        ...req.body
      });
      return (0, _response.onSuccess)(res, 200, "Equipment Updated Successfully", equipment);
    } catch (error) {
      return (0, _response.onError)(res, 500, "Internal Server Error", error.message);
    }
  }

  // delete equipment
  static async deleteEquipment(req, res) {
    try {
      const {
        id
      } = req.params;
      const equipment = await _models.Equipments.findOne({
        where: {
          id
        }
      });
      await equipment.destroy();
      return (0, _response.onSuccess)(res, 200, "Equipment Deleted Successfully", equipment);
    } catch (error) {
      return (0, _response.onError)(res, 500, "Internal Server Error", error.message);
    }
  }
}
var _default = exports.default = EquipmentController;