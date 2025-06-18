import {
  Users,
  Role,
  AccessLevel,
  Staffs,
  Projects,
} from "../../database/models";
import { onSuccess, onError } from "../../utils";
import { Op } from "sequelize";
import sequelize from "sequelize";

class RolesController {
  // create roles
  static async createRole(req, res) {
    try {
      const { id: userId, role: userRole } = req.user;
      if (userRole !== "owner") {
        const { name, permissions } = req.body;

        const role = await Role.create({
          name,
          permissions,
          userId,
        });

        return onSuccess(res, 201, "role created successfully", role);
      }

      const { name, permissions } = req.body;

      const role = await Role.create({
        name,
        permissions,
      });

      return onSuccess(res, 201, "role created successfully", role);
    } catch (error) {
      console.log(error);
      return onError(res, 500, "something went wrong, try again");
    }
  }

  // update roles
  static async updateRole(req, res) {
    try {
      const { id } = req.params;
      const { id: userId, role: userRole } = req.user;
      const { name, permissions } = req.body;

      if (userRole === "manager") {
        const roleExist = await Role.findOne({ where: { id, userId } });
        if (!roleExist) {
          return onError(res, 404, "role does not exist");
        }

        await roleExist.update({ name, permissions });

        return onSuccess(res, 200, "role updated successfully", roleExist);
      }

      const roleExist = await Role.findOne({ where: { id } });
      if (!roleExist) {
        return onError(res, 404, "role does not exist");
      }

      await roleExist.update({ name, permissions });

      return onSuccess(res, 200, "role updated successfully", roleExist);
    } catch (error) {
      console.log(error);
      return onError(res, 500, "something went wrong, try again");
    }
  }

  // delete role;
  static async deleteRole(req, res) {
    try {
      const { id } = req.params;
      const { id: userId, role } = req.user;
      if (role === "manager") {
        const roleExist = await Role.findOne({ where: { id, userId } });
        if (!roleExist) {
          return onError(res, 404, "role does not exist");
        }

        await roleExist.destroy();

        return onSuccess(res, 200, "role deleted successfully", roleExist);
      }

      const roleExist = await Role.findOne({ where: { id } });
      if (!roleExist) {
        return onError(res, 404, "role does not exist");
      }

      await roleExist.destroy();

      return onSuccess(res, 200, "role deleted successfully", roleExist);
    } catch (error) {
      console.log(error);
      return onError(res, 500, "something went wrong, try again");
    }
  }

  // get all roles

  static async getAllRoles(req, res) {
    try {
      const { id: userId } = req.user;
      const roles = await Role.findAll({ where: { userId } });
      // get all default roles
      const defaultRoles = await Role.findAll({ where: { userId: null } });
      const allRoles = [...roles, ...defaultRoles];
      return onSuccess(res, 200, "roles successfully retrieved", allRoles);
    } catch (error) {
      console.log(error);
      return onError(res, 500, "something went wrong, try again");
    }
  }

  // get one roles

  static async getOneRoles(req, res) {
    try {
      const { id } = req.params;

      const role = await Role.findOne({ where: { id } });
      if (!role) {
        return onError(res, 404, "role does not exist");
      }
      return onSuccess(res, 200, "role successfully retrieved", role);
    } catch (error) {
      console.log(error);
      return onError(res, 500, "something went wrong, try again");
    }
  }

  // assign role to user with project
  static async assignRoleToUser(req, res) {
    try {
      const { userId, projectId } = req.body;
      const { id: roleId } = req.params;

      const user = await Staffs.findOne({ where: { id: userId } });
      if (!user) {
        return onError(res, 404, "user does not exist");
      }

      const role = await Role.findOne({ where: { id: roleId } });
      if (!role) {
        return onError(res, 404, "role does not exist");
      }

      const project = await Projects.findOne({ where: { id: projectId } });
      if (!project) {
        return onError(res, 404, "project does not exist");
      }

      const accessLevel = await AccessLevel.findOne({
        where: { userId },
      });
      if (!accessLevel) {
        await AccessLevel.create({
          userId,
          roleId,
          accessProjectIds: [projectId],
        });
        return onSuccess(res, 201, "role assigned successfully");
      }
      const accessProjectIds = accessLevel?.accessProjectIds;

      if (accessProjectIds?.includes(projectId)) {
        return onError(res, 400, "user already has access to this project");
      }

      accessProjectIds?.push(projectId);

      await accessLevel.update({
        accessProjectIds: sequelize.fn(
          "array_append",
          sequelize.col("accessProjectIds"),
          projectId
        ),
        roleId,
      });
      return onSuccess(
        res,
        200,
        "role assigned to user successfully",
        accessLevel
      );
    } catch (error) {
      console.log(error);
      return onError(res, 500, "something went wrong, try again");
    }
  }

  // update role to user with project
  static async updateRoleToUser(req, res) {
    try {
      const { userId } = req.body;
      const { id: roleId } = req.params;

      const user = await Staffs.findOne({ where: { id: userId } });
      if (!user) {
        return onError(res, 404, "user does not exist");
      }

      const role = await Role.findOne({ where: { id: roleId } });
      if (!role) {
        return onError(res, 404, "role does not exist");
      }

      const accessLevel = await AccessLevel.findOne({ where: { userId } });
      if (!accessLevel) {
        return onError(res, 404, "user does not have access to any project");
      }

      await accessLevel.update({ roleId });
      return onSuccess(res, 200, "role updated successfully", accessLevel);
    } catch (error) {
      console.log(error);
      return onError(res, 500, "something went wrong, try again");
    }
  }

  // remove project from user role
  static async removeProjectFromUserRole(req, res) {
    try {
      const { userId, projectId } = req.body;

      const user = await Staffs.findOne({ where: { id: userId } });
      if (!user) {
        return onError(res, 404, "user does not exist");
      }

      const project = await Projects.findOne({ where: { id: projectId } });
      if (!project) {
        return onError(res, 404, "project does not exist");
      }

      const accessLevel = await AccessLevel.findOne({ where: { userId } });
      if (!accessLevel) {
        return onError(res, 404, "user does not have a role");
      }

      const accessProjectIds = accessLevel.accessProjectIds;

      if (!accessProjectIds.includes(projectId)) {
        return onError(res, 400, "user does not have access to this project");
      }

      const index = accessProjectIds.indexOf(projectId);
      accessProjectIds.splice(index, 1);

      await accessLevel.update({
        accessProjectIds: sequelize.fn(
          "array_remove",
          sequelize.col("accessProjectIds"),
          projectId
        ),
      });

      return onSuccess(
        res,
        200,
        "project removed from user role successfully",
        accessLevel
      );
    } catch (error) {
      console.log(error);
      return onError(res, 500, "something went wrong, try again");
    }
  }

  // get all projects assigned to user
  static async getAllProjectsAssignedToUser(req, res) {
    try {
      // from the body
      const { id: userId } = req.params;

      const user = await Staffs.findOne({ where: { id: userId } });
      if (!user) {
        return onError(res, 404, "user does not exist");
      }

      const accessLevel = await AccessLevel.findOne({ where: { userId } });
      if (!accessLevel) {
        return onError(res, 404, "user does not have a role");
      }
      const { accessProjectIds } = accessLevel;

      // get all projects that have id in accessProjectIds array
      const projects = await Projects.findAll({
        where: { id: accessProjectIds.map((id) => id) },
      });

      return onSuccess(res, 200, "projects successfully retrieved", projects);
    } catch (error) {
      console.log(error);
      return onError(res, 500, "something went wrong, try again");
    }
  }
}
export default RolesController;
