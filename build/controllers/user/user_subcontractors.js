"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _models = require("../../database/models");
var _response = require("../../utils/response");
class UserSubContractorsController {
  // get all sub contractors
  static async getAllSubContractors(req, res) {
    try {
      const {
        id: userId,
        managerId
      } = req.user;
      const subContractors = await _models.UserSubContractors.findAll({
        where: {
          userId: managerId ? managerId : userId
        },
        include: [{
          model: _models.UserEstimationLibrary,
          as: "subcontractor_calculation",
          attributes: ["subContractorTotalAmount"]
        }]
      });
      return (0, _response.onSuccess)(res, 200, "All Sub Contractors retrieved successfully", subContractors);
    } catch (error) {
      return (0, _response.onError)(res, 500, "Internal Server Error", error.message);
    }
  }

  // get a sub contractor by id
  static async getSubContractorById(req, res) {
    try {
      const {
        id: userId,
        managerId
      } = req.user;
      const subContractor = await _models.UserSubContractors.findOne({
        where: {
          id: req.params.id,
          userId: managerId ? managerId : userId
        },
        include: [{
          model: _models.UserEstimationLibrary,
          as: "subcontractor_calculation",
          attributes: ["subContractorTotalAmount"]
        }]
      });
      return (0, _response.onSuccess)(res, 200, "Sub Contractor retrieved successfully", subContractor);
    } catch (error) {
      return (0, _response.onError)(res, 500, "Internal Server Error", error.message);
    }
  }

  // create a sub contractor
  static async createSubContractor(req, res) {
    try {
      const {
        id: userId,
        role,
        managerId
      } = req.user;
      if (role === "manager" || role === "admin") {
        const subContractor = await _models.UserSubContractors.create({
          ...req.body,
          userId: managerId ? managerId : userId
        });
        await _models.SubContractors.create({
          ...req.body,
          userId: managerId ? managerId : userId,
          isApproved: false
        });
        return (0, _response.onSuccess)(res, 201, "Sub Contractor created successfully", subContractor);
      }
      const subContractor = await _models.SubContractors.create({
        ...req.body
      });
      return (0, _response.onSuccess)(res, 201, "Sub Contractor created successfully", subContractor);
    } catch (error) {
      return (0, _response.onError)(res, 500, "Internal Server Error", error.message);
    }
  }

  // update a sub contractor
  static async updateSubContractor(req, res) {
    try {
      const {
        id: userId,
        managerId,
        role
      } = req.user;
      const {
        id
      } = req.params;
      const {
        price,
        editName,
        editUnit
      } = req.body;
      if (role === 'manager' || role === 'admin') {
        const subContractor = await _models.UserSubContractors.findOne({
          where: {
            id,
            userId: managerId ? managerId : userId
          }
        });
        if (!subContractor) return (0, _response.onError)(res, 404, 'Subcontractor not found');
        const subc_price = price ? price : subContractor.price;
        const editSubContractorName = editName ? editName : subContractor.name;
        const editSubcontractorUnit = editUnit ? editUnit : subContractor.unit;
        await subContractor.update({
          price: subc_price,
          name: editSubContractorName,
          unit: editSubcontractorUnit
        });
        return (0, _response.onSuccess)(res, 200, "Sub Contractor updated successfully", subContractor);
      }
      const subContractor = await _models.SubContractors.findOne({
        where: {
          id
        }
      });
      if (!subContractor) return (0, _response.onError)(res, 404, 'Subcontractor not found');
      const subc_price = price ? price : subContractor.price;
      const editSubContractorName = editName ? editName : subContractor.name;
      const editSubcontractorUnit = editUnit ? editUnit : subContractor.unit;
      await subContractor.update({
        price: subc_price,
        name: editSubContractorName,
        unit: editSubcontractorUnit
      });
      return (0, _response.onSuccess)(res, 200, "Sub Contractor updated successfully", subContractor);
    } catch (error) {
      return (0, _response.onError)(res, 500, "Internal Server Error", error.message);
    }
  }

  // delete a sub contractor
  static async deleteSubContractor(req, res) {
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
        const subContractor = await _models.UserSubContractors.findOne({
          where: {
            id,
            userId: managerId ? managerId : userId
          }
        });
        if (!subContractor) return (0, _response.onError)(res, 404, 'Subcontractor not found');
        await subContractor.destroy();
        return (0, _response.onSuccess)(res, 200, "Sub Contractor deleted successfully", subContractor);
      }
      const subContractor = await _models.SubContractors.findOne({
        where: {
          id
        }
      });
      if (!subContractor) return (0, _response.onError)(res, 404, 'Subcontractor not found');
      await subContractor.destroy();
      return (0, _response.onSuccess)(res, 200, "Sub Contractor deleted successfully", subContractor);
    } catch (error) {
      return (0, _response.onError)(res, 500, "Internal Server Error", error.message);
    }
  }
}
var _default = exports.default = UserSubContractorsController;