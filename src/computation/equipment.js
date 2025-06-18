import { UserEstimationLibrary, EstimationLibrary } from "../database/models";
import {
  getAllUserProjectEstimation,
  getAllTemplateEstimation,
  returnNumber,
} from "../utils";

// calculate similar equipment of the project and template in the edit

export const calculateSimilarProjectEquipment = async (projectId) => {
  try {
    const allProjectEstimation = await getAllUserProjectEstimation(projectId);

    for (let updateEstimation of allProjectEstimation) {
      const { equipments, materials, labours, subContractors, id } =
        updateEstimation;

      let equipmentTotal = 0;

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
      const overheadPercentage = +returnNumber(
        updateEstimation.overHeadPercentage
      );
      const profitPercentage = +returnNumber(updateEstimation.profitPercentage);
      const contigencyPercentage = +returnNumber(
        updateEstimation.contigencyPercentage
      );

      // ============Loop for equipment calculation===============
      for (let i = 0; i < equipments.length; i++) {
        const equipment = equipments[i];

        const inputNumber = +equipment?.number;
        const outputQuantity = +returnNumber(equipment?.outputQuantity);
        const adjustFactor = +returnNumber(equipment?.adjustFactor);
        const adjustResult = adjustFactor * +estimationQuantity;
        const inputResult = inputNumber / outputQuantity;

        const finalPerformance = (inputResult * adjustResult).toFixed(2);

        // equipment Performance
        const equipmentPerformance = +finalPerformance;
        // const equipmentPerformance =
        //   +equipment.caveragePerUnit * +updateEstimation.estimationQuantity;

        const calculatedPrice =
          +equipment?.number * +equipment.hireRatePrice * equipmentPerformance;
        const equipmentTotalAmount = calculatedPrice;

        // ==============EQUIPMENT TOTAL PRICE====================
        equipmentTotal += equipmentTotalAmount;
        // Update estimationLibrary
        const estimationLibary = await UserEstimationLibrary.findOne({
          where: {
            estimationId: id,
            equipmentId: equipment.id,
          },
        });
        await estimationLibary.update({
          equipmentPerformance: equipmentPerformance,
          equipmentTotalAmount: equipmentTotalAmount,
        });
      }

      // ==============MATERIAL TOTAL PRICE====================
      const materialSubtotal = materials.reduce((acc, curr) => {
        const materialTotalAmount = +returnNumber(
          curr.UserEstimationLibrary?.materialTotalAmount
        );
        return acc + materialTotalAmount;
      }, 0);

      //  ========= LABOUR WASTAGE PRICE =======

      const labourTotal = labours.reduce((acc, curr) => {
        const labourTotalAmount = +returnNumber(
          curr.UserEstimationLibrary?.labourTotalAmount
        );
        return acc + labourTotalAmount;
      }, 0);

      const labourCostperWorkItem = labourTotal;
      const labourRatePerUnit = labourCostperWorkItem / estimationQuantity;

      // ============== SUB CONTRACTOR TOTAL PRICE
      const subcontractorTotal = subContractors.reduce((acc, curr) => {
        const subcontractorTotalAmount = +returnNumber(
          curr.UserEstimationLibrary?.subContractorTotalAmount
        );

        return acc + subcontractorTotalAmount;
      }, 0);

      // Subcontractor
      const subcontractorCostPerWorkItem = subcontractorTotal;

      // =========Calculate Wastage and Transport=======

      const calculatedWastageTotal = materialSubtotal * wastagePercentage;
      const calculatedTransportTotal = materialSubtotal * transportPercentage;

      const materialCostPerWorkItem =
        materialSubtotal + calculatedWastageTotal + calculatedTransportTotal;

      const materialRatePerUnit = materialCostPerWorkItem / estimationQuantity;

      const equipmentCostPerWorkiItem = equipmentTotal;
      const equipmentRatePerUnit =
        equipmentCostPerWorkiItem / estimationQuantity;
      const subtotal =
        materialCostPerWorkItem +
        equipmentCostPerWorkiItem +
        labourCostperWorkItem +
        subcontractorCostPerWorkItem;

      // calculate Overhead, Contigency and Profit

      const calculatedOverHead =
        estimationRate * estimationQuantity * overheadPercentage;
      const tempProfit =
        estimationRate * estimationQuantity + calculatedOverHead;
      const calculatedProfit = tempProfit * profitPercentage;

      // console.log('calculatedProfit: ', calculatedProfit)

      const tempContigency =
        estimationRate * estimationQuantity + calculatedProfit;
      const calculatedContigency = tempContigency * contigencyPercentage;

      const indirectCostPerWorkItem =
        calculatedOverHead + +calculatedContigency + +calculatedProfit;

      const indirectRatePerUnit = indirectCostPerWorkItem / estimationQuantity;

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
        subcontractorCostPerWorkItem: +subcontractorCostPerWorkItem.toFixed(2),
      });
    }

    return allProjectEstimation;
  } catch (error) {
    return "connection timeout, try again";
  }
};

export const calculateSimilarTemplateEquipment = async (projectId) => {
  try {
    const allTemplateEstimation = await getAllTemplateEstimation(projectId);

    for (let updateEstimation of allTemplateEstimation) {
      const { equipments, materials, labours, subContractors, id } =
        updateEstimation;

      let equipmentTotal = 0;

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

      // ============Loop for equipment calculation===============
      for (let i = 0; i < equipments.length; i++) {
        const equipment = equipments[i];

        const inputQuantity = +returnNumber(equipment?.number);
        const outputQuantity = +returnNumber(equipment?.outputQuantity);
        const adjustFactor = +returnNumber(equipment?.adjustFactor);
        const adjustResult = adjustFactor * +estimationQuantity;
        const inputResult = inputQuantity / outputQuantity;

        const finalPerformance = (+inputResult * adjustResult).toFixed(2);
        // equipment Performance
        const equipmentPerformance = +finalPerformance;

        // equipment Performance
        // const equipmentPerformance =
        //   +equipment.caveragePerUnit * +updateEstimation.estimationQuantity;

        const calculatedPrice =
          +equipment?.number * +equipment.hireRatePrice * equipmentPerformance;
        const equipmentTotalAmount = calculatedPrice;

        // ==============EQUIPMENT TOTAL PRICE====================
        equipmentTotal += equipmentTotalAmount;
        // Update estimationLibrary
        const estimationLibary = await EstimationLibrary.findOne({
          where: {
            estimationId: id,
            equipmentId: equipment.id,
          },
        });
        await estimationLibary.update({
          equipmentPerformance: equipmentPerformance,
          equipmentTotalAmount: equipmentTotalAmount,
        });
      }

      // ==============MATERIAL TOTAL PRICE====================
      const materialSubtotal = materials.reduce((acc, curr) => {
        const materialTotalAmount = +returnNumber(
          curr.EstimationLibrary?.materialTotalAmount
        );
        return acc + materialTotalAmount;
      }, 0);

      //  ========= LABOUR WASTAGE PRICE =======

      const labourTotal = labours.reduce((acc, curr) => {
        const labourTotalAmount = +returnNumber(
          curr.EstimationLibrary?.labourTotalAmount
        );
        return acc + labourTotalAmount;
      }, 0);

      const labourCostperWorkItem = labourTotal;
      const labourRatePerUnit =
        labourCostperWorkItem / +updateEstimation.estimationQuantity;

      // ============== SUB CONTRACTOR TOTAL PRICE
      const subcontractorTotal = subContractors.reduce((acc, curr) => {
        const subcontractorTotalAmount = +returnNumber(
          curr.EstimationLibrary?.subContractorTotalAmount
        );
        return acc + subcontractorTotalAmount;
      }, 0);

      // Subcontractor
      const subcontractorCostPerWorkItem = subcontractorTotal;

      // =========Calculate Wastage and Transport=======

      const calculatedWastageTotal = materialSubtotal * wastagePercentage;
      const calculatedTransportTotal = materialSubtotal * transportPercentage;

      const materialCostPerWorkItem =
        materialSubtotal + calculatedWastageTotal + calculatedTransportTotal;

      const materialRatePerUnit = materialCostPerWorkItem / estimationQuantity;

      const equipmentCostPerWorkiItem = equipmentTotal;
      const equipmentRatePerUnit =
        equipmentCostPerWorkiItem / estimationQuantity;
      const subtotal =
        materialCostPerWorkItem +
        equipmentCostPerWorkiItem +
        labourCostperWorkItem +
        subcontractorCostPerWorkItem;

      // calculate Overhead, Contigency and Profit
      const calculatedOverHead =
        estimationRate * estimationQuantity * overHeadPercentage;

      const tempProfit =
        estimationRate * estimationQuantity + calculatedOverHead;

      const calculatedProfit = tempProfit * profitPercentage;
      const tempContigency =
        estimationRate * estimationQuantity + calculatedProfit;
      const calculatedContigency = tempContigency * contigencyPercentage;

      const indirectCostPerWorkItem =
        calculatedOverHead + calculatedContigency + calculatedProfit;
      const indirectRatePerUnit = indirectCostPerWorkItem / estimationQuantity;

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
        subcontractorCostPerWorkItem: +subcontractorCostPerWorkItem.toFixed(2),
      });
    }

    return allTemplateEstimation;
  } catch (error) {
    return "connection timeout, try again";
  }
};

