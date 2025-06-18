"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _models = require("../../database/models");
var _response = require("../../utils/response");
class SuppliersController {
  // get all suppliers
  static async getAllSuppliers(req, res) {
    try {
      const suppliers = await _models.Suppliers.findAll({
        where: {
          isApproved: true
        },
        include: [{
          model: _models.Equipments,
          as: "supplied_equipments",
          attributes: ["name", "unit", "caveragePerUnit", "hireRatePrice", "number", "isApproved"]
        }, {
          model: _models.Materials,
          as: "supplied_materials",
          attributes: ["name", "quantity", "unit", "caveragePerUnit", "price", "isApproved"]
        }, {
          model: _models.Users,
          as: "client-suppliers",
          attributes: ["name"]
        }]
      });
      return (0, _response.onSuccess)(res, 200, "Suppliers retrieved successfully", suppliers);
    } catch (error) {
      console.log(error);
      return (0, _response.onError)(res, 500, "Internal Server Error");
    }
  }

  // get a supplier
  static async getSupplierById(req, res) {
    try {
      const {
        id: supplierId
      } = req.params;
      const supplier = await _models.Suppliers.findOne({
        where: {
          id: supplierId
        },
        include: [{
          model: _models.Equipments,
          as: "supplied_equipments",
          attributes: ["name", "unit", "caveragePerUnit", "hireRatePrice", "number", "isApproved"]
        }, {
          model: _models.Materials,
          as: "supplied_materials",
          attributes: ["name", "quantity", "unit", "caveragePerUnit", "price", "isApproved"]
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
        id: supplierId
      } = req.params;
      const supplier = await _models.Suppliers.findOne({
        where: {
          id: supplierId
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
        id: supplierId
      } = req.params;
      const supplier = await _models.Suppliers.findOne({
        where: {
          id: supplierId
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