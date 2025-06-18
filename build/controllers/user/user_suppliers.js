"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _models = require("../../database/models");
var _response = require("../../utils/response");
class SuppliersController {
  // get all supplier
  static async getAllSuppliers(req, res) {
    try {
      const {
        id: userId,
        managerId
      } = req.user;
      const suppliers = await _models.UserSupplier.findAll({
        where: {
          userId: managerId ? managerId : userId
        },
        include: [{
          model: _models.Projects,
          as: "projects",
          attributes: ["name", "description"]
        }, {
          model: _models.UserEquipments,
          as: "supplied_equipments",
          attributes: ["name", "unit", "caveragePerUnit", "hireRatePrice", "number"]
        }, {
          model: _models.UserMaterials,
          as: "supplied_materials",
          attributes: ["name", "quantity", "unit", "caveragePerUnit", "price"]
        }]
      });
      return (0, _response.onSuccess)(res, 200, "Suppliers retrieved successfully", suppliers);
    } catch (error) {
      return (0, _response.onError)(res, 500, "Internal Server Error", error.message);
    }
  }

  // get a supplier
  static async getSupplierById(req, res) {
    try {
      const {
        id: userId,
        managerId
      } = req.user;
      const {
        id: supplierId
      } = req.params;
      const supplier = await _models.UserSupplier.findOne({
        where: {
          id: supplierId,
          userId: managerId ? managerId : userId
        },
        include: [{
          model: _models.Projects,
          as: "projects",
          attributes: ["name", "description"]
        }, {
          model: _models.UserEquipments,
          as: "supplied_equipments",
          attributes: ["name", "unit", "caveragePerUnit", "hireRatePrice", "number"]
        }, {
          model: _models.UserMaterials,
          as: "supplied_materials",
          attributes: ["name", "quantity", "unit", "caveragePerUnit", "price"]
        }]
      });
      return (0, _response.onSuccess)(res, 200, "Supplier retrieved successfully", supplier);
    } catch (error) {
      return (0, _response.onError)(res, 500, "Internal Server Error", error.message);
    }
  }

  // create a supplier
  static async createSupplier(req, res) {
    try {
      const {
        id: userId,
        role,
        managerId
      } = req.user;
      if (role === "manager" || role === 'admin') {
        const {
          projectId
        } = req.body;
        const supplier = await _models.UserSupplier.create({
          ...req.body,
          projectId,
          userId: managerId ? managerId : userId
        });
        await _models.Suppliers.create({
          ...req.body,
          userId: managerId ? managerId : userId,
          isApproved: false
        });
        return (0, _response.onSuccess)(res, 201, "Supplier created successfully", supplier);
      }
      const supplier = await _models.Suppliers.create({
        ...req.body
      });
      return (0, _response.onSuccess)(res, 201, "Supplier created successfully", supplier);
    } catch (error) {
      return (0, _response.onError)(res, 500, "Internal Server Error", error.message);
    }
  }

  // update a supplier
  static async updateSupplier(req, res) {
    try {
      const {
        id: userId,
        managerId
      } = req.user;
      const {
        id: supplierId
      } = req.params;
      const supplier = await _models.UserSupplier.findOne({
        where: {
          id: supplierId,
          userId: managerId ? managerId : userId
        }
      });
      await supplier.update({
        ...req.body
      });
      return (0, _response.onSuccess)(res, 200, "Supplier updated successfully", supplier);
    } catch (error) {
      return (0, _response.onError)(res, 500, "Internal Server Error", error.message);
    }
  }
  static async deleteSupplier(req, res) {
    try {
      const {
        id: userId,
        managerId
      } = req.user;
      const {
        id: supplierId
      } = req.params;
      const supplier = await _models.UserSupplier.findOne({
        where: {
          id: supplierId,
          userId: managerId ? managerId : userId
        }
      });
      await supplier.destroy();
      return (0, _response.onSuccess)(res, 200, "Supplier deleted successfully", supplier);
    } catch (error) {
      return (0, _response.onError)(res, 500, "Internal Server Error", error.message);
    }
  }
}
var _default = exports.default = SuppliersController;