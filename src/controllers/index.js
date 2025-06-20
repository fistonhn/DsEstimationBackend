// admin controller

import MaterialsController from "./admin/materials";
import UnitsController from "./admin/units";
import EstimationController from "./admin/estimation";
import EquipmentController from "./admin/equipment";
import LabourController from "./admin/labours";
import SubContractorsController from "./admin/subcontractors";
import EstimationCategoryController from "./admin/estimationCategory";
import OurSuppliersController from "./admin/ourSupplier";

// user controller
import UserController from "./user/user";
import UserProjectController from "./user/user_projects";
import UserEstimationController from "./user/user_estimation";
import UserEquipmentController from "./user/user_equipment";
import UserLabourController from "./user/user_labours";
import UserMaterialController from "./user/user_materials";
import UserSubContractorsController from "./user/user_subcontractors";
import UserUnitsController from "./user/user_units";
import UserSuppliersController from "./user/user_suppliers";
import UserEstimationCategoryController from "./user/user_estimation_category";

// consumption controller
import EquipmentConsumptionController from "./user/consumption/equipment_consumption";
import MaterialConsumptionController from "./user/consumption/material_consumption";
import LabourConsumptionController from "./user/consumption/labour_consumption";
import SubContractorsConsumptionController from "./user/consumption/subcontractor_consumption";
import EstimationConsumptionController from "./user/consumption/estimation_consumption";

// payment
import PaymentController from "./payment";

// project group
import ProjectGroupController from "./user/project_group";
import SubcategoryController from "./user/subcategory";
import ProjectAddonsController from "./user/project_addons";
import RolesController from "./user/roles";

// project master data
import EquipmentResourceController from "./user/resources/equipment";
import MaterialResourceController from "./user/resources/material";
import LabourResourceController from "./user/resources/labour";
import SubContractorsResourceController from "./user/resources/subcontractor";

export {
  MaterialsController,
  UnitsController,
  EstimationController,
  EquipmentController,
  LabourController,
  UserController,
  SubContractorsController,
  EstimationCategoryController,
  OurSuppliersController,
  // user controller
  UserProjectController,
  UserEstimationController,
  UserEquipmentController,
  UserLabourController,
  UserMaterialController,
  UserSubContractorsController,
  UserUnitsController,
  UserSuppliersController,
  UserEstimationCategoryController,
  // consumption controller
  EquipmentConsumptionController,
  MaterialConsumptionController,
  LabourConsumptionController,
  SubContractorsConsumptionController,
  EstimationConsumptionController,

  // //payment
  PaymentController,
  // project group
  ProjectGroupController,
  SubcategoryController,

  // project addons
  ProjectAddonsController,

  //roles
  RolesController,

  // project resources
  EquipmentResourceController,
  MaterialResourceController,
  LabourResourceController,
  SubContractorsResourceController,
};
