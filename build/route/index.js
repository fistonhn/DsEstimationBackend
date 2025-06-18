"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "equipmentConsumptionRoutes", {
  enumerable: true,
  get: function () {
    return _equipment_consumption.default;
  }
});
Object.defineProperty(exports, "equipmentsRoutes", {
  enumerable: true,
  get: function () {
    return _equipments.default;
  }
});
Object.defineProperty(exports, "estimationCategoryRoutes", {
  enumerable: true,
  get: function () {
    return _estimationCategory.default;
  }
});
Object.defineProperty(exports, "estimationConsumptionRoutes", {
  enumerable: true,
  get: function () {
    return _estimation_consumption.default;
  }
});
Object.defineProperty(exports, "estimationRoutes", {
  enumerable: true,
  get: function () {
    return _estimations.default;
  }
});
Object.defineProperty(exports, "globalRoutes", {
  enumerable: true,
  get: function () {
    return _global.default;
  }
});
Object.defineProperty(exports, "labourConsumptionRoutes", {
  enumerable: true,
  get: function () {
    return _labour_consumption.default;
  }
});
Object.defineProperty(exports, "labourRoutes", {
  enumerable: true,
  get: function () {
    return _labours.default;
  }
});
Object.defineProperty(exports, "materialConsumptionRoutes", {
  enumerable: true,
  get: function () {
    return _material_consumption.default;
  }
});
Object.defineProperty(exports, "materialRoutes", {
  enumerable: true,
  get: function () {
    return _materials.default;
  }
});
Object.defineProperty(exports, "ourSupplierRoutes", {
  enumerable: true,
  get: function () {
    return _ourSupplier.default;
  }
});
Object.defineProperty(exports, "paymentRoutes", {
  enumerable: true,
  get: function () {
    return _payment.default;
  }
});
Object.defineProperty(exports, "projectGroupRoutes", {
  enumerable: true,
  get: function () {
    return _project_group.default;
  }
});
Object.defineProperty(exports, "projectMasterDataRoutes", {
  enumerable: true,
  get: function () {
    return _project_resource.default;
  }
});
Object.defineProperty(exports, "rolesRoutes", {
  enumerable: true,
  get: function () {
    return _roles.default;
  }
});
Object.defineProperty(exports, "subcontractorConsumptionRoutes", {
  enumerable: true,
  get: function () {
    return _subcontractor_consumption.default;
  }
});
Object.defineProperty(exports, "subcontractorsRoutes", {
  enumerable: true,
  get: function () {
    return _subcontractors.default;
  }
});
Object.defineProperty(exports, "unitRoutes", {
  enumerable: true,
  get: function () {
    return _units.default;
  }
});
Object.defineProperty(exports, "userEquipmentRoutes", {
  enumerable: true,
  get: function () {
    return _user_equipments.default;
  }
});
Object.defineProperty(exports, "userEstimationCategoryRoutes", {
  enumerable: true,
  get: function () {
    return _user_estimation_category.default;
  }
});
Object.defineProperty(exports, "userEstimationRoutes", {
  enumerable: true,
  get: function () {
    return _user_estimations.default;
  }
});
Object.defineProperty(exports, "userLabourRoutes", {
  enumerable: true,
  get: function () {
    return _user_labours.default;
  }
});
Object.defineProperty(exports, "userMaterialRoutes", {
  enumerable: true,
  get: function () {
    return _user_materials.default;
  }
});
Object.defineProperty(exports, "userProjectRoutes", {
  enumerable: true,
  get: function () {
    return _user_projects.default;
  }
});
Object.defineProperty(exports, "userRoutes", {
  enumerable: true,
  get: function () {
    return _users.default;
  }
});
Object.defineProperty(exports, "userSubcontractorRoutes", {
  enumerable: true,
  get: function () {
    return _user_subcontractors.default;
  }
});
Object.defineProperty(exports, "userSupplierRoutes", {
  enumerable: true,
  get: function () {
    return _user_suppliers.default;
  }
});
Object.defineProperty(exports, "userUnitRoutes", {
  enumerable: true,
  get: function () {
    return _user_units.default;
  }
});
var _materials = _interopRequireDefault(require("./routes/admin/materials"));
var _units = _interopRequireDefault(require("./routes/admin/units"));
var _estimations = _interopRequireDefault(require("./routes/admin/estimations"));
var _equipments = _interopRequireDefault(require("./routes/admin/equipments"));
var _labours = _interopRequireDefault(require("./routes/admin/labours"));
var _subcontractors = _interopRequireDefault(require("./routes/admin/subcontractors"));
var _estimationCategory = _interopRequireDefault(require("./routes/admin/estimationCategory"));
var _ourSupplier = _interopRequireDefault(require("./routes/admin/ourSupplier"));
var _users = _interopRequireDefault(require("./routes/user/users"));
var _user_projects = _interopRequireDefault(require("./routes/user/user_projects"));
var _user_estimations = _interopRequireDefault(require("./routes/user/user_estimations"));
var _user_equipments = _interopRequireDefault(require("./routes/user/user_equipments"));
var _user_labours = _interopRequireDefault(require("./routes/user/user_labours"));
var _user_subcontractors = _interopRequireDefault(require("./routes/user/user_subcontractors"));
var _user_materials = _interopRequireDefault(require("./routes/user/user_materials"));
var _user_units = _interopRequireDefault(require("./routes/user/user_units"));
var _user_suppliers = _interopRequireDefault(require("./routes/user/user_suppliers"));
var _user_estimation_category = _interopRequireDefault(require("./routes/user/user_estimation_category"));
var _equipment_consumption = _interopRequireDefault(require("./routes/user/consumption/equipment_consumption"));
var _material_consumption = _interopRequireDefault(require("./routes/user/consumption/material_consumption"));
var _labour_consumption = _interopRequireDefault(require("./routes/user/consumption/labour_consumption"));
var _subcontractor_consumption = _interopRequireDefault(require("./routes/user/consumption/subcontractor_consumption"));
var _estimation_consumption = _interopRequireDefault(require("./routes/user/consumption/estimation_consumption"));
var _global = _interopRequireDefault(require("./routes/global/global"));
var _payment = _interopRequireDefault(require("./routes/payment/payment"));
var _project_group = _interopRequireDefault(require("./routes/user/project_group"));
var _roles = _interopRequireDefault(require("./routes/user/roles"));
var _project_resource = _interopRequireDefault(require("./routes/user/project_resource"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }