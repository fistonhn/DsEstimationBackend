"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _response = require("../utils/response");
var _validators = require("../validators");
class Validators {
  // validate material
  static isMaterialValid(req, res, next) {
    const {
      error
    } = (0, _validators.validateMaterial)(req.body);
    if (error) {
      return (0, _response.onError)(res, 400, error.details[0].message);
    }
    next();
  }

  // validate unit
  static isUnitValid(req, res, next) {
    const {
      error
    } = (0, _validators.validateUnit)(req.body);
    if (error) {
      return (0, _response.onError)(res, 400, error.details[0].message);
    }
    next();
  }
  static isEquipmentValid(req, res, next) {
    const {
      error
    } = (0, _validators.validateEquipment)(req.body);
    if (error) {
      return (0, _response.onError)(res, 400, error.details[0].message);
    }
    next();
  }
  static isLabourInputValid(req, res, next) {
    const {
      error
    } = (0, _validators.validateLabour)(req.body);
    if (error) {
      return (0, _response.onError)(res, 400, error.details[0].message);
    }
    next();
  }
  static isSubContractorInputValid(req, res, next) {
    const {
      error
    } = (0, _validators.validateSubContractor)(req.body);
    if (error) {
      return (0, _response.onError)(res, 400, error.details[0].message);
    }
    next();
  }
  static isSupplierInputValid(req, res, next) {
    const {
      error
    } = (0, _validators.validateSupplier)(req.body);
    if (error) {
      return (0, _response.onError)(res, 400, error.details[0].message);
    }
    next();
  }

  // validate estimation CREATE
  static isEstimationCreateValid(req, res, next) {
    const {
      error
    } = (0, _validators.validateCreateEstimation)(req.body);
    if (error) {
      return (0, _response.onError)(res, 400, error.message);
    }
    next();
  }

  // validate user login
  static isLoginInputValid(req, res, next) {
    const {
      error
    } = (0, _validators.validateUserLogin)(req.body);
    if (error) {
      return (0, _response.onError)(res, 400, error.details[0].message);
    }
    next();
  }

  // validate user register
  static isUserRegisterValid(req, res, next) {
    const {
      error
    } = (0, _validators.validateUserRegister)(req.body);
    if (error) {
      return (0, _response.onError)(res, 400, error.details[0].message);
    }
    next();
  }

  // validate email
  static validateForgotPasswordEmail(req, res, next) {
    const {
      error
    } = (0, _validators.validateEmail)(req.body);
    if (error) return (0, _response.onError)(res, 400, error.details[0].message);
    next();
  }

  // validate project input
  static isProjectInputValid(req, res, next) {
    const {
      error
    } = (0, _validators.validateProject)(req.body);
    if (error) {
      return (0, _response.onError)(res, 400, error.details[0].message);
    }
    next();
  }

  // consumption validation
  static isEquipmentConsumptionValid(req, res, next) {
    const {
      error
    } = (0, _validators.validateEquipmentConsumption)(req.body);
    if (error) {
      return (0, _response.onError)(res, 400, error.details[0].message);
    }
    next();
  }
  static isMaterialConsumptionValid(req, res, next) {
    const {
      error
    } = (0, _validators.validateMaterialConsumption)(req.body);
    if (error) {
      return (0, _response.onError)(res, 400, error.details[0].message);
    }
    next();
  }
  static isLabourConsumptionValid(req, res, next) {
    const {
      error
    } = (0, _validators.validateLabourConsumption)(req.body);
    if (error) {
      return (0, _response.onError)(res, 400, error.details[0].message);
    }
    next();
  }
  static isSubcontractorConsumptionValid(req, res, next) {
    const {
      error
    } = (0, _validators.validateSubContractorConsumption)(req.body);
    if (error) {
      return (0, _response.onError)(res, 400, error.details[0].message);
    }
    next();
  }
  static isEstimationConsumptionValid(req, res, next) {
    const {
      error
    } = (0, _validators.validateEstimationConsumption)(req.body);
    if (error) {
      return (0, _response.onError)(res, 400, error.details[0].message);
    }
    next();
  }

  // validate from and end date
  static isfromAndEndDateValid(req, res, next) {
    const {
      error
    } = (0, _validators.validatefromAndEndDate)(req.body);
    if (error) {
      return (0, _response.onError)(res, 400, error.details[0].message);
    }
    next();
  }

  // validate category
  static isCategoryValid(req, res, next) {
    const {
      error
    } = (0, _validators.validateCreateCategory)(req.body);
    if (error) {
      return (0, _response.onError)(res, 400, error.details[0].message);
    }
    next();
  }

  // validate currency
  static isCurrencyInputValid(req, res, next) {
    const {
      error
    } = (0, _validators.ValidateCurrency)(req.body);
    if (error) {
      return (0, _response.onError)(res, 400, error.details[0].message);
    }
    next();
  }

  // validate payment plan
  static isPaymentplanInputValid(req, res, next) {
    const {
      error
    } = (0, _validators.paymentPlanValidation)(req.body);
    if (error) {
      return (0, _response.onError)(res, 400, error.details[0].message);
    }
    next();
  }

  // addons
  static isAddonsCreateValid(req, res, next) {
    const {
      error
    } = (0, _validators.validateProjectAddons)(req.body);
    if (error) {
      return (0, _response.onError)(res, 400, error.message);
    }
    next();
  }

  // validate role
  static isRoleValid(req, res, next) {
    const {
      error
    } = (0, _validators.validateRole)(req.body);
    if (error) {
      return (0, _response.onError)(res, 400, error.details[0].message);
    }
    next();
  }
}
var _default = exports.default = Validators;