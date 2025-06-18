import { Units } from "../../database/models";
import { onSuccess, onError } from "../../utils/response";

class UnitsController {
  // get all units
  static async getAllUnits(req, res) {
    try {
      const units = await Units.findAll({ where: { isApproved: true } });
      if (units.length === 0) {
        return onSuccess(res, 200, "You have no units", units);
      }
      return onSuccess(res, 200, "Units retrieved successfully", units);
    } catch (error) {
      return onError(res, 500, "Internal Server Error");
    }
  }

  // get all units where isApproved=false
  static async getAllUnapprovedUnits(req, res) {
    try {
      const units = await Units.findAll({
        where: { isApproved: false },
      });
      if (units.length === 0) {
        return onSuccess(res, 200, "You have zero un-approved units", units);
      }
      return onSuccess(res, 200, "Units Retrieved Successfully", units);
    } catch (error) {
      return onError(res, 500, "sowmething went wrong, try again");
    }
  }

  // Approve un approved unit
  static async approveUnit(req, res) {
    try {
      const { id } = req.params;
      const unit = await Units.findByPk(id);
      if (!unit) {
        return onError(res, 404, "Unit not found");
      }
      // check if unit is already approved then update isApproved false
      if (unit.isApproved) {
        await unit.update({ isApproved: false });
        return onSuccess(res, 200, "Unit disapproved successfully", unit);
      }

      await unit.update({ isApproved: true });
      return onSuccess(res, 200, "Unit Approved Successfully", unit);
    } catch (error) {
      return onError(res, 500, "something went wrong, try again");
    }
  }

  // get unit by id
  static async getUnitById(req, res) {
    try {
      const unit = await Units.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!unit) {
        return onError(res, 404, "Unit not found");
      }
      return onSuccess(res, 200, "Unit retrieved successfully", unit);
    } catch (error) {
      return onError(res, 500, "Internal Server Error");
    }
  }

  // create new unit
  static async createUnit(req, res) {
    try {
      const unit = await Units.create({
        ...req.body,
      });
      return onSuccess(res, 201, "Unit created successfully", unit);
    } catch (error) {
      return onError(res, 500, "Internal Server Error");
    }
  }

  // update unit
  static async updateUnit(req, res) {
    try {
      const { id } = req.params;
      const unit = await Units.findOne({ where: { id } });
      await unit.update({ ...req.body });
      return onSuccess(res, 200, "Unit updated successfully", unit);
    } catch (error) {
      return onError(res, 500, "Internal Server Error");
    }
  }

  // delete unit
  static async deleteUnit(req, res) {
    try {
      const { id } = req.params;
      const unit = await Units.findOne({ where: { id } });
      await unit.destroy();
      return onSuccess(res, 200, "Unit deleted successfully", unit);
    } catch (error) {
      return onError(res, 500, "Internal Server Error");
    }
  }
}

export default UnitsController;
