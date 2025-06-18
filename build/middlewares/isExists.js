"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _models = require("../database/models");
var _response = require("../utils/response");
class Exists {
  // check if unit exists
  static async isUnitExists(req, res, next) {
    const unit = await _models.Units.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!unit) {
      return (0, _response.onError)(res, 404, "Unit not found");
    }
    next();
  }

  // check if material exists
  static async isMaterialExists(req, res, next) {
    const material = await _models.Materials.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!material) {
      return (0, _response.onError)(res, 404, "Material not found");
    }
    next();
  }

  // check if there is data in the database
  static async isDataExistsInUnits(req, res, next) {
    const unit = await _models.Units.findAll();
    if (unit.length === 0) {
      return (0, _response.onError)(res, 404, "No data in the database");
    }
    next();
  }
  static async isDataExistsInMaterial(req, res, next) {
    const material = await _models.Materials.findAll();
    if (material.length === 0) {
      return (0, _response.onError)(res, 404, "No data in the database");
    }
    next();
  }

  // check if user exists
  static async isUserExists(req, res, next) {
    const user = await _models.Users.findOne({
      where: {
        id: req.params.id
      }
    });
    const staff = await _models.Staffs.findOne({
      where: {
        managerId: req.params.id
      }
    });
    if (!user && !staff) {
      return (0, _response.onError)(res, 404, "User not found");
    }
    next();
  }

  // is owner
  static async isOwner(req, res, next) {
    const {
      role
    } = req.user;
    if (role !== "owner") {
      return (0, _response.onError)(res, 403, "You are not authorized");
    }
    next();
  }

  // usermaterials
  static async isUserMaterialExists(req, res, next) {
    const material = await _models.UserMaterials.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!material) {
      return (0, _response.onError)(res, 404, "Material not found");
    }
    next();
  }

  // userunits
  static async isUserUnitExists(req, res, next) {
    const unit = await _models.UserUnits.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!unit) {
      return (0, _response.onError)(res, 404, "Unit not found");
    }
    next();
  }

  // userlabours
  static async isUserLabourExists(req, res, next) {
    const labour = await _models.UserLabours.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!labour) {
      return (0, _response.onError)(res, 404, "Labour not found");
    }
    next();
  }

  // usersubcontractors
  static async isUserSubContractorExists(req, res, next) {
    const subContractor = await _models.UserSubContractors.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!subContractor) {
      return (0, _response.onError)(res, 404, "SubContractor not found");
    }
    next();
  }

  // userequipments
  static async isUserEquipmentExists(req, res, next) {
    const equipment = await _models.UserEquipments.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!equipment) {
      return (0, _response.onError)(res, 404, "Equipment not found");
    }
    next();
  }

  // userestimations
  static async isUserEstimationExists(req, res, next) {
    const estimation = await _models.UserEstimations.findOne({
      where: {
        id: req.params.id
      }
    });
    const defaultEstimation = await _models.Estimations.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!estimation && !defaultEstimation) {
      return (0, _response.onError)(res, 404, "Estimation not found");
    }
    next();
  }

  // projects
  static async isProjectExists(req, res, next) {
    const {
      id: userId,
      managerId
    } = req.user;
    const project = await _models.Projects.findOne({
      where: {
        id: req.params.id,
        userId: managerId ? managerId : userId
      }
    });
    const template = await _models.Templates.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!project && !template) {
      return (0, _response.onError)(res, 404, "Project not found");
    }
    next();
  }
  // projects with estimation
  static async isProjectExistsWithEstimation(req, res, next) {
    const {
      id: userId,
      managerId
    } = req.user;
    const project = await _models.Projects.findOne({
      where: {
        id: req.params.projectId,
        userId: managerId ? managerId : userId
      }
    });
    const template = await _models.Templates.findOne({
      where: {
        id: req.params.projectId
      }
    });
    if (!project && !template) {
      return (0, _response.onError)(res, 404, "project not found");
    }
    next();
  }

  // isProject Approved
  static async isProjectApproved(req, res, next) {
    const {
      id: userId,
      managerId
    } = req.user;
    const project = await _models.Projects.findOne({
      where: {
        id: req.params.id,
        userId: managerId ? managerId : userId
      }
    });
    const template = await _models.Templates.findOne({
      where: {
        id: req.params.id
      }
    });
    const isApproved = project?.isApproved;
    const templateApproved = template?.isApproved;
    if (isApproved && templateApproved) {
      return (0, _response.onError)(res, 404, "Project is already approved, edit disabled!");
    }
    next();
  }
  // isProject Approved
  static async isProjectAlreadyApproved(req, res, next) {
    const {
      id: userId,
      managerId
    } = req.user;
    const project = await _models.Projects.findOne({
      where: {
        id: req.params.projectId,
        userId: managerId ? managerId : userId
      }
    });
    const template = await _models.Templates.findOne({
      where: {
        id: req.params.projectId
      }
    });
    const isApproved = project?.isApproved;
    const templateApproved = template?.isApproved;
    if (isApproved && templateApproved) {
      return (0, _response.onError)(res, 404, "Project is already approved, edit disabled!");
    }
    next();
  }

  // check if user trialEndDate expired
  static async isTrialExprired(req, res, next) {
    const {
      id
    } = req.user;
    const trial = await _models.Trial.findOne({
      where: {
        userId: id
      }
    });
    const isTrial = trial?.isTrial;
    const trialEndDate = trial?.trialEndDate;
    const current = new Date();
    const currentDate = current.getTime();
    const trialEndDateDate = new Date(trialEndDate);
    const trialEndDateDateTime = trialEndDateDate.getTime();
    if (isTrial && currentDate > trialEndDateDateTime) {
      return (0, _response.onError)(res, 403, "Please renew your subscription to continue");
    }
    return next();
  }
}
var _default = exports.default = Exists;