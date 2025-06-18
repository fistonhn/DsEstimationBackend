"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _models = require("../../database/models");
var _response = require("../../utils/response");
class UserEquipmentController {
  // get all equipments
  static async getAllEquipments(req, res) {
    try {
      const {
        id: userId,
        managerId
      } = req.user;
      const equipments = await _models.UserEquipments.findAll({
        where: {
          userId: managerId ? managerId : userId
        },
        include: [{
          model: _models.UserEstimationLibrary,
          as: "equipment_calculation",
          attributes: ["equipmentPerformance", "equipmentTotalAmount"]
        }]
      });
      if (equipments.length === 0) {
        return (0, _response.onError)(res, 404, "You have no equipments");
      }
      return (0, _response.onSuccess)(res, 200, "Equipments Retrieved Successfully", equipments);
    } catch (error) {
      return (0, _response.onError)(res, 500, error);
    }
  }

  // get equipmet by id
  static async getEquipmentById(req, res) {
    try {
      const {
        id
      } = req.params;
      const {
        id: userId,
        managerId
      } = req.user;
      const equipment = await _models.UserEquipments.findOne({
        where: {
          id,
          userId: managerId ? managerId : userId
        },
        include: [{
          model: _models.UserEstimationLibrary,
          as: "equipment_calculation",
          attributes: ["equipmentPerformance", "equipmentTotalAmount"]
        }]
      });
      return (0, _response.onSuccess)(res, 200, "Equipment Retrieved Successfully", equipment);
    } catch (error) {
      return (0, _response.onError)(res, 500, error);
    }
  }

  // create equipment
  static async createEquipment(req, res) {
    try {
      const {
        id: userId,
        role,
        managerId
      } = req.user;
      if (role === "manager" || role === "admin") {
        const equip = await _models.Equipments.findOne({
          where: {
            name: req.body.name
          }
        });
        if (equip) {
          return (0, _response.onError)(res, 409, "Equipments already exists in our data store, please use the existing material");
        }
        // find if user_material already exists
        const userEquip = await _models.UserEquipments.findOne({
          where: {
            name: req.body.name,
            userId: managerId ? managerId : userId
          }
        });
        if (userEquip) {
          return (0, _response.onError)(res, 409, "Equipment already exists in your data store");
        }
        const equipment = await _models.UserEquipments.create({
          ...req.body,
          userId: managerId ? managerId : userId
        });
        await _models.Equipments.create({
          ...req.body,
          userId,
          isApproved: false
        });
        return (0, _response.onSuccess)(res, 201, "Equipment Created Successfully", equipment);
      }
      const equip = await _models.Equipments.findOne({
        where: {
          name: req.body.name
        }
      });
      if (equip) {
        return (0, _response.onError)(res, 409, "Equipments already exists in our data store, please use the existing equipment");
      }
      const equipment = await _models.Equipments.create({
        ...req.body,
        isApproved: true
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
      const {
        id: userId,
        managerId,
        role
      } = req.user;
      const {
        caveragePerUnit,
        equipmentPrice,
        editName,
        editUnit,
        number
      } = req.body;
      if (!editName && !editUnit && !number && !caveragePerUnit && !equipmentPrice) {
        return (0, _response.onError)(res, 400, "Please provide a field to update");
      }
      if (role === "manager" || role === "admin") {
        const equipment = await _models.UserEquipments.findOne({
          where: {
            id,
            userId: managerId ? managerId : userId
          }
        });
        if (!equipment) {
          return (0, _response.onError)(res, 404, "Equipment not found");
        }
        // caverage per unit
        const caverage = caveragePerUnit ? caveragePerUnit : equipment?.caveragePerUnit;

        // equipment price
        const equipPrice = equipmentPrice ? equipmentPrice : equipment?.hireRatePrice;
        // equipment id
        const equipmentNumber = number ? number : equipment?.number;
        const editEquipmentName = editName ? editName : equipment.name;
        const editEquipmentUnit = editUnit ? editUnit : equipment.unit;
        await equipment.update({
          caveragePerUnit: caverage,
          hireRatePrice: equipPrice,
          number: equipmentNumber,
          name: editEquipmentName,
          unit: editEquipmentUnit
        });
        return (0, _response.onSuccess)(res, 200, "Equipment Updated Successfully", equipment);
      }
      const equipment = await _models.Equipments.findOne({
        where: {
          id
        }
      });
      if (!equipment) {
        return (0, _response.onError)(res, 404, "Equipment not found");
      }
      // caverage per unit
      const caverage = caveragePerUnit ? caveragePerUnit : equipment?.caveragePerUnit;

      // equipment price
      const equipPrice = equipmentPrice ? equipmentPrice : equipment?.hireRatePrice;
      // equipment id
      const equipmentNumber = number ? number : equipment?.number;
      const editEquipmentName = editName ? editName : equipment.name;
      const editEquipmentUnit = editUnit ? editUnit : equipment.unit;
      await equipment.update({
        caveragePerUnit: caverage,
        hireRatePrice: equipPrice,
        number: equipmentNumber,
        name: editEquipmentName,
        unit: editEquipmentUnit
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
      const {
        id: userId,
        managerId,
        role
      } = req.user;
      if (role === "manager" || role === "admin") {
        const equipment = await _models.UserEquipments.findOne({
          where: {
            id,
            userId: managerId ? managerId : userId
          }
        });
        if (!equipment) {
          return (0, _response.onError)(res, 404, "Equipment not found");
        }
        await equipment.destroy();
        return (0, _response.onSuccess)(res, 200, "Equipment Deleted Successfully", equipment);
      }
      const equipment = await _models.Equipments.findOne({
        where: {
          id
        }
      });
      if (!equipment) {
        return (0, _response.onError)(res, 404, "Equipment not found");
      }
      await equipment.destroy();
      return (0, _response.onSuccess)(res, 200, "Equipment Deleted Successfully", equipment);
    } catch (error) {
      return (0, _response.onError)(res, 500, "Internal Server Error", error.message);
    }
  }
}
var _default = exports.default = UserEquipmentController;