"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _models = require("../../database/models");
var _response = require("../../utils/response");
class SubContractorsController {
  // get all sub contractors
  static async getAllSubContractors(req, res) {
    try {
      const subContractors = await _models.SubContractors.findAll({
        where: {
          isApproved: true,
          templateId: null
        }
      });
      if (subContractors.length === 0) {
        return (0, _response.onSuccess)(res, 400, "You have no sub contractors", subContractors);
      }
      return (0, _response.onSuccess)(res, 200, "All Sub Contractors retrieved successfully", subContractors);
    } catch (error) {
      return (0, _response.onError)(res, 500, "Internal Server Error", error.message);
    }
  }

  // get all sub contractors where isApproved=false
  static async getAllUnapprovedSubContractors(req, res) {
    try {
      const subContractors = await _models.SubContractors.findAll({
        where: {
          isApproved: false
        }
      });
      if (subContractors.length === 0) {
        return (0, _response.onSuccess)(res, 200, "You have zero un-approved sub contractors", subContractors);
      }
      return (0, _response.onSuccess)(res, 200, "Sub Contractors Retrieved Successfully", subContractors);
    } catch (error) {
      return (0, _response.onError)(res, 500, "sowmething went wrong, try again");
    }
  }

  // approve a sub contractor
  static async approveSubContractor(req, res) {
    try {
      const {
        id
      } = req.params;
      const subContractor = await _models.SubContractors.findByPk(id);
      if (!subContractor) {
        return (0, _response.onError)(res, 404, "Sub Contractor not found");
      }
      if (subContractor.isApproved) {
        await subContractor.update({
          isApproved: false
        });
        return (0, _response.onSuccess)(res, 200, "Sub Contractor Unapproved Successfully", subContractor);
      }
      await subContractor.update({
        isApproved: true
      });
      return (0, _response.onSuccess)(res, 200, "Sub Contractor Approved Successfully", subContractor);
    } catch (error) {
      return (0, _response.onError)(res, 500, "something went wrong, try again");
    }
  }

  // get a sub contractor by id
  static async getSubContractorById(req, res) {
    try {
      const subContractor = await _models.SubContractors.findOne({
        where: {
          id: req.params.id
        }
      });
      if (!subContractor) {
        return (0, _response.onError)(res, 404, "Sub Contractor not found");
      }
      return (0, _response.onSuccess)(res, 200, "Sub Contractor retrieved successfully", subContractor);
    } catch (error) {
      return (0, _response.onError)(res, 500, "Internal Server Error", error.message);
    }
  }

  // create a sub contractor
  static async createSubContractor(req, res) {
    try {
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
        id
      } = req.params;
      const subContractor = await _models.SubContractors.findOne({
        where: {
          id
        }
      });
      await subContractor.update({
        ...req.body
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
        id
      } = req.params;
      const subContractor = await _models.SubContractors.findOne({
        where: {
          id
        }
      });
      await subContractor.destroy();
      return (0, _response.onSuccess)(res, 200, "Sub Contractor deleted successfully", subContractor);
    } catch (error) {
      return (0, _response.onError)(res, 500, "Internal Server Error", error.message);
    }
  }
}
var _default = exports.default = SubContractorsController;