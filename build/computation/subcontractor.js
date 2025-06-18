"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateSimilarTemplateSubcontractor = exports.calculateSimilarProjectSubcontractor = void 0;
var _models = require("../database/models");
var _utils = require("../utils");
// calculate similar equipment of the project and template in the edit

const calculateSimilarProjectSubcontractor = async projectId => {
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
      let subc_Total = 0;
      const estimationRate = +(0, _utils.returnNumber)(updateEstimation.estimationRate);
      const estimationQuantity = +(0, _utils.returnNumber)(updateEstimation.estimationQuantity);
      const wastagePercentage = +(0, _utils.returnNumber)(updateEstimation.wastagePercentage);
      const transportPercentage = +(0, _utils.returnNumber)(updateEstimation.transportPercentage);
      const overHeadPercentage = +(0, _utils.returnNumber)(updateEstimation.overHeadPercentage);
      const profitPercentage = +(0, _utils.returnNumber)(updateEstimation.profitPercentage);
      const contigencyPercentage = +(0, _utils.returnNumber)(updateEstimation.contigencyPercentage);

      // ============Loop for equipment calculation===============
      for (let i = 0; i < subContractors.length; i++) {
        const subco = subContractors[i];
        const subContractorTotalAmount = +subco.quantity * +subco.price;

        // ==============Material TOTAL PRICE====================
        subc_Total += subContractorTotalAmount;
        // Update estimationLibrary
        const estimationLibary = await _models.UserEstimationLibrary.findOne({
          where: {
            estimationId: id,
            subContractorId: subco.id
          }
        });
        await estimationLibary.update({
          subContractorTotalAmount
        });
      }

      // ========= SUB CONTRACTORS =======
      // Subcontractor
      const subcontractorCostPerWorkItem = subc_Total;

      //  ========= LABOUR WASTAGE PRICE =======

      const labourTotal = labours.reduce((acc, curr) => {
        const labourTotalAmount = +(0, _utils.returnNumber)(curr.UserEstimationLibrary?.labourTotalAmount);
        return acc + labourTotalAmount;
      }, 0);
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
exports.calculateSimilarProjectSubcontractor = calculateSimilarProjectSubcontractor;
const calculateSimilarTemplateSubcontractor = async projectId => {
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
      let subc_Total = 0;
      const estimationRate = +(0, _utils.returnNumber)(updateEstimation.estimationRate);
      const estimationQuantity = +(0, _utils.returnNumber)(updateEstimation.estimationQuantity);
      const wastagePercentage = +(0, _utils.returnNumber)(updateEstimation.wastagePercentage);
      const transportPercentage = +(0, _utils.returnNumber)(updateEstimation.transportPercentage);
      const overHeadPercentage = +(0, _utils.returnNumber)(updateEstimation.overHeadPercentage);
      const profitPercentage = +(0, _utils.returnNumber)(updateEstimation.profitPercentage);
      const contigencyPercentage = +(0, _utils.returnNumber)(updateEstimation.contigencyPercentage);

      // ============Loop for equipment calculation===============
      for (let i = 0; i < subContractors.length; i++) {
        const subco = subContractors[i];
        const subContractorTotalAmount = +subco.quantity * +subco.price;

        // ==============Material TOTAL PRICE====================
        subc_Total += subContractorTotalAmount;
        // Update estimationLibrary
        const estimationLibary = await _models.EstimationLibrary.findOne({
          where: {
            estimationId: id,
            subContractorId: subco.id
          }
        });
        await estimationLibary.update({
          subContractorTotalAmount
        });
      }

      // ========= SUB CONTRACTORS =======
      // Subcontractor
      const subcontractorCostPerWorkItem = subc_Total;

      //  ========= LABOUR WASTAGE PRICE =======

      const labourTotal = labours.reduce((acc, curr) => {
        const labourTotalAmount = +(0, _utils.returnNumber)(curr.EstimationLibrary?.labourTotalAmount);
        return acc + labourTotalAmount;
      }, 0);
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
exports.calculateSimilarTemplateSubcontractor = calculateSimilarTemplateSubcontractor;