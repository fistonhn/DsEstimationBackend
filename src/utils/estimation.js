// get all project estimation
import {
  UserMaterials,
  UserEquipments,
  UserEstimations,
  UserSubContractors,
  UserLabours,
  Estimations,
  Materials,
  Equipments,
  Labours,
  SubContractors,
} from "../database/models";

import {returnNumber} from './helper'

export const getAllUserProjectEstimation = async (projectId) => {
  try {
    const estimation = await UserEstimations.findAll({
      where: { projectId },
      include: [
        {
          model: UserMaterials,
          as: "materials",
          attributes: [
            "id",
            "name",
            "quantity",
            "unit",
            "caveragePerUnit",
            "price",
            "brand",
            "inputUnit",
            "inputQuantity",
            "outputUnit",
            "outputQuantity",
            "adjustFactor"
          ],
          through: {
            attributes: ["materialFactorQuantity", "materialTotalAmount"],
          },
        },
        {
          model: UserEquipments,
          as: "equipments",
          attributes: [
            "id",
            "name",
            "unit",
            "caveragePerUnit",
            "hireRatePrice",
            "number",
            "brand",
            "inputUnit",
            "inputQuantity",
            "outputUnit",
            "outputQuantity",
            "adjustFactor"
          ],
          through: {
            attributes: ["equipmentPerformance", "equipmentTotalAmount"],
          },
        },
        {
          model: UserLabours,
          as: "labours",
          attributes: [
            "id",
            "name",
            "number",
            "unit",
            "caveragePerUnit",
            "wages",
            "brand",
            "inputUnit",
            "inputQuantity",
            "outputUnit",
            "outputQuantity",
            "adjustFactor"
          ],
          through: {
            attributes: ["labourFactorQuantity", "labourTotalAmount"],
          },
        },
        {
          model: UserSubContractors,
          as: "subContractors",
          attributes: ["id", "name", "unit", "quantity", "price"],
          through: {
            attributes: ["subContractorTotalAmount"],
          },
        },
      ],
    });

    return estimation;
  } catch (error) {
    return "connection timeout, try again";
  }
};

export const getAllTemplateEstimation = async (projectId) => {
  try {
    const estimation = await Estimations.findAll({
      where: { templateId: projectId },
      include: [
        {
          model: Materials,
          as: "materials",
          attributes: [
            "id",
            "name",
            "quantity",
            "unit",
            "caveragePerUnit",
            "price",
            "brand",
            "inputUnit",
            "inputQuantity",
            "outputUnit",
            "outputQuantity",
            "adjustFactor"
          ],
          through: {
            attributes: ["materialFactorQuantity", "materialTotalAmount"],
          },
        },
        {
          model: Equipments,
          as: "equipments",
          attributes: [
            "id",
            "name",
            "unit",
            "caveragePerUnit",
            "hireRatePrice",
            "number",
            "brand",
            "inputUnit",
            "inputQuantity",
            "outputUnit",
            "outputQuantity",
            "adjustFactor"
          ],
          through: {
            attributes: ["equipmentPerformance", "equipmentTotalAmount"],
          },
        },
        {
          model: Labours,
          as: "labours",
          attributes: [
            "id",
            "name",
            "number",
            "unit",
            "caveragePerUnit",
            "wages",
            "brand",
            "inputUnit",
            "inputQuantity",
            "outputUnit",
            "outputQuantity",
            "adjustFactor"
          ],
          through: {
            attributes: ["labourFactorQuantity", "labourTotalAmount"],
          },
        },
        {
          model: SubContractors,
          as: "subContractors",
          attributes: ["id", "name", "unit", "quantity", "price"],
          through: {
            attributes: ["subContractorTotalAmount"],
          },
        },
      ],
    });

    return estimation;
  } catch (error) {
    return "connection timeout, try again";
  }
};

// re-calculate estimation

export const recalculateUserSingleEstimation = async (estimationId, isUser=true) => {

  if(isUser){
    
         const updateEstimation = await UserEstimations.findOne({
              where: { id: estimationId },
              include: [
                {
                  model: UserMaterials,
                  as: "materials",
                  attributes: [
                    "id",
                    "name",
                    "quantity",
                    "unit",
                    "caveragePerUnit",
                    "price",
                    "brand",
                        "inputUnit",
                        "inputQuantity",
                        "outputUnit",
                        "outputQuantity",
                        "adjustFactor"
                  ],
                  through: {
                    attributes: ["materialFactorQuantity", "materialTotalAmount"],
                  },
                },
                {
                  model: UserEquipments,
                  as: "equipments",
                  attributes: [
                    "id",
                    "name",
                    "unit",
                    "caveragePerUnit",
                    "hireRatePrice",
                    "number",
                    "brand",
                        "inputUnit",
                        "inputQuantity",
                        "outputUnit",
                        "outputQuantity",
                        "adjustFactor"
                  ],
                  through: {
                    attributes: ["equipmentPerformance", "equipmentTotalAmount"],
                  },
                },
                {
                  model: UserLabours,
                  as: "labours",
                  attributes: [
                    "id",
                    "name",
                    "number",
                    "unit",
                    "caveragePerUnit",
                    "wages",
                    "brand",
                        "inputUnit",
                        "inputQuantity",
                        "outputUnit",
                        "outputQuantity",
                        "adjustFactor"
                  ],
                  through: {
                    attributes: ["labourFactorQuantity", "labourTotalAmount"],
                  },
                },
                {
                  model: UserSubContractors,
                  as: "subContractors",
                  attributes: ["id", "name", "unit", "quantity", "price"],
                  through: {
                    attributes: ["subContractorTotalAmount"],
                  },
                },
              ],
            });
            const { equipments, materials, labours, subContractors } =
              updateEstimation;

              const estimationRate = +returnNumber(updateEstimation.estimationRate);
              const estimationQuantity = +returnNumber(
                updateEstimation.estimationQuantity
              );
              const wastagePercentage = +returnNumber(
                updateEstimation.wastagePercentage
              );
              const transportPercentage = +returnNumber(
                updateEstimation.transportPercentage
              );
              const overHeadPercentage = +returnNumber(
                updateEstimation.overHeadPercentage
              );
              const profitPercentage = +returnNumber(updateEstimation.profitPercentage);
              const contigencyPercentage = +returnNumber(
                updateEstimation.contigencyPercentage
              );
    
            // ==============EQUIPMENT TOTAL PRICE====================
            const equipmentTotal = equipments.reduce((acc, curr) => {
              return acc + +curr.UserEstimationLibrary.equipmentTotalAmount;
            }, 0);
    
            // ==============MATERIAL TOTAL PRICE====================
            const materialSubtotal = materials.reduce((acc, curr) => {
              return acc + +curr.UserEstimationLibrary.materialTotalAmount;
            }, 0);
    
            // ============== SUB CONTRACTOR TOTAL PRICE
            const subcontractorTotal = subContractors.reduce((acc, curr) => {
              return acc + +curr.UserEstimationLibrary?.subContractorTotalAmount;
            }, 0);
    
            // Subcontractor
            const subcontractorCostPerWorkItem = subcontractorTotal;
    
            // ============== LABOUR TOTAL PRICE ============
    
            const labourTotal = labours.reduce((acc, curr) => {
              return acc + +curr.UserEstimationLibrary?.labourTotalAmount;
            }, 0);
    
            const labourCostperWorkItem = labourTotal;
            const labourRatePerUnit =
              labourCostperWorkItem / estimationQuantity;
    
            // =========Calculate Wastage and Transport=======
    
            const calculatedWastageTotal =
              materialSubtotal * wastagePercentage;
            const calculatedTransportTotal =
              materialSubtotal * transportPercentage;
    
            const materialCostPerWorkItem =
              materialSubtotal + calculatedWastageTotal + calculatedTransportTotal;
    
            const materialRatePerUnit =
              materialCostPerWorkItem / estimationQuantity;
    
            const equipmentCostPerWorkiItem = equipmentTotal;
            const equipmentRatePerUnit =
              equipmentCostPerWorkiItem / estimationQuantity;
            const subtotal =
              materialCostPerWorkItem +
              equipmentCostPerWorkiItem +
              subcontractorCostPerWorkItem +
              labourCostperWorkItem;
    
            // calculate Overhead, Contigency and Profit
            const calculatedOverHead =
              estimationRate *
              estimationQuantity *
              overHeadPercentage;
            const tempProfit =
              estimationRate * estimationQuantity +
              calculatedOverHead;
            const calculatedProfit = tempProfit * profitPercentage;
            const tempContigency =
              estimationRate * estimationQuantity +
              calculatedProfit;
            const calculatedContigency =
              tempContigency * contigencyPercentage;
    
            const indirectCostPerWorkItem =
              calculatedOverHead + calculatedContigency + calculatedProfit;
            const indirectRatePerUnit =
              indirectCostPerWorkItem / estimationQuantity;
    
            const totalAmount = subtotal + indirectCostPerWorkItem;
            const ratePerUnit =
              equipmentRatePerUnit +
              materialRatePerUnit +
              labourRatePerUnit +
              indirectRatePerUnit +
              subcontractorCostPerWorkItem;
    
            // update estimation
            await updateEstimation.update({
              wastageTotal: +calculatedWastageTotal.toFixed(2),
              transportTotal: +calculatedTransportTotal.toFixed(2),
              profitTotal: +calculatedProfit.toFixed(2),
              overheadTotal: +calculatedOverHead.toFixed(2),
              contigencyTotal: +calculatedContigency.toFixed(2),
              materialCostPerWorkItem: +materialCostPerWorkItem.toFixed(2),
              materialRatePerUnit: +materialRatePerUnit.toFixed(2),
              equipmentCostPerWorkItem: +equipmentCostPerWorkiItem.toFixed(2),
              equipmentRatePerUnit: +equipmentRatePerUnit.toFixed(2),
              indirectCostPerWorkItem: +indirectCostPerWorkItem.toFixed(2),
              indirectRatePerUnit: +indirectRatePerUnit.toFixed(2),
              estimationTotalAmount: +totalAmount.toFixed(2),
              estimationRate: +ratePerUnit.toFixed(2),
              subtotal: +subtotal.toFixed(2),
              labourCostperWorkItem: +labourCostperWorkItem.toFixed(2),
              labourRatePerUnit: +labourRatePerUnit.toFixed(2),
              subcontractorCostPerWorkItem:
                +subcontractorCostPerWorkItem.toFixed(2),
            });
    
            const updates = updateEstimation.reload();
    
            return updates;

  }

   const updateEstimation = await Estimations.findOne({
              where: { id: estimationId },
              include: [
                {
                  model: Materials,
                  as: "materials",
                  attributes: [
                    "id",
                    "name",
                    "quantity",
                    "unit",
                    "caveragePerUnit",
                    "price",
                    "brand",
                        "inputUnit",
                        "inputQuantity",
                        "outputUnit",
                        "outputQuantity",
                        "adjustFactor"
                  ],
                  through: {
                    attributes: ["materialFactorQuantity", "materialTotalAmount"],
                  },
                },
                {
                  model: Equipments,
                  as: "equipments",
                  attributes: [
                    "id",
                    "name",
                    "unit",
                    "caveragePerUnit",
                    "hireRatePrice",
                    "number",
                    "brand",
                        "inputUnit",
                        "inputQuantity",
                        "outputUnit",
                        "outputQuantity",
                        "adjustFactor"
                  ],
                  through: {
                    attributes: ["equipmentPerformance", "equipmentTotalAmount"],
                  },
                },
                {
                  model: Labours,
                  as: "labours",
                  attributes: [
                    "id",
                    "name",
                    "number",
                    "unit",
                    "caveragePerUnit",
                    "wages",
                    "brand",
                        "inputUnit",
                        "inputQuantity",
                        "outputUnit",
                        "outputQuantity",
                        "adjustFactor"
                  ],
                  through: {
                    attributes: ["labourFactorQuantity", "labourTotalAmount"],
                  },
                },
                {
                  model: SubContractors,
                  as: "subContractors",
                  attributes: ["id", "name", "unit", "quantity", "price"],
                  through: {
                    attributes: ["subContractorTotalAmount"],
                  },
                },
              ],
            });
            const { equipments, materials, labours, subContractors } =
              updateEstimation;

              const estimationRate = +returnNumber(updateEstimation.estimationRate);
              const estimationQuantity = +returnNumber(
                updateEstimation.estimationQuantity
              );
              const wastagePercentage = +returnNumber(
                updateEstimation.wastagePercentage
              );
              const transportPercentage = +returnNumber(
                updateEstimation.transportPercentage
              );
              const overHeadPercentage = +returnNumber(
                updateEstimation.overHeadPercentage
              );
              const profitPercentage = +returnNumber(updateEstimation.profitPercentage);
              const contigencyPercentage = +returnNumber(
                updateEstimation.contigencyPercentage
              );
    
            // ==============EQUIPMENT TOTAL PRICE====================
            const equipmentTotal = equipments.reduce((acc, curr) => {
              return acc + +curr.EstimationLibrary.equipmentTotalAmount;
            }, 0);
    
            // ==============MATERIAL TOTAL PRICE====================
            const materialSubtotal = materials.reduce((acc, curr) => {
              return acc + +curr.EstimationLibrary.materialTotalAmount;
            }, 0);
    
            // ============== SUB CONTRACTOR TOTAL PRICE
            const subcontractorTotal = subContractors.reduce((acc, curr) => {
              return acc + +curr.EstimationLibrary?.subContractorTotalAmount;
            }, 0);
    
            // Subcontractor
            const subcontractorCostPerWorkItem = subcontractorTotal;
    
            // ============== LABOUR TOTAL PRICE ============
    
            const labourTotal = labours.reduce((acc, curr) => {
              return acc + +curr.EstimationLibrary?.labourTotalAmount;
            }, 0);
    
            const labourCostperWorkItem = labourTotal;
            const labourRatePerUnit =
              labourCostperWorkItem / estimationQuantity;
    
            // =========Calculate Wastage and Transport=======
    
            const calculatedWastageTotal =
              materialSubtotal * wastagePercentage;
            const calculatedTransportTotal =
              materialSubtotal * transportPercentage;
    
            const materialCostPerWorkItem =
              materialSubtotal + calculatedWastageTotal + calculatedTransportTotal;
    
            const materialRatePerUnit =
              materialCostPerWorkItem / estimationQuantity;
    
            const equipmentCostPerWorkiItem = equipmentTotal;
            const equipmentRatePerUnit =
              equipmentCostPerWorkiItem / estimationQuantity;
            const subtotal =
              materialCostPerWorkItem +
              equipmentCostPerWorkiItem +
              subcontractorCostPerWorkItem +
              labourCostperWorkItem;
    
            // calculate Overhead, Contigency and Profit
            const calculatedOverHead =
              estimationRate *
              estimationQuantity *
              overHeadPercentage;
            const tempProfit =
              estimationRate * estimationQuantity +
              calculatedOverHead;
            const calculatedProfit = tempProfit * profitPercentage;
            const tempContigency =
              estimationRate * estimationQuantity +
              calculatedProfit;
            const calculatedContigency =
              tempContigency * contigencyPercentage;
    
            const indirectCostPerWorkItem =
              calculatedOverHead + calculatedContigency + calculatedProfit;
            const indirectRatePerUnit =
              indirectCostPerWorkItem / estimationQuantity;
    
            const totalAmount = subtotal + indirectCostPerWorkItem;
            const ratePerUnit =
              equipmentRatePerUnit +
              materialRatePerUnit +
              labourRatePerUnit +
              indirectRatePerUnit +
              subcontractorCostPerWorkItem;
    
            // update estimation
            await updateEstimation.update({
              wastageTotal: +calculatedWastageTotal.toFixed(2),
              transportTotal: +calculatedTransportTotal.toFixed(2),
              profitTotal: +calculatedProfit.toFixed(2),
              overheadTotal: +calculatedOverHead.toFixed(2),
              contigencyTotal: +calculatedContigency.toFixed(2),
              materialCostPerWorkItem: +materialCostPerWorkItem.toFixed(2),
              materialRatePerUnit: +materialRatePerUnit.toFixed(2),
              equipmentCostPerWorkItem: +equipmentCostPerWorkiItem.toFixed(2),
              equipmentRatePerUnit: +equipmentRatePerUnit.toFixed(2),
              indirectCostPerWorkItem: +indirectCostPerWorkItem.toFixed(2),
              indirectRatePerUnit: +indirectRatePerUnit.toFixed(2),
              estimationTotalAmount: +totalAmount.toFixed(2),
              estimationRate: +ratePerUnit.toFixed(2),
              subtotal: +subtotal.toFixed(2),
              labourCostperWorkItem: +labourCostperWorkItem.toFixed(2),
              labourRatePerUnit: +labourRatePerUnit.toFixed(2),
              subcontractorCostPerWorkItem:
                +subcontractorCostPerWorkItem.toFixed(2),
            });
    
            const updates = updateEstimation.reload();
    
            return updates;
  
}
