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
//routes
router.get("/all", _controllers.UserController.getAllUsers);
router.get("/profile", _middlewares.verifyAccessToken, _controllers.UserController.getProfile);
router.get("/:id", _middlewares.verifyAccessToken, _middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isUserExists, _controllers.UserController.getUserById);
router.post("/register", _middlewares.Validators.isUserRegisterValid,
// UserController.registerUser
_controllers.UserController.createNewUser);
router.get("/verify/signup", _controllers.UserController.createUser);
router.get("/staff/accept/verify", _controllers.UserController.createStaff);
router.post("/login", _middlewares.Validators.isLoginInputValid, _controllers.UserController.loginUser);
router.delete("/logout", _middlewares.verifyAccessToken, _controllers.UserController.logoutUser);
router.delete("/account/delete", _middlewares.verifyAccessToken, _controllers.UserController.deleteMyAccount);
router.delete("/:id/delete", _middlewares.verifyAccessToken, _middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isUserExists, _controllers.UserController.deleteUser);
router.patch("/:id/role", _middlewares.verifyAccessToken, _middlewares.ValidateParams.isIdPresentAndValid, _middlewares.Exists.isUserExists, _controllers.UserController.changeRole);
router.patch("/account/:id/activate", _middlewares.verifyAccessToken, _controllers.UserController.disableOrEnableUser);
router.patch("/account/:id/update", _middlewares.verifyAccessToken, _middlewares.ValidateParams.isIdPresentAndValid, _controllers.UserController.updateUser);
router.patch("/session/:id/renew-token", _middlewares.Exists.isUserExists, _controllers.UserController.refreshToken);
router.post("/forgot-password", _middlewares.Validators.validateForgotPasswordEmail, _controllers.UserController.forgotPassword);

// staff
router.post("/register/staff", _middlewares.verifyAccessToken, _middlewares.Validators.isUserRegisterValid, _controllers.UserController.registerStaff);
router.get("/reset-password/url", _controllers.UserController.getResetPasswordLink);
router.patch("/reset-password/:token/:email", _controllers.UserController.resetPassword); // backend reset password
var _default = exports.default = router;