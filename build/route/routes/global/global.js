"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _controllers = require("../../../controllers");
var _middlewares = require("../../../middlewares");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
// routes

// equipment

router.get("/equipment/all", _middlewares.verifyAccessToken, _controllers.EquipmentController.getAllEquipments);
router.get("/equipment/:id", _middlewares.verifyAccessToken, _middlewares.ValidateParams.isIdPresentAndValid, _controllers.EquipmentController.getEquipmentById);

// Estimation
router.get("/estimation/all", _middlewares.verifyAccessToken, _controllers.EstimationController.getAllEstimations);
router.get("/estimation/:id", _middlewares.verifyAccessToken, _middlewares.ValidateParams.isIdPresentAndValid, _controllers.EstimationController.getEstimationById);

// labours

router.get("/labour/all", _middlewares.verifyAccessToken, _controllers.LabourController.getAllLabour);
router.get("/labour/:id", _middlewares.verifyAccessToken, _middlewares.ValidateParams.isIdPresentAndValid, _controllers.LabourController.getLabourById);

// materials

router.get("/material/all", _middlewares.verifyAccessToken, _middlewares.Exists.isDataExistsInMaterial, _controllers.MaterialsController.getAllMaterials);
router.get("/material/:id", _middlewares.verifyAccessToken, _middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isMaterialExists, _controllers.MaterialsController.getMaterialById);

// subcontractor

router.get("/subcontractor/all", _middlewares.verifyAccessToken, _controllers.SubContractorsController.getAllSubContractors);
router.get("/subcontractor/:id", _middlewares.verifyAccessToken, _middlewares.ValidateParams.isIdPresentAndValid, _controllers.SubContractorsController.getSubContractorById);
router.get("/unit/all", _middlewares.verifyAccessToken, _middlewares.Exists.isDataExistsInUnits, _controllers.UnitsController.getAllUnits);
router.get("/unit/:id", _middlewares.verifyAccessToken, _middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isUnitExists, _controllers.UnitsController.getUnitById);

// category
router.get("/estimationCategory/all", _middlewares.verifyAccessToken, _controllers.EstimationCategoryController.getAll);
router.get("/estimationCategory/:id", _middlewares.verifyAccessToken, _middlewares.ValidateParams.isIdPresentAndValid, _controllers.EstimationCategoryController.getById);

// supplier
// routes
router.get("/supplier/all", _middlewares.verifyAccessToken, _controllers.OurSuppliersController.getAllSuppliers);
router.get("/supplier/:id", _middlewares.verifyAccessToken, _middlewares.ValidateParams.isIdPresentAndValid, _controllers.OurSuppliersController.getSupplierById);
var _default = exports.default = router;