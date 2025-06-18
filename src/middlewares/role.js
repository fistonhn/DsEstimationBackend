import { AccessLevel, Role as RoleModel } from "../database/models";
import { onError } from "../utils/response";

export default class Role {
  static isOwner(req, res, next) {
    const role = req.user.role;
    // check if user is owner
    if (role !== "owner") {
      return onError(res, 403, "Forbidden");
    }
    next();
  }
  static isManager(req, res, next) {
    const role = req.user.role;
    // check if user is manager
    if (role !== "manager") {
      return onError(res, 403, "Forbidden");
    }
    next();
  }
  static isAdmin(req, res, next) {
    const role = req.user.role;
    // check if user is admin
    if (role !== "admin" && role !== "manager") {
      return onError(res, 403, "Forbidden");
    }
    next();
  }

  static isOwnerOrManager(req, res, next) {
    const role = req.user.role;
    // check if user is admin
    if (role !== "owner" && role !== "manager") {
      return onError(res, 403, "Forbidden");
    }
    next();
  }

  // does user have access to read project
  static async canReadProject(req, res, next) {
    try {
      const { id } = req.params;
      const { id: userId, role: userRole } = req.user;
      if (userRole === "manager" || userRole === "owner") {
        return next();
      }
      const accessLevel = await AccessLevel.findOne({
        where: {
          userId,
        },
        include: [
          {
            model: RoleModel,
            as: "role",
          },
        ],
      });
      const accessProjectIds = accessLevel?.accessProjectIds;
      const role = accessLevel?.role;
      const permissions = role?.permissions;

      if (!accessProjectIds?.includes(parseInt(id, 10))) {
        return onError(res, 401, "Forbidden");
      }
      // check if persmission include read

      if (!permissions?.includes("read")) {
        return onError(res, 401, "Unauthorized");
      }
      return next();
    } catch (error) {
      return onError(res, 500, "something went wrong, try again");
    }
  }
}
