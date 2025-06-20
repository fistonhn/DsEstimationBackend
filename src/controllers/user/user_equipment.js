import {
  UserEquipments,
  Equipments,
  UserEstimationLibrary,
} from "../../database/models";
import { onSuccess, onError } from "../../utils/response";

class UserEquipmentController {
  // get all equipments
  static async getAllEquipments(req, res) {
    try {
      const { id: userId, managerId } = req.user;
      const equipments = await UserEquipments.findAll({
        where: { userId: managerId ? managerId : userId },
        include: [
          {
            model: UserEstimationLibrary,
            as: "equipment_calculation",
            attributes: ["equipmentPerformance", "equipmentTotalAmount"],
          },
        ],
      });
      if (equipments.length === 0) {
        return onError(res, 404, "You have no equipments");
      }
      return onSuccess(
        res,
        200,
        "Equipments Retrieved Successfully",
        equipments
      );
    } catch (error) {
      return onError(res, 500, error);
    }
  }

  // get equipmet by id
  static async getEquipmentById(req, res) {
    try {
      const { id } = req.params;
      const { id: userId, managerId } = req.user;
      const equipment = await UserEquipments.findOne({
        where: { id, userId: managerId ? managerId : userId },
        include: [
          {
            model: UserEstimationLibrary,
            as: "equipment_calculation",
            attributes: ["equipmentPerformance", "equipmentTotalAmount"],
          },
        ],
      });
      return onSuccess(res, 200, "Equipment Retrieved Successfully", equipment);
    } catch (error) {
      return onError(res, 500, error);
    }
  }

  // create equipment
  static async createEquipment(req, res) {
    try {
      const { id: userId, role, managerId } = req.user;
      if (role === "manager" || role === "admin") {
        const equip = await Equipments.findOne({
          where: { name: req.body.name },
        });
        if (equip) {
          return onError(
            res,
            409,
            "Equipments already exists in our data store, please use the existing material"
          );
        }
        // find if user_material already exists
        const userEquip = await UserEquipments.findOne({
          where: {
            name: req.body.name,
            userId: managerId ? managerId : userId,
          },
        });
        if (userEquip) {
          return onError(
            res,
            409,
            "Equipment already exists in your data store"
          );
        }

        const equipment = await UserEquipments.create({
          ...req.body,
          userId: managerId ? managerId : userId,
        });

        await Equipments.create({
          ...req.body,
          userId,
          isApproved: false,
        });
        return onSuccess(res, 201, "Equipment Created Successfully", equipment);
      }

      const equip = await Equipments.findOne({
        where: { name: req.body.name },
      });
      if (equip) {
        return onError(
          res,
          409,
          "Equipments already exists in our data store, please use the existing equipment"
        );
      }

      const equipment = await Equipments.create({
        ...req.body,
        isApproved: true,
      });

      return onSuccess(res, 201, "Equipment Created Successfully", equipment);
    } catch (error) {
      return onError(res, 500, "Internal Server Error", error.message);
    }
  }

  // update equipment
  static async updateEquipment(req, res) {
    try {
      const { id } = req.params;
      const { id: userId, managerId, role } = req.user;
      const { caveragePerUnit, equipmentPrice, editName, editUnit, number } =
        req.body;

      if (
        !editName &&
        !editUnit &&
        !number &&
        !caveragePerUnit &&
        !equipmentPrice
      ) {
        return onError(res, 400, "Please provide a field to update");
      }

      if (role === "manager" || role === "admin") {
        const equipment = await UserEquipments.findOne({
          where: { id, userId: managerId ? managerId : userId },
        });
        if (!equipment) {
          return onError(res, 404, "Equipment not found");
        }
        // caverage per unit
        const caverage = caveragePerUnit
          ? caveragePerUnit
          : equipment?.caveragePerUnit;

        // equipment price
        const equipPrice = equipmentPrice
          ? equipmentPrice
          : equipment?.hireRatePrice;
        // equipment id
        const equipmentNumber = number ? number : equipment?.number;

        const editEquipmentName = editName ? editName : equipment.name;
        const editEquipmentUnit = editUnit ? editUnit : equipment.unit;
        await equipment.update({
          caveragePerUnit: caverage,
          hireRatePrice: equipPrice,
          number: equipmentNumber,
          name: editEquipmentName,
          unit: editEquipmentUnit,
        });

        return onSuccess(res, 200, "Equipment Updated Successfully", equipment);
      }

      const equipment = await Equipments.findOne({
        where: { id },
      });
      if (!equipment) {
        return onError(res, 404, "Equipment not found");
      }
      // caverage per unit
      const caverage = caveragePerUnit
        ? caveragePerUnit
        : equipment?.caveragePerUnit;

      // equipment price
      const equipPrice = equipmentPrice
        ? equipmentPrice
        : equipment?.hireRatePrice;
      // equipment id
      const equipmentNumber = number ? number : equipment?.number;

      const editEquipmentName = editName ? editName : equipment.name;
      const editEquipmentUnit = editUnit ? editUnit : equipment.unit;
      await equipment.update({
        caveragePerUnit: caverage,
        hireRatePrice: equipPrice,
        number: equipmentNumber,
        name: editEquipmentName,
        unit: editEquipmentUnit,
      });

      return onSuccess(res, 200, "Equipment Updated Successfully", equipment);
    } catch (error) {
      return onError(res, 500, "Internal Server Error", error.message);
    }
  }

  // delete equipment
  static async deleteEquipment(req, res) {
    try {
      const { id } = req.params;
      const { id: userId, managerId, role } = req.user;

      if (role === "manager" || role === "admin") {
        const equipment = await UserEquipments.findOne({
          where: { id, userId: managerId ? managerId : userId },
        });
        if (!equipment) {
          return onError(res, 404, "Equipment not found");
        }
        await equipment.destroy();

        return onSuccess(res, 200, "Equipment Deleted Successfully", equipment);
      }
      const equipment = await Equipments.findOne({
        where: { id },
      });
      if (!equipment) {
        return onError(res, 404, "Equipment not found");
      }
      await equipment.destroy();

      return onSuccess(res, 200, "Equipment Deleted Successfully", equipment);
    } catch (error) {
      return onError(res, 500, "Internal Server Error", error.message);
    }
  }
}
export default UserEquipmentController;
