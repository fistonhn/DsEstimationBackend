"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateSimilarTemplateLabour = exports.calculateSimilarProjectLabour = void 0;
var _models = require("../database/models");
var _utils = require("../utils");
// calculate similar equipment of the project and template in the edit

const calculateSimilarProjectLabour = async projectId => {
  try {
    const allProjectEstimation = await (0, _utils.getAllUserProjectEstimation)(projectId);
    for (let updateEstimation of allProjectEstimation) {
      const {
        equipments,
        materials,
        labours,
        subContractors,
        id
      } = updateEstimation;
      let labourTotal = 0;
      const estimationRate = +(0, _utils.returnNumber)(updateEstimation.estimationRate);
      const estimationQuantity = +(0, _utils.returnNumber)(updateEstimation.estimationQuantity);
      const wastagePercentage = +(0, _utils.returnNumber)(updateEstimation.wastagePercentage);
      const transportPercentage = +(0, _utils.returnNumber)(updateEstimation.transportPercentage);
      const overHeadPercentage = +(0, _utils.returnNumber)(updateEstimation.overHeadPercentage);
      const profitPercentage = +(0, _utils.returnNumber)(updateEstimation.profitPercentage);
      const contigencyPercentage = +(0, _utils.returnNumber)(updateEstimation.contigencyPercentage);

      // ============Loop for equipment calculation===============
      for (let i = 0; i < labours.length; i++) {
        const labour = labours[i];
        const inputNumber = +labour?.number;
        const outputQuantity = +(0, _utils.returnNumber)(labour?.outputQuantity);
        const adjustFactor = +(0, _utils.returnNumber)(labour?.adjustFactor);
        const adjustResult = adjustFactor * +estimationQuantity;
        const inputResult = inputNumber / outputQuantity;
        const finalPerformance = +(inputResult * adjustResult).toFixed(2);

        // labour Performance
        const labourFactorQuantity = finalPerformance;
        // const labourFactorQuantity =
        //   +labour.caveragePerUnit * +estimationQuantity;

        const calculatedWages = +labour.wages * labourFactorQuantity;
        // const calculatedWages =
        //   labour?.number * +labour.wages * labourFactorQuantity;
        const labourTotalAmount = calculatedWages;

        // ==============Material TOTAL PRICE====================
        labourTotal += labourTotalAmount;
        // Update estimationLibrary
        const estimationLibary = await _models.UserEstimationLibrary.findOne({
          where: {
            estimationId: id,
            labourId: labour.id
          }
        });
        await estimationLibary.update({
          labourFactorQuantity,
          labourTotalAmount
        });
      }

      //  ========= LABOUR WASTAGE PRICE =======
      const labourCostperWorkItem = labourTotal;
      const labourRatePerUnit = labourCostperWorkItem / estimationQuantity;

      // ==============MATERIAL TOTAL PRICE====================
      const materialSubtotal = materials.reduce((acc, curr) => {
        const materialTotalAmount = +(0, _utils.returnNumber)(curr.UserEstimationLibrary?.materialTotalAmount);
        return acc + materialTotalAmount;
      }, 0);
      const calculatedWastageTotal = materialSubtotal * wastagePercentage;
      const calculatedTransportTotal = materialSubtotal * transportPercentage;
      const materialCostPerWorkItem = materialSubtotal + calculatedWastageTotal + calculatedTransportTotal;
      const materialRatePerUnit = materialCostPerWorkItem / estimationQuantity;

      // ==============EQUIPMENTA TOTAL PRICE====================
      const equipmentTotal = equipments.reduce((acc, curr) => {
        const equipmentTotalAmount = +(0, _utils.returnNumber)(curr.UserEstimationLibrary?.equipmentTotalAmount);
        return acc + equipmentTotalAmount;
      }, 0);
      const equipmentCostPerWorkiItem = equipmentTotal;
      const equipmentRatePerUnit = equipmentCostPerWorkiItem / estimationQuantity;

      // ============== SUB CONTRACTOR TOTAL PRICE
      const subcontractorTotal = subContractors.reduce((acc, curr) => {
        const subcontractorTotalAmount = +(0, _utils.returnNumber)(curr.UserEstimationLibrary?.subContractorTotalAmount);
        return acc + subcontractorTotalAmount;
      }, 0);

      // Subcontractor
      const subcontractorCostPerWorkItem = subcontractorTotal;
      const subtotal = materialCostPerWorkItem + equipmentCostPerWorkiItem + labourCostperWorkItem + subcontractorCostPerWorkItem;

      // calculate Overhead, Contigency and Profit
      const calculatedOverHead = estimationRate * estimationQuantity * overHeadPercentage;
      const tempProfit = estimationRate * estimationQuantity + calculatedOverHead;
      const calculatedProfit = tempProfit * profitPercentage;
      const tempContigency = estimationRate * estimationQuantity + calculatedProfit;
      const calculatedContigency = tempContigency * contigencyPercentage;
      const indirectCostPerWorkItem = calculatedOverHead + calculatedContigency + calculatedProfit;
      const indirectRatePerUnit = indirectCostPerWorkItem / estimationQuantity;
      const totalAmount = subtotal + indirectCostPerWorkItem;
      const ratePerUnit = equipmentRatePerUnit + materialRatePerUnit + labourRatePerUnit + indirectRatePerUnit + subcontractorCostPerWorkItem;

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
        subcontractorCostPerWorkItem: +subcontractorCostPerWorkItem.toFixed(2)
      });
    }
    return allProjectEstimation;
  } catch (error) {
    return "connection timeout, try again";
  }
};
exports.calculateSimilarProjectLabour = calculateSimilarProjectLabour;
const calculateSimilarTemplateLabour = async projectId => {
  try {
    const allTemplateEstimation = await (0, _utils.getAllTemplateEstimation)(projectId);
    for (let updateEstimation of allTemplateEstimation) {
      const {
        equipments,
        materials,
        labours,
        subContractors,
        id
      } = updateEstimation;
      let labourTotal = 0;
      const estimationRate = +(0, _utils.returnNumber)(updateEstimation.estimationRate);
      const estimationQuantity = +(0, _utils.returnNumber)(updateEstimation.estimationQuantity);
      const wastagePercentage = +(0, _utils.returnNumber)(updateEstimation.wastagePercentage);
      const transportPercentage = +(0, _utils.returnNumber)(updateEstimation.transportPercentage);
      const overHeadPercentage = +(0, _utils.returnNumber)(updateEstimation.overHeadPercentage);
      const profitPercentage = +(0, _utils.returnNumber)(updateEstimation.profitPercentage);
      const contigencyPercentage = +(0, _utils.returnNumber)(updateEstimation.contigencyPercentage);

      // ============Loop for equipment calculation===============
      for (let i = 0; i < labours.length; i++) {
        const labour = labours[i];
        // labour Performance
        const inputNumber = +labour?.number;
        const outputQuantity = +(0, _utils.returnNumber)(labour?.outputQuantity);
        const adjustFactor = +(0, _utils.returnNumber)(labour?.adjustFactor);
        const adjustResult = adjustFactor * +estimationQuantity;
        const inputResult = inputNumber / outputQuantity;
        const finalPerformance = +(inputResult * adjustResult).toFixed(2);

        // labour Performance
        const labourFactorQuantity = finalPerformance;
        // const labourFactorQuantity =
        //   +labour.caveragePerUnit * +estimationQuantity;

        const calculatedWages = +labour.wages * labourFactorQuantity;
        // const calculatedWages =
        //   labour?.number * +labour.wages * labourFactorQuantity;
        const labourTotalAmount = calculatedWages;

        // ==============Material TOTAL PRICE====================
        labourTotal += labourTotalAmount;
        // Update estimationLibrary
        const estimationLibary = await _models.EstimationLibrary.findOne({
          where: {
            estimationId: id,
            labourId: labour.id
          }
        });
        await estimationLibary.update({
          labourFactorQuantity,
          labourTotalAmount
        });
      }

      // =========Calculate Wastage and Transport=======

      //  ========= LABOUR WASTAGE PRICE =======
      const labourCostperWorkItem = labourTotal;
      const labourRatePerUnit = labourCostperWorkItem / estimationQuantity;

      // ==============MATERIAL TOTAL PRICE====================
      const materialSubtotal = materials.reduce((acc, curr) => {
        const materialTotalAmount = +(0, _utils.returnNumber)(curr.EstimationLibrary?.materialTotalAmount);
        return acc + materialTotalAmount;
      }, 0);
      const calculatedWastageTotal = materialSubtotal * wastagePercentage;
      const calculatedTransportTotal = materialSubtotal * transportPercentage;
      const materialCostPerWorkItem = materialSubtotal + calculatedWastageTotal + calculatedTransportTotal;
      const materialRatePerUnit = materialCostPerWorkItem / estimationQuantity;

      // ==============EQUIPMENTA TOTAL PRICE====================
      const equipmentTotal = equipments.reduce((acc, curr) => {
        const equipmentTotalAmount = +(0, _utils.returnNumber)(curr.EstimationLibrary?.equipmentTotalAmount);
        return acc + equipmentTotalAmount;
      }, 0);
      const equipmentCostPerWorkiItem = equipmentTotal;
      const equipmentRatePerUnit = equipmentCostPerWorkiItem / estimationQuantity;

      // ============== SUB CONTRACTOR TOTAL PRICE
      const subcontractorTotal = subContractors.reduce((acc, curr) => {
        const subContractorTotalAmount = +(0, _utils.returnNumber)(curr.EstimationLibrary?.subContractorTotalAmount);
        return acc + subContractorTotalAmount;
      }, 0);

      // Subcontractor
      const subcontractorCostPerWorkItem = subcontractorTotal;
      const subtotal = materialCostPerWorkItem + equipmentCostPerWorkiItem + labourCostperWorkItem + subcontractorCostPerWorkItem;

      // calculate Overhead, Contigency and Profit
      const calculatedOverHead = estimationRate * estimationQuantity * overHeadPercentage;
      const tempProfit = estimationRate * estimationQuantity + calculatedOverHead;
      const calculatedProfit = tempProfit * profitPercentage;
      const tempContigency = estimationRate * estimationQuantity + calculatedProfit;
      const calculatedContigency = tempContigency * contigencyPercentage;
      const indirectCostPerWorkItem = calculatedOverHead + calculatedContigency + calculatedProfit;
      const indirectRatePerUnit = indirectCostPerWorkItem / estimationQuantity;
      const totalAmount = subtotal + indirectCostPerWorkItem;
      const ratePerUnit = equipmentRatePerUnit + materialRatePerUnit + labourRatePerUnit + indirectRatePerUnit + subcontractorCostPerWorkItem;

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
        subcontractorCostPerWorkItem: +subcontractorCostPerWorkItem.toFixed(2)
      });
    }
    return allTemplateEstimation;
  } catch (error) {
    return "connection timeout, try again";
  }
};
exports.calculateSimilarTemplateLabour = calculateSimilarTemplateLabour;