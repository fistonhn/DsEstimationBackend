"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("babel-polyfill");
var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _cors = _interopRequireDefault(require("cors"));
var _expressFileupload = _interopRequireDefault(require("express-fileupload"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _swagger = _interopRequireDefault(require("../swagger.json"));
var _route = require("./route");
var _response = require("./utils/response");
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const app = (0, _express.default)();

// middleware
app.use(_express.default.json());
app.use((0, _cors.default)());
_dotenv.default.config();
app.use((0, _expressFileupload.default)({
  useTempFiles: true,
  tempFileDir: "/tmp/"
}));

// documentation
const options = {
  customCss: ".swagger-container .swagger-ui { max-width: 1100px; margin: auto; } .swagger-ui .topbar { display: none } .swagger-ui { background: #00000e6; }",
  customSiteTitle: "DS Estimation API",
  customfavIcon: "./assets/favicon.ico"
};
app.use("/", _swaggerUiExpress.default.serve);
app.get("/", _swaggerUiExpress.default.setup(_swagger.default, options));

// routes

// admin routes
app.use("/api/owner/unit", _route.unitRoutes);
app.use("/api/owner/material", _route.materialRoutes);
app.use("/api/owner/estimation", _route.estimationRoutes);
app.use("/api/owner/equipment", _route.equipmentsRoutes);
app.use("/api/owner/labour", _route.labourRoutes);
app.use("/api/owner/subcontractor", _route.subcontractorsRoutes);
app.use("/api/owner/estimationCategory", _route.estimationCategoryRoutes);
app.use("/api/owner/ourSupplier", _route.ourSupplierRoutes);

// user routes
app.use("/api/user", _route.userRoutes);
app.use("/api/user/estimation", _route.userEstimationRoutes);
app.use("/api/user/unit", _route.userUnitRoutes);
app.use("/api/user/material", _route.userMaterialRoutes);
app.use("/api/user/equipment", _route.userEquipmentRoutes);
app.use("/api/user/labour", _route.userLabourRoutes);
app.use("/api/user/subcontractor", _route.userSubcontractorRoutes);
app.use("/api/user/project", _route.userProjectRoutes);
app.use("/api/user/supplier", _route.userSupplierRoutes);
app.use("/api/user/estimationCategory", _route.userEstimationCategoryRoutes);
app.use("/api/user/project/group", _route.projectGroupRoutes);
app.use("/api/user/role", _route.rolesRoutes);
app.use("/api/user/resource/project", _route.projectMasterDataRoutes);

// consumption routes
app.use("/api/consumption/report/equipment", _route.equipmentConsumptionRoutes);
app.use("/api/consumption/report/material", _route.materialConsumptionRoutes);
app.use("/api/consumption/report/labour", _route.labourConsumptionRoutes);
app.use("/api/consumption/report/subcontractor", _route.subcontractorConsumptionRoutes);
app.use("/api/consumption/report/estimation", _route.estimationConsumptionRoutes);

// global routes
app.use("/api/global", _route.globalRoutes);

// payment routes
app.use("/api/payment", _route.paymentRoutes);

// download error
app.get("/api/error/download", (req, res) => {
  try {
    return res.download("error.txt", err => {
      //  delete file after 10 seconds
      return setTimeout(() => {
        _fs.default.unlinkSync("error.txt");
      }, 10000);
    });
  } catch (error) {
    return (0, _response.onError)(res, 500, "something went wrong. try again");
  }
});
// 404 error routes
app.get("*", (req, res) => {
  return (0, _response.onError)(res, 404, "Page not found");
});
app.post("*", (req, res) => {
  return (0, _response.onError)(res, 404, "Page not found");
});
app.delete("*", (req, res) => {
  return (0, _response.onError)(res, 404, "Page not found");
});
app.patch("*", (req, res) => {
  return (0, _response.onError)(res, 404, "Page not found");
});
app.put("*", (req, res) => {
  return (0, _response.onError)(res, 404, "Page not found");
});
var _default = exports.default = app;