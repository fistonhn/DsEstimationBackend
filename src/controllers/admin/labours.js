import { Labours } from "../../database/models";
import { onSuccess, onError } from "../../utils/response";

class LabourController {
  // Get all labours
  static async getAllLabour(req, res) {
    try {
      const labours = await Labours.findAll({
        where: { isApproved: true, templateId: null },
      });
      if (labours.length === 0) {
        return onSuccess(res, 200, "You have no labours", labours);
      }
      return onSuccess(res, 200, "Labours retrieved successfully", labours);
    } catch (error) {
      return onError(res, 500, "Internal  Server Error", error.message);
    }
  }

  // Get all labours where isApproved=false
  static async getAllUnapprovedLabour(req, res) {
    try {
      const labours = await Labours.findAll({
        where: { isApproved: false },
      });
      if (labours.length === 0) {
        return onSuccess(
          res,
          200,
          "You have zero un-approved labours",
          labours
        );
      }
      return onSuccess(res, 200, "Labours Retrieved Successfully", labours);
    } catch (error) {
      return onError(res, 500, "sowmething went wrong, try again");
    }
  }

  // Approve un approved labour
  static async approveLabour(req, res) {
    try {
      const { id } = req.params;
      const labour = await Labours.findByPk(id);
      if (!labour) {
        return onError(res, 404, "Labour not found");
      }

      if (labour.isApproved) {
        await labour.update({ isApproved: false });
        return onSuccess(res, 200, "Labour Unapproved Successfully", labour);
      }

      await labour.update({ isApproved: true });
      return onSuccess(res, 200, "Labour Approved Successfully", labour);
    } catch (error) {
      return onError(res, 500, "something went wrong, try again");
    }
  }

  // get labour by id
  static async getLabourById(req, res) {
    try {
      const labour = await Labours.findOne({
        where: { id: req.params.id },
      });
      if (!labour) {
        return onError(res, 404, "Labour not found");
      }
      return onSuccess(res, 200, "Labour retrieved successfully", labour);
    } catch (error) {
      return onError(res, 500, "Internal  Server Error", error.message);
    }
  }

  // create labour
  static async createLabour(req, res) {
    try {
      const labour = await Labours.create({
        ...req.body,
      });
      return onSuccess(res, 201, "Labour created successfully", labour);
    } catch (error) {
      return onError(res, 500, "Internal  Server Error", error.message);
    }
  }

  // update labour
  static async updateLabour(req, res) {
    try {
      const { id } = req.params;
      const labour = await Labours.findOne({
        where: { id },
      });
      await labour.update({ ...req.body });
      return onSuccess(res, 200, "Labour updated successfully", labour);
    } catch (error) {
      return onError(res, 500, "Internal  Server Error", error.message);
    }
  }

  // delete labour

  static async deleteLabour(req, res) {
    try {
      const { id } = req.params;
      const labour = await Labours.findOne({ where: { id } });
      await labour.destroy();
      return onSuccess(res, 200, "Labour deleted successfully", labour);
    } catch (error) {
      return onError(res, 500, "Internal  Server Error", error.message);
    }
  }
}
export default LabourController;
