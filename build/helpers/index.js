"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "confirmStaffTemplate", {
  enumerable: true,
  get: function () {
    return _email.confirmStaffTemplate;
  }
});
Object.defineProperty(exports, "confirmUserTemplate", {
  enumerable: true,
  get: function () {
    return _email.confirmUserTemplate;
  }
});
Object.defineProperty(exports, "emailVerifytStaffURL", {
  enumerable: true,
  get: function () {
    return _email.emailVerifytStaffURL;
  }
});
Object.defineProperty(exports, "emailVerifytURL", {
  enumerable: true,
  get: function () {
    return _email.emailVerifytURL;
  }
});
Object.defineProperty(exports, "encryptPassword", {
  enumerable: true,
  get: function () {
    return _auth.encryptPassword;
  }
});
Object.defineProperty(exports, "forgotPasswordTemplate", {
  enumerable: true,
  get: function () {
    return _email.forgotPasswordTemplate;
  }
});
Object.defineProperty(exports, "generateTokenCreateStaff", {
  enumerable: true,
  get: function () {
    return _jwt_helper.generateTokenCreateStaff;
  }
});
Object.defineProperty(exports, "generateTokenVerify", {
  enumerable: true,
  get: function () {
    return _jwt_helper.generateTokenVerify;
  }
});
Object.defineProperty(exports, "passwordResetURL", {
  enumerable: true,
  get: function () {
    return _email.passwordResetURL;
  }
});
Object.defineProperty(exports, "paymentConfirmationTemplate", {
  enumerable: true,
  get: function () {
    return _email.paymentConfirmationTemplate;
  }
});
Object.defineProperty(exports, "signAccessToken", {
  enumerable: true,
  get: function () {
    return _jwt_helper.signAccessToken;
  }
});
Object.defineProperty(exports, "signNewAccessToken", {
  enumerable: true,
  get: function () {
    return _jwt_helper.signNewAccessToken;
  }
});
Object.defineProperty(exports, "signRefreshToken", {
  enumerable: true,
  get: function () {
    return _jwt_helper.signRefreshToken;
  }
});
Object.defineProperty(exports, "verifyLink", {
  enumerable: true,
  get: function () {
    return _auth.verifyLink;
  }
});
var _jwt_helper = require("./jwt_helper");
var _email = require("./email");
var _auth = require("./auth");