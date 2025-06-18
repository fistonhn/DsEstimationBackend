"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _sequelize = require("sequelize");
var _helpers = require("../../helpers");
var _models = require("../../database/models");
var _response = require("../../utils/response");
var _sequelize2 = _interopRequireDefault(require("../transaction/sequelize"));
var _memoryCache = _interopRequireDefault(require("memory-cache"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class UserController {
  // get all users
  static async getAllUsers(req, res) {
    try {
      const {
        role,
        id: userId,
        managerId
      } = req.user;
      if (role === "owner") {
        const users = await _models.Users.findAll({
          order: [["id", "ASC"]],
          where: {
            id: {
              [_sequelize.Op.ne]: userId
            }
          },
          include: {
            model: _models.Trial,
            as: "trial",
            attributes: ["isTrial", "trialStartDate", "trialEndDate"]
          }
        });
        const staffs = await _models.Staffs.findAll({
          order: [["id", "ASC"]],
          where: {
            managerId: {
              [_sequelize.Op.eq]: userId
            }
          }
        });
        return (0, _response.onSuccess)(res, 200, "Users Retrieved Successfully", {
          users,
          staffs
        });
      }
      if (role === "manager") {
        const staffs = await _models.Staffs.findAll({
          where: {
            managerId: userId
          },
          order: [["id", "ASC"]]
        });
        return (0, _response.onSuccess)(res, 200, "Users Retrieved Successfully", {
          staffs
        });
      }
      if (role === "admin") {
        const users = await _models.Users.findAll({
          where: {
            id: managerId
          },
          order: [["id", "ASC"]]
        });
        const staffs = await _models.Staffs.findAll({
          order: [["id", "ASC"]],
          where: {
            managerId: {
              [_sequelize.Op.eq]: userId
            }
          }
        });
        return (0, _response.onSuccess)(res, 200, "Users Retrieved Successfully", {
          staffs: [...staffs, ...users]
        });
      }
    } catch (error) {
      return (0, _response.onError)(res, 500, "something went wrong, try again.", error);
    }
  }

  // get user by id
  static async getUserById(req, res) {
    try {
      const {
        id: userId,
        role
      } = req.user;
      if (role === "owner") {
        const user = await _models.Users.findOne({
          where: {
            id: req.params.id
          },
          include: [{
            model: _models.Staffs,
            as: "staff",
            attributes: ["name", "email", "isActive"]
          }]
        });
        return (0, _response.onSuccess)(res, 200, "User Retrieved Successfully", user);
      }
      if (role === "manager") {
        const user = await _models.Staffs.findOne({
          where: {
            id: req.params.id,
            managerId: userId
          }
        });
        return (0, _response.onSuccess)(res, 200, "User Retrieved Successfully", user);
      }
    } catch (error) {
      return (0, _response.onError)(res, 500, "something went wrong, try again.", error.message);
    }
  }

  // get profile
  static async getProfile(req, res) {
    try {
      const {
        id: userId,
        role,
        managerId
      } = req.user;
      if (role === "admin") {
        const user = await _models.Staffs.findOne({
          where: {
            id: managerId
          }
        });
        return (0, _response.onSuccess)(res, 200, "Profile Retrieved Successfully", user);
      }
      const user = await _models.Users.findOne({
        where: {
          id: userId
        }
      });
      return (0, _response.onSuccess)(res, 200, "Profile Retrieved Successfully", user);
    } catch (error) {
      return (0, _response.onError)(res, 500, "something went wrong, try again.", error.message);
    }
  }

  //  register user
  static async registerUser(req, res) {
    try {
      const user = {
        ...req.body
      };
      const exist = await _models.Users.findOne({
        where: {
          email: user.email
        }
      });
      if (exist) return (0, _response.onError)(res, 400, "Email already exist");
      const token = (0, _helpers.generateTokenVerify)(user);
      const url = (0, _helpers.emailVerifytURL)(token);
      (0, _helpers.confirmUserTemplate)(user, url, "Verify you email to continue! email is valid for 1 hour!");
      return (0, _response.onSuccess)(res, 200, `Hello, ${user.name} Confirmation link sent!`);
    } catch (error) {
      return (0, _response.onError)(res, 500, "something went wrong, try again.", error.message);
    }
  }

  // create user after email verification
  static async createUser(req, res) {
    const t = await _sequelize2.default.transaction();
    try {
      // decode jwt from Url
      const userToken = req.query.token;
      const userInfo = _jsonwebtoken.default.decode(userToken, process.env.TOKEN_SECRET_KEY);

      // distructuring user info
      const {
        name,
        email,
        password
      } = userInfo.payload;
      // check user if is already an exist

      const emailExist = await _models.Users.findOne({
        where: {
          email
        }
      });
      if (emailExist) return (0, _response.onError)(res, 400, `Hi, ${name} your account has been already Verified!`);

      // Hash passwords

      const salt = await _bcryptjs.default.genSalt(10);
      const hashedPassword = await _bcryptjs.default.hash(password, salt);
      const newuser = await _models.Users.create({
        isConfirmed: true,
        name,
        email,
        password: hashedPassword
      }, {
        transaction: t
      });

      // create trial for the user after registration and expiration is 10 days
      const startTrialDate = new Date();

      // end trial date is 10 days after start trial date
      const endTrialDate = new Date(startTrialDate);
      endTrialDate.setDate(endTrialDate.getDate() + 10);
      await _models.Trial.create({
        userId: newuser.id,
        trialStartDate: startTrialDate,
        trialEndDate: endTrialDate
      }, {
        transaction: t
      });
      await t.commit();
      const token = await (0, _helpers.signAccessToken)(newuser);
      return res.redirect(`${process.env.FRONTEND_URL}#/verify?token=${token}`);
    } catch (error) {
      await t.rollback();
      return (0, _response.onError)(res, 500, "something went wrong, try again.", error.message);
    }
  }

  // register staff
  //  register user
  static async registerStaff(req, res) {
    try {
      const {
        id,
        company,
        name
      } = req.user;
      const user = {
        ...req.body,
        managerId: id,
        company
      };
      const exist = await _models.Staffs.findOne({
        where: {
          email: user.email
        }
      });
      if (exist) return (0, _response.onError)(res, 400, "Email already exist");
      const token = (0, _helpers.generateTokenCreateStaff)(user);
      const url = (0, _helpers.emailVerifytStaffURL)(token);
      (0, _helpers.confirmStaffTemplate)(user, url, `${name} is invited to join ${company ? company : ""} team at dsestimation.com!. invitation email is valid for 24 hour! Tempary password is ${user.password}`);
      return (0, _response.onSuccess)(res, 200, `Invitation sent! ${user.email} `);
    } catch (error) {
      return (0, _response.onError)(res, 500, "something went wrong, try again.", error.message);
    }
  }

  // create staff
  static async createStaff(req, res) {
    try {
      // decode jwt from Url
      const userToken = req.query.token;
      const userInfo = _jsonwebtoken.default.decode(userToken, process.env.TOKEN_SECRET_KEY);

      // distructuring user info
      const {
        name,
        email,
        password,
        managerId,
        company
      } = userInfo.payload;
      // check user if is already an exist

      const emailExist = await _models.Staffs.findOne({
        where: {
          email
        }
      });
      if (emailExist) return (0, _response.onError)(res, 400, `Hi, ${name} your account has been already Verified!`);

      // Hash passwords

      const salt = await _bcryptjs.default.genSalt(10);
      const hashedPassword = await _bcryptjs.default.hash(password, salt);
      const newuser = await _models.Staffs.create({
        isConfirmed: true,
        name,
        email,
        managerId,
        company,
        password: hashedPassword
      });
      await _models.AccessLevel.create({
        userId: newuser.id
      });
      const token = await (0, _helpers.signAccessToken)(newuser);
      return res.redirect(`${process.env.FRONTEND_URL}#/verify?token=${token}`);
    } catch (error) {
      return (0, _response.onError)(res, 500, "something went wrong, try again.", error.message);
    }
  }

  // login user
  static async loginUser(req, res) {
    try {
      const {
        email,
        password
      } = req.body;
      const user = await _models.Users.findOne({
        where: {
          email,
          isActive: true
        }
      });
      const staff = await _models.Staffs.findOne({
        where: {
          email,
          isActive: true
        }
      });
      if (!user && !staff) return (0, _response.onError)(res, 400, "Invalid Email or Password");
      if (user) {
        const isMatch = await _bcryptjs.default.compare(password, user.password);
        if (!isMatch) return (0, _response.onError)(res, 400, "Invalid Email or Password");
        const accessToken = await (0, _helpers.signAccessToken)(user);
        await (0, _helpers.signRefreshToken)(user);
        console.log('mmm', accessToken);
        return (0, _response.onSuccess)(res, 200, "User Logged in Successfully", {
          accessToken
        });
      }
      const isMatch = await _bcryptjs.default.compare(password, staff.password);
      if (!isMatch) return (0, _response.onError)(res, 400, "Invalid email or password");
      const accessToken = await (0, _helpers.signAccessToken)(staff);
      await (0, _helpers.signRefreshToken)(staff);
      return (0, _response.onSuccess)(res, 200, "User Logged in Successfully", {
        accessToken
      });
    } catch (error) {
      return (0, _response.onError)(res, 500, "something went wrong, try again.", error.message);
    }
  }

  // logout
  static async logoutUser(req, res) {
    try {
      const {
        id: userId
      } = req.user;
      await _memoryCache.default.del(`refreshToken-${userId}`);
      await _memoryCache.default.del(`accessToken-${userId}`);
      return (0, _response.onSuccess)(res, 200, "User Logged out Successfully");
    } catch (error) {
      return (0, _response.onError)(res, 500, "something went wrong, try again.", error.message);
    }
  }
  // delete user by owner
  static async deleteUser(req, res) {
    try {
      const {
        id
      } = req.params;
      const {
        role
      } = req.user;
      if (role === "owner") {
        // delete staff
        const user = await _models.Users.findOne({
          where: {
            id
          }
        });
        const staff = await _models.Staffs.findAll({
          where: {
            managerId: id
          }
        });
        if (!user) return (0, _response.onError)(res, 400, "User not found");
        if (staff.length > 0) {
          for (let i = 0; i < staff.length; i++) {
            const {
              id: staffId,
              managerId
            } = staff[i];
            await _models.Staffs.destroy({
              where: {
                managerId
              }
            });
            await _memoryCache.default.del(`accessToken-${staffId}`);
            // delete refresh token
            await _memoryCache.default.del(`refreshToken-${staffId}`);
          }
          await user.destroy();
          await _memoryCache.default.del(`accessToken-${id}`);
          // delete refresh token
          await _memoryCache.default.del(`refreshToken-${id}`);
          return (0, _response.onSuccess)(res, 200, "User deleted successfully");
        } else {
          await user.destroy();
          await _memoryCache.default.del(`accessToken-${id}`);
          // delete refresh token
          await _memoryCache.default.del(`refreshToken-${id}`);
          return (0, _response.onSuccess)(res, 200, "User deleted successfully", user);
        }
      }

      // delete user's staff
      if (role === "manager") {
        await _models.Staffs.destroy({
          where: {
            managerId: id
          }
        });

        // delete access token
        await _memoryCache.default.del(`accessToken-${id}`);
        // delete refresh token
        await _memoryCache.default.del(`refreshToken-${id}`);
        return (0, _response.onSuccess)(res, 200, "User deleted successfully");
      }
    } catch (error) {
      return (0, _response.onError)(res, 500, "something went wrong, try again.");
    }
  }

  // delete my own account
  static async deleteMyAccount(req, res) {
    try {
      const {
        id,
        role
      } = req.user;
      if (role === "owner") {
        await _models.Users.destroy({
          where: {
            id
          }
        });
        // delete access token

        await _memoryCache.default.del(`accessToken-${id}`);
        // delete refresh token
        await _memoryCache.default.del(`refreshToken-${id}`);
        return (0, _response.onSuccess)(res, 200, "Account deleted successfully");
      }
      if (role === "manager") {
        const staff = await _models.Staffs.findAll({
          where: {
            managerId: id
          }
        });
        if (staff.length > 0) {
          for (let i = 0; i < staff.length; i++) {
            const {
              id: staffId,
              managerId
            } = staff[i];
            await _models.Staffs.destroy({
              where: {
                managerId
              }
            });
            await _memoryCache.default.del(`accessToken-${staffId}`);
            // delete refresh token
            await _memoryCache.default.del(`refreshToken-${staffId}`);
          }
        }
        await _models.Users.destroy({
          where: {
            id
          }
        });
        // delete access token
        await _memoryCache.default.del(`accessToken-${id}`);
        // delete refresh token
        await _memoryCache.default.del(`refreshToken-${id}`);
        return (0, _response.onSuccess)(res, 200, "Account deleted successfully");
      }
      await _models.Staffs.destroy({
        where: {
          id
        }
      });
      // delete access token
      await _memoryCache.default.del(`accessToken-${id}`);
      // delete refresh token
      await _memoryCache.default.del(`refreshToken-${id}`);
      return (0, _response.onSuccess)(res, 200, "Account deleted successfully");
    } catch (error) {
      return (0, _response.onError)(res, 500, "something went wrong, try again.");
    }
  }

  // change role
  static async changeRole(req, res) {
    try {
      const {
        id
      } = req.params;
      const {
        role: userRole
      } = req.user;
      const {
        role
      } = req.body;
      if (userRole === "owner") {
        await _models.Users.update({
          role
        }, {
          where: {
            id
          }
        });
        return (0, _response.onSuccess)(res, 200, "Role changed successfully");
      }
      if (role === "manager") {
        await _models.Staffs.update({
          role
        }, {
          where: {
            id
          }
        });
        return (0, _response.onSuccess)(res, 200, "Role changed successfully");
      } else {
        return (0, _response.onError)(res, 400, "You are not allowed to change role");
      }
    } catch (error) {
      return (0, _response.onError)(res, 500, "something went wrong, try again.");
    }
  }

  // disable or enable user account
  static async disableOrEnableUser(req, res) {
    try {
      const {
        id
      } = req.params;
      const {
        role
      } = req.user;
      if (role === "owner") {
        const user = await _models.Users.findOne({
          where: {
            id
          }
        });
        if (!user) return (0, _response.onError)(res, 400, "User not found");
        const staff = await _models.Staffs.findAll({
          where: {
            managerId: id
          }
        });
        const {
          isActive
        } = user;
        if (isActive) {
          await user.update({
            isActive: false
          });
          await _models.Staffs.update({
            isActive: false
          }, {
            where: {
              managerId: id
            }
          });
          await _memoryCache.default.del(`accessToken-${id}`);
          // delete refresh token
          await _memoryCache.default.del(`refreshToken-${id}`);

          // delete token for staffs
          if (staff.length > 0) {
            for (let i = 0; i < staff.length; i++) {
              const {
                id: staffId
              } = staff[i];
              await _memoryCache.default.del(`accessToken-${staffId}`);
              // delete refresh token
              await _memoryCache.default.del(`refreshToken-${staffId}`);
            }
          }
          return (0, _response.onSuccess)(res, 200, "User disactivated successfully", user);
        } else {
          await user.update({
            isActive: true
          });
          await _models.Staffs.update({
            isActive: true
          }, {
            where: {
              managerId: id
            }
          });
          return (0, _response.onSuccess)(res, 200, "User activated successfully", user);
        }
      }
      if (role === "manager") {
        const staff = await _models.Staffs.findOne({
          where: {
            id
          }
        });
        if (!staff) return (0, _response.onError)(res, 400, "User not found");
        const {
          isActive
        } = staff;
        if (isActive) {
          await staff.update({
            isActive: false
          });
          await _memoryCache.default.del(`accessToken-${id}`);
          // delete refresh token
          await _memoryCache.default.del(`refreshToken-${id}`);
          return (0, _response.onSuccess)(res, 200, "User disactivated successfully", staff);
        } else {
          await staff.update({
            isActive: true
          });
          return (0, _response.onSuccess)(res, 200, "User activated successfully", staff);
        }
      }
      return (0, _response.onError)(res, 403, "You are not allowed");
    } catch (error) {
      return (0, _response.onError)(res, 500, "something went wrong, try again.");
    }
  }

  // update user
  static async updateUser(req, res) {
    try {
      const {
        role,
        id: userId
      } = req.user;
      const {
        id
      } = req.params;
      const {
        name,
        companyName
      } = req.body;
      if (role === "owner") {
        const user = await _models.Users.findOne({
          where: {
            id
          }
        });
        if (!user) return (0, _response.onError)(res, 400, "User not found");
        await user.update({
          name,
          company: companyName
        });
        return (0, _response.onSuccess)(res, 200, "User updated successfully");
      }
      if (role === "manager") {
        const user = await _models.Users.findOne({
          where: {
            id: userId
          }
        });
        const staff = await _models.Staffs.findOne({
          where: {
            id
          }
        });
        if (!user && !staff) return (0, _response.onError)(res, 400, "Account not found");
        if (user) {
          await user.update({
            name,
            company: companyName
          });
          return (0, _response.onSuccess)(res, 200, "User updated successfully");
        }
        if (staff) {
          await staff.update({
            name,
            company: companyName
          });
          return (0, _response.onSuccess)(res, 200, "User updated successfully");
        }
      }
      if (role === "admin") {
        const staff = await _models.Staffs.findOne({
          where: {
            id: userId
          }
        });
        if (!staff) return (0, _response.onError)(res, 400, "User not found");
        await staff.update({
          name,
          company: companyName
        });
        return (0, _response.onSuccess)(res, 200, "User updated successfully");
      }
      return (0, _response.onError)(res, 403, "You are not allowed");
    } catch (error) {
      return (0, _response.onError)(res, 500, "something went wrong, try again.");
    }
  }

  // refresh token
  static async refreshToken(req, res) {
    try {
      const user = await _models.Users.findOne({
        where: {
          id: req.params.id
        }
      });
      const refreshToken = await _memoryCache.default.get(`refreshToken-${user.id}`);
      if (!refreshToken) return (0, _response.onError)(res, 401, "Unauthorized");
      const isValid = _jsonwebtoken.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      if (!isValid) return (0, _response.onError)(res, 401, "Unauthorized");
      const accessToken = await (0, _helpers.signNewAccessToken)(user);
      return (0, _response.onSuccess)(res, 200, "Access Token Renewed", accessToken);
    } catch (error) {
      return (0, _response.onError)(res, 500, "something went wrong, try again.", error.message);
    }
  }

  // forgot password
  static async forgotPassword(req, res) {
    try {
      const {
        email
      } = req.body;
      const user = await _models.Users.findOne({
        where: {
          email,
          isActive: true
        }
      });
      if (user) {
        const token = _jsonwebtoken.default.sign({
          email: user.email,
          id: user.id
        }, user.password, {
          expiresIn: "24h"
        });
        const resetUrl = (0, _helpers.passwordResetURL)(user, token);
        (0, _helpers.forgotPasswordTemplate)(user, resetUrl, "we have recieved change password request if it was you click the link below, otherwise ignore this email");
        return (0, _response.onSuccess)(res, 200, "check you email to change password");
      } else {
        return (0, _response.onError)(res, 404, "Email doesn't exist!");
      }
    } catch (error) {
      return (0, _response.onError)(res, 500, "something went wrong, try again.");
    }
  }

  // reset password link
  static async getResetPasswordLink(req, res) {
    try {
      const token = req.query.token;
      const email = req.query.email;
      const user = await _models.Users.findOne({
        where: {
          email
        }
      });
      const verifyToken = _jsonwebtoken.default.verify(token, user.password);
      if (!verifyToken) {
        return (0, _response.onError)(res, 401, "Unauthorized");
      }
      return res.redirect(`http://localhost:3000/reset-password?token=${token}&email=${email}`);
    } catch (error) {
      return (0, _response.onError)(res, 500, "something went wrong, try again.");
    }
  }

  // reset password
  static async resetPassword(req, res) {
    try {
      const {
        email
      } = req.params;
      const foundUser = await _models.Users.findOne({
        where: {
          email
        }
      });
      const password = await (0, _helpers.encryptPassword)(req.body.password);
      const {
        email: useremail
      } = (0, _helpers.verifyLink)(req.params.token, foundUser.password);
      if (!useremail) return (0, _response.onError)(res, 401, "Unauthorized");
      foundUser.password = password;
      foundUser.email = useremail;

      // update password
      await _models.Users.update({
        password: foundUser.password
      }, {
        where: {
          id: foundUser.id
        }
      });
      return (0, _response.onSuccess)(res, 200, "Password Changed Successfully now you can login!");
    } catch (error) {
      return (0, _response.onError)(res, 500, "something went wrong, try again.");
    }
  }
}
var _default = exports.default = UserController;