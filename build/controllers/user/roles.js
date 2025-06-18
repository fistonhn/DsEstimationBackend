"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _models = require("../../database/models");
var _utils = require("../../utils");
var _sequelize = _interopRequireWildcard(require("sequelize"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
class RolesController {
  // create roles
  static async createRole(req, res) {
    try {
      const {
        id: userId,
        role: userRole
      } = req.user;
      if (userRole !== "owner") {
        const {
          name,
          permissions
        } = req.body;
        const role = await _models.Role.create({
          name,
          permissions,
          userId
        });
        return (0, _utils.onSuccess)(res, 201, "role created successfully", role);
      }
      const {
        name,
        permissions
      } = req.body;
      const role = await _models.Role.create({
        name,
        permissions
      });
      return (0, _utils.onSuccess)(res, 201, "role created successfully", role);
    } catch (error) {
      console.log(error);
      return (0, _utils.onError)(res, 500, "something went wrong, try again");
    }
  }

  // update roles
  static async updateRole(req, res) {
    try {
      const {
        id
      } = req.params;
      const {
        id: userId,
        role: userRole
      } = req.user;
      const {
        name,
        permissions
      } = req.body;
      if (userRole === "manager") {
        const roleExist = await _models.Role.findOne({
          where: {
            id,
            userId
          }
        });
        if (!roleExist) {
          return (0, _utils.onError)(res, 404, "role does not exist");
        }
        await roleExist.update({
          name,
          permissions
        });
        return (0, _utils.onSuccess)(res, 200, "role updated successfully", roleExist);
      }
      const roleExist = await _models.Role.findOne({
        where: {
          id
        }
      });
      if (!roleExist) {
        return (0, _utils.onError)(res, 404, "role does not exist");
      }
      await roleExist.update({
        name,
        permissions
      });
      return (0, _utils.onSuccess)(res, 200, "role updated successfully", roleExist);
    } catch (error) {
      console.log(error);
      return (0, _utils.onError)(res, 500, "something went wrong, try again");
    }
  }

  // delete role;
  static async deleteRole(req, res) {
    try {
      const {
        id
      } = req.params;
      const {
        id: userId,
        role
      } = req.user;
      if (role === "manager") {
        const roleExist = await _models.Role.findOne({
          where: {
            id,
            userId
          }
        });
        if (!roleExist) {
          return (0, _utils.onError)(res, 404, "role does not exist");
        }
        await roleExist.destroy();
        return (0, _utils.onSuccess)(res, 200, "role deleted successfully", roleExist);
      }
      const roleExist = await _models.Role.findOne({
        where: {
          id
        }
      });
      if (!roleExist) {
        return (0, _utils.onError)(res, 404, "role does not exist");
      }
      await roleExist.destroy();
      return (0, _utils.onSuccess)(res, 200, "role deleted successfully", roleExist);
    } catch (error) {
      console.log(error);
      return (0, _utils.onError)(res, 500, "something went wrong, try again");
    }
  }

  // get all roles

  static async getAllRoles(req, res) {
    try {
      const {
        id: userId
      } = req.user;
      const roles = await _models.Role.findAll({
        where: {
          userId
        }
      });
      // get all default roles
      const defaultRoles = await _models.Role.findAll({
        where: {
          userId: null
        }
      });
      const allRoles = [...roles, ...defaultRoles];
      return (0, _utils.onSuccess)(res, 200, "roles successfully retrieved", allRoles);
    } catch (error) {
      console.log(error);
      return (0, _utils.onError)(res, 500, "something went wrong, try again");
    }
  }

  // get one roles

  static async getOneRoles(req, res) {
    try {
      const {
        id
      } = req.params;
      const role = await _models.Role.findOne({
        where: {
          id
        }
      });
      if (!role) {
        return (0, _utils.onError)(res, 404, "role does not exist");
      }
      return (0, _utils.onSuccess)(res, 200, "role successfully retrieved", role);
    } catch (error) {
      console.log(error);
      return (0, _utils.onError)(res, 500, "something went wrong, try again");
    }
  }

  // assign role to user with project
  static async assignRoleToUser(req, res) {
    try {
      const {
        userId,
        projectId
      } = req.body;
      const {
        id: roleId
      } = req.params;
      const user = await _models.Staffs.findOne({
        where: {
          id: userId
        }
      });
      if (!user) {
        return (0, _utils.onError)(res, 404, "user does not exist");
      }
      const role = await _models.Role.findOne({
        where: {
          id: roleId
        }
      });
      if (!role) {
        return (0, _utils.onError)(res, 404, "role does not exist");
      }
      const project = await _models.Projects.findOne({
        where: {
          id: projectId
        }
      });
      if (!project) {
        return (0, _utils.onError)(res, 404, "project does not exist");
      }
      const accessLevel = await _models.AccessLevel.findOne({
        where: {
          userId
        }
      });
      if (!accessLevel) {
        await _models.AccessLevel.create({
          userId,
          roleId,
          accessProjectIds: [projectId]
        });
        return (0, _utils.onSuccess)(res, 201, "role assigned successfully");
      }
      const accessProjectIds = accessLevel?.accessProjectIds;
      if (accessProjectIds?.includes(projectId)) {
        return (0, _utils.onError)(res, 400, "user already has access to this project");
      }
      accessProjectIds?.push(projectId);
      await accessLevel.update({
        accessProjectIds: _sequelize.default.fn("array_append", _sequelize.default.col("accessProjectIds"), projectId),
        roleId
      });
      return (0, _utils.onSuccess)(res, 200, "role assigned to user successfully", accessLevel);
    } catch (error) {
      console.log(error);
      return (0, _utils.onError)(res, 500, "something went wrong, try again");
    }
  }

  // update role to user with project
  static async updateRoleToUser(req, res) {
    try {
      const {
        userId
      } = req.body;
      const {
        id: roleId
      } = req.params;
      const user = await _models.Staffs.findOne({
        where: {
          id: userId
        }
      });
      if (!user) {
        return (0, _utils.onError)(res, 404, "user does not exist");
      }
      const role = await _models.Role.findOne({
        where: {
          id: roleId
        }
      });
      if (!role) {
        return (0, _utils.onError)(res, 404, "role does not exist");
      }
      const accessLevel = await _models.AccessLevel.findOne({
        where: {
          userId
        }
      });
      if (!accessLevel) {
        return (0, _utils.onError)(res, 404, "user does not have access to any project");
      }
      await accessLevel.update({
        roleId
      });
      return (0, _utils.onSuccess)(res, 200, "role updated successfully", accessLevel);
    } catch (error) {
      console.log(error);
      return (0, _utils.onError)(res, 500, "something went wrong, try again");
    }
  }

  // remove project from user role
  static async removeProjectFromUserRole(req, res) {
    try {
      const {
        userId,
        projectId
      } = req.body;
      const user = await _models.Staffs.findOne({
        where: {
          id: userId
        }
      });
      if (!user) {
        return (0, _utils.onError)(res, 404, "user does not exist");
      }
      const project = await _models.Projects.findOne({
        where: {
          id: projectId
        }
      });
      if (!project) {
        return (0, _utils.onError)(res, 404, "project does not exist");
      }
      const accessLevel = await _models.AccessLevel.findOne({
        where: {
          userId
        }
      });
      if (!accessLevel) {
        return (0, _utils.onError)(res, 404, "user does not have a role");
      }
      const accessProjectIds = accessLevel.accessProjectIds;
      if (!accessProjectIds.includes(projectId)) {
        return (0, _utils.onError)(res, 400, "user does not have access to this project");
      }
      const index = accessProjectIds.indexOf(projectId);
      accessProjectIds.splice(index, 1);
      await accessLevel.update({
        accessProjectIds: _sequelize.default.fn("array_remove", _sequelize.default.col("accessProjectIds"), projectId)
      });
      return (0, _utils.onSuccess)(res, 200, "project removed from user role successfully", accessLevel);
    } catch (error) {
      console.log(error);
      return (0, _utils.onError)(res, 500, "something went wrong, try again");
    }
  }

  // get all projects assigned to user
  static async getAllProjectsAssignedToUser(req, res) {
    try {
      // from the body
      const {
        id: userId
      } = req.params;
      const user = await _models.Staffs.findOne({
        where: {
          id: userId
        }
      });
      if (!user) {
        return (0, _utils.onError)(res, 404, "user does not exist");
      }
      const accessLevel = await _models.AccessLevel.findOne({
        where: {
          userId
        }
      });
      if (!accessLevel) {
        return (0, _utils.onError)(res, 404, "user does not have a role");
      }
      const {
        accessProjectIds
      } = accessLevel;

      // get all projects that have id in accessProjectIds array
      const projects = await _models.Projects.findAll({
        where: {
          id: accessProjectIds.map(id => id)
        }
      });
      return (0, _utils.onSuccess)(res, 200, "projects successfully retrieved", projects);
    } catch (error) {
      console.log(error);
      return (0, _utils.onError)(res, 500, "something went wrong, try again");
    }
  }
}
var _default = exports.default = RolesController;