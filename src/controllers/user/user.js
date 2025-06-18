import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import {
  signAccessToken,
  signRefreshToken,
  signNewAccessToken,
  generateTokenVerify,
  generateTokenCreateStaff,
  emailVerifytURL,
  emailVerifytStaffURL,
  confirmUserTemplate,
  confirmStaffTemplate,
  forgotPasswordTemplate,
  passwordResetURL,
  encryptPassword,
  verifyLink,
} from "../../helpers";

import { Users, Staffs, Trial, AccessLevel } from "../../database/models";
import { onSuccess, onError } from "../../utils/response";
import sequelize from "../transaction/sequelize";
import cache from "memory-cache";

class UserController {
  // get all users
  static async getAllUsers(req, res) {
    try {
      const { role, id: userId, managerId } = req.user;
      if (role === "owner") {
        const users = await Users.findAll({
          order: [["id", "ASC"]],
          where: { id: { [Op.ne]: userId } },
          include: {
            model: Trial,
            as: "trial",
            attributes: ["isTrial", "trialStartDate", "trialEndDate"],
          },
        });
        const staffs = await Staffs.findAll({
          order: [["id", "ASC"]],
          where: { managerId: { [Op.eq]: userId } },
        });

        return onSuccess(res, 200, "Users Retrieved Successfully", {
          users,
          staffs,
        });
      }
      if (role === "manager") {
        const staffs = await Staffs.findAll({
          where: { managerId: userId },
          order: [["id", "ASC"]],
        });
        return onSuccess(res, 200, "Users Retrieved Successfully", {
          staffs,
        });
      }
      if (role === "admin") {
        const users = await Users.findAll({
          where: { id: managerId },
          order: [["id", "ASC"]],
        });
        const staffs = await Staffs.findAll({
          order: [["id", "ASC"]],
          where: { managerId: { [Op.eq]: userId } },
        });
        return onSuccess(res, 200, "Users Retrieved Successfully", {
          staffs: [...staffs, ...users],
        });
      }
    } catch (error) {
      return onError(res, 500, "something went wrong, try again.", error);
    }
  }

  // get user by id
  static async getUserById(req, res) {
    try {
      const { id: userId, role } = req.user;
      if (role === "owner") {
        const user = await Users.findOne({
          where: {
            id: req.params.id,
          },
          include: [
            {
              model: Staffs,
              as: "staff",
              attributes: ["name", "email", "isActive"],
            },
          ],
        });

        return onSuccess(res, 200, "User Retrieved Successfully", user);
      }
      if (role === "manager") {
        const user = await Staffs.findOne({
          where: {
            id: req.params.id,
            managerId: userId,
          },
        });
        return onSuccess(res, 200, "User Retrieved Successfully", user);
      }
    } catch (error) {
      return onError(
        res,
        500,
        "something went wrong, try again.",
        error.message
      );
    }
  }

  // get profile
  static async getProfile(req, res) {
    try {
      const { id: userId, role, managerId } = req.user;
      if (role === "admin") {
        const user = await Staffs.findOne({
          where: {
            id: managerId,
          },
        });

        return onSuccess(res, 200, "Profile Retrieved Successfully", user);
      }
      const user = await Users.findOne({
        where: {
          id: userId,
        },
      });

      return onSuccess(res, 200, "Profile Retrieved Successfully", user);
    } catch (error) {
      return onError(
        res,
        500,
        "something went wrong, try again.",
        error.message
      );
    }
  }

  //  register user
  static async registerUser(req, res) {
    try {
      const user = {
        ...req.body,
      };
      const exist = await Users.findOne({ where: { email: user.email } });
      if (exist) return onError(res, 400, "Email already exist");
      const token = generateTokenVerify(user);
      const url = emailVerifytURL(token);
      confirmUserTemplate(
        user,
        url,
        "Verify you email to continue! email is valid for 1 hour!"
      );
      return onSuccess(res, 200, `Hello, ${user.name} Confirmation link sent!`);
    } catch (error) {
      return onError(
        res,
        500,
        "something went wrong, try again.",
        error.message
      );
    }
  }

  // create new user before email verification
  static async createNewUser(req, res) {
    const t = await sequelize.transaction();
    try {
      const user = {
        ...req.body,
      };
      const exist = await Users.findOne({ where: { email: user.email } });
      if (exist) return onError(res, 400, "Email already exist");
      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);

      const newuser = await Users.create(
        {
          isConfirmed: true,
          name: user.name,
          email: user.email,
          password: hashedPassword,
        },
        { transaction: t }
      );

      // create trial for the user after registration and expiration is 10 days
      const startTrialDate = new Date();

      // end trial date is 10 days after start trial date
      const endTrialDate = new Date(startTrialDate);
      endTrialDate.setDate(endTrialDate.getDate() + 10);

      await Trial.create(
        {
          userId: newuser.id,
          trialStartDate: startTrialDate,
          trialEndDate: endTrialDate,
        },
        { transaction: t }
      );

      await t.commit();
      
      return onSuccess(res, 200, `Hello, ${user.name}, Your account created successfully!`);
    } catch (error) {
      return onError(
        res,
        500,
        "something went wrong, try again.",
        error.message
      );
    }
  }

  // create user after email verification
  static async createUser(req, res) {
    const t = await sequelize.transaction();
    try {
      // decode jwt from Url
      const userToken = req.query.token;

      const userInfo = jwt.decode(userToken, process.env.TOKEN_SECRET_KEY);

      // distructuring user info
      const { name, email, password } = userInfo.payload;
      // check user if is already an exist

      const emailExist = await Users.findOne({ where: { email } });
      if (emailExist)
        return onError(
          res,
          400,
          `Hi, ${name} your account has been already Verified!`
        );

      // Hash passwords

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newuser = await Users.create(
        {
          isConfirmed: true,
          name,
          email,
          password: hashedPassword,
        },
        { transaction: t }
      );

      // create trial for the user after registration and expiration is 10 days
      const startTrialDate = new Date();

      // end trial date is 10 days after start trial date
      const endTrialDate = new Date(startTrialDate);
      endTrialDate.setDate(endTrialDate.getDate() + 10);

      await Trial.create(
        {
          userId: newuser.id,
          trialStartDate: startTrialDate,
          trialEndDate: endTrialDate,
        },
        { transaction: t }
      );

      await t.commit();

      const token = await signAccessToken(newuser);
      return res.redirect(`${process.env.FRONTEND_URL}#/verify?token=${token}`);
    } catch (error) {
      await t.rollback();
      return onError(
        res,
        500,
        "something went wrong, try again.",
        error.message
      );
    }
  }

  // register staff
  //  register user
  static async registerStaff(req, res) {
    try {
      const { id, company, name } = req.user;
      const user = {
        ...req.body,
        managerId: id,
        company,
      };
      const exist = await Staffs.findOne({ where: { email: user.email } });
      if (exist) return onError(res, 400, "Email already exist");
      const token = generateTokenCreateStaff(user);
      const url = emailVerifytStaffURL(token);
      confirmStaffTemplate(
        user,
        url,
        `${name} is invited to join ${
          company ? company : ""
        } team at dsestimation.com!. invitation email is valid for 24 hour! Tempary password is ${
          user.password
        }`
      );
      return onSuccess(res, 200, `Invitation sent! ${user.email} `);
    } catch (error) {
      return onError(
        res,
        500,
        "something went wrong, try again.",
        error.message
      );
    }
  }

  // create staff
  static async createStaff(req, res) {
    try {
      // decode jwt from Url
      const userToken = req.query.token;

      const userInfo = jwt.decode(userToken, process.env.TOKEN_SECRET_KEY);

      // distructuring user info
      const { name, email, password, managerId, company } = userInfo.payload;
      // check user if is already an exist

      const emailExist = await Staffs.findOne({ where: { email } });
      if (emailExist)
        return onError(
          res,
          400,
          `Hi, ${name} your account has been already Verified!`
        );

      // Hash passwords

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newuser = await Staffs.create({
        isConfirmed: true,
        name,
        email,
        managerId,
        company,
        password: hashedPassword,
      });

      await AccessLevel.create({
        userId: newuser.id,
      });

      const token = await signAccessToken(newuser);
      return res.redirect(`${process.env.FRONTEND_URL}#/verify?token=${token}`);
    } catch (error) {
      return onError(
        res,
        500,
        "something went wrong, try again.",
        error.message
      );
    }
  }

  // login user
  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ where: { email, isActive: true } });
      const staff = await Staffs.findOne({ where: { email, isActive: true } });
      if (!user && !staff)
        return onError(res, 400, "Invalid Email or Password");
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return onError(res, 400, "Invalid Email or Password");
        const accessToken = await signAccessToken(user);
        await signRefreshToken(user);
        return onSuccess(res, 200, "User Logged in Successfully", {
          accessToken,
        });
      }
      const isMatch = await bcrypt.compare(password, staff.password);
      if (!isMatch) return onError(res, 400, "Invalid email or password");
      const accessToken = await signAccessToken(staff);
      await signRefreshToken(staff);
      return onSuccess(res, 200, "User Logged in Successfully", {
        accessToken,
      });
    } catch (error) {
      return onError(
        res,
        500,
        "something went wrong, try again.",
        error.message
      );
    }
  }

  // logout
  static async logoutUser(req, res) {
    try {
      const { id: userId } = req.user;

      await cache.del(`refreshToken-${userId}`);
      await cache.del(`accessToken-${userId}`);
      return onSuccess(res, 200, "User Logged out Successfully");
    } catch (error) {
      return onError(
        res,
        500,
        "something went wrong, try again.",
        error.message
      );
    }
  }
  // delete user by owner
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const { role } = req.user;
      if (role === "owner") {
        // delete staff
        const user = await Users.findOne({ where: { id } });
        const staff = await Staffs.findAll({ where: { managerId: id } });

        if (!user) return onError(res, 400, "User not found");

        if (staff.length > 0) {
          for (let i = 0; i < staff.length; i++) {
            const { id: staffId, managerId } = staff[i];

            await Staffs.destroy({ where: { managerId } });

            await cache.del(`accessToken-${staffId}`);
            // delete refresh token
            await cache.del(`refreshToken-${staffId}`);
          }
          await user.destroy();

          await cache.del(`accessToken-${id}`);
          // delete refresh token
          await cache.del(`refreshToken-${id}`);

          return onSuccess(res, 200, "User deleted successfully");
        } else {
          await user.destroy();

          await cache.del(`accessToken-${id}`);
          // delete refresh token
          await cache.del(`refreshToken-${id}`);

          return onSuccess(res, 200, "User deleted successfully", user);
        }
      }

      // delete user's staff
      if (role === "manager") {
        await Staffs.destroy({ where: { managerId: id } });

        // delete access token
        await cache.del(`accessToken-${id}`);
        // delete refresh token
        await cache.del(`refreshToken-${id}`);
        return onSuccess(res, 200, "User deleted successfully");
      }
    } catch (error) {
      return onError(res, 500, "something went wrong, try again.");
    }
  }

  // delete my own account
  static async deleteMyAccount(req, res) {
    try {
      const { id, role } = req.user;
      if (role === "owner") {
        await Users.destroy({ where: { id } });
        // delete access token

        await cache.del(`accessToken-${id}`);
        // delete refresh token
        await cache.del(`refreshToken-${id}`);
        return onSuccess(res, 200, "Account deleted successfully");
      }
      if (role === "manager") {
        const staff = await Staffs.findAll({ where: { managerId: id } });

        if (staff.length > 0) {
          for (let i = 0; i < staff.length; i++) {
            const { id: staffId, managerId } = staff[i];

            await Staffs.destroy({ where: { managerId } });

            await cache.del(`accessToken-${staffId}`);
            // delete refresh token
            await cache.del(`refreshToken-${staffId}`);
          }
        }

        await Users.destroy({ where: { id } });
        // delete access token
        await cache.del(`accessToken-${id}`);
        // delete refresh token
        await cache.del(`refreshToken-${id}`);
        return onSuccess(res, 200, "Account deleted successfully");
      }

      await Staffs.destroy({ where: { id } });
      // delete access token
      await cache.del(`accessToken-${id}`);
      // delete refresh token
      await cache.del(`refreshToken-${id}`);
      return onSuccess(res, 200, "Account deleted successfully");
    } catch (error) {
      return onError(res, 500, "something went wrong, try again.");
    }
  }

  // change role
  static async changeRole(req, res) {
    try {
      const { id } = req.params;
      const { role: userRole } = req.user;
      const { role } = req.body;
      if (userRole === "owner") {
        await Users.update({ role }, { where: { id } });
        return onSuccess(res, 200, "Role changed successfully");
      }
      if (role === "manager") {
        await Staffs.update({ role }, { where: { id } });
        return onSuccess(res, 200, "Role changed successfully");
      } else {
        return onError(res, 400, "You are not allowed to change role");
      }
    } catch (error) {
      return onError(res, 500, "something went wrong, try again.");
    }
  }

  // disable or enable user account
  static async disableOrEnableUser(req, res) {
    try {
      const { id } = req.params;
      const { role } = req.user;
      if (role === "owner") {
        const user = await Users.findOne({ where: { id } });
        if (!user) return onError(res, 400, "User not found");
        const staff = await Staffs.findAll({ where: { managerId: id } });
        const { isActive } = user;
        if (isActive) {
          await user.update({ isActive: false });
          await Staffs.update(
            { isActive: false },
            { where: { managerId: id } }
          );
          await cache.del(`accessToken-${id}`);
          // delete refresh token
          await cache.del(`refreshToken-${id}`);

          // delete token for staffs
          if (staff.length > 0) {
            for (let i = 0; i < staff.length; i++) {
              const { id: staffId } = staff[i];
              await cache.del(`accessToken-${staffId}`);
              // delete refresh token
              await cache.del(`refreshToken-${staffId}`);
            }
          }

          return onSuccess(res, 200, "User disactivated successfully", user);
        } else {
          await user.update({ isActive: true });
          await Staffs.update({ isActive: true }, { where: { managerId: id } });
          return onSuccess(res, 200, "User activated successfully", user);
        }
      }

      if (role === "manager") {
        const staff = await Staffs.findOne({ where: { id } });
        if (!staff) return onError(res, 400, "User not found");
        const { isActive } = staff;
        if (isActive) {
          await staff.update({ isActive: false });
          await cache.del(`accessToken-${id}`);
          // delete refresh token
          await cache.del(`refreshToken-${id}`);
          return onSuccess(res, 200, "User disactivated successfully", staff);
        } else {
          await staff.update({ isActive: true });
          return onSuccess(res, 200, "User activated successfully", staff);
        }
      }

      return onError(res, 403, "You are not allowed");
    } catch (error) {
      return onError(res, 500, "something went wrong, try again.");
    }
  }

  // update user
  static async updateUser(req, res) {
    try {
      const { role, id: userId } = req.user;
      const { id } = req.params;
      const { name, companyName } = req.body;
      if (role === "owner") {
        const user = await Users.findOne({ where: { id } });
        if (!user) return onError(res, 400, "User not found");
        await user.update({ name, company: companyName });
        return onSuccess(res, 200, "User updated successfully");
      }

      if (role === "manager") {
        const user = await Users.findOne({ where: { id: userId } });
        const staff = await Staffs.findOne({ where: { id } });
        if (!user && !staff) return onError(res, 400, "Account not found");

        if (user) {
          await user.update({ name, company: companyName });
          return onSuccess(res, 200, "User updated successfully");
        }
        if (staff) {
          await staff.update({ name, company: companyName });
          return onSuccess(res, 200, "User updated successfully");
        }
      }

      if (role === "admin") {
        const staff = await Staffs.findOne({ where: { id: userId } });
        if (!staff) return onError(res, 400, "User not found");
        await staff.update({ name, company: companyName });
        return onSuccess(res, 200, "User updated successfully");
      }

      return onError(res, 403, "You are not allowed");
    } catch (error) {
      return onError(res, 500, "something went wrong, try again.");
    }
  }

  // refresh token
  static async refreshToken(req, res) {
    try {
      const user = await Users.findOne({ where: { id: req.params.id } });

      const refreshToken = await cache.get(`refreshToken-${user.id}`);
      if (!refreshToken) return onError(res, 401, "Unauthorized");
      const isValid = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      if (!isValid) return onError(res, 401, "Unauthorized");
      const accessToken = await signNewAccessToken(user);
      return onSuccess(res, 200, "Access Token Renewed", accessToken);
    } catch (error) {
      return onError(
        res,
        500,
        "something went wrong, try again.",
        error.message
      );
    }
  }

  // forgot password
  static async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const user = await Users.findOne({ where: { email, isActive: true } });
      if (user) {
        const token = jwt.sign(
          { email: user.email, id: user.id },
          user.password,
          {
            expiresIn: "24h",
          }
        );
        const resetUrl = passwordResetURL(user, token);
        forgotPasswordTemplate(
          user,
          resetUrl,
          "we have recieved change password request if it was you click the link below, otherwise ignore this email"
        );
        return onSuccess(res, 200, "check you email to change password");
      } else {
        return onError(res, 404, "Email doesn't exist!");
      }
    } catch (error) {
      return onError(res, 500, "something went wrong, try again.");
    }
  }

  // reset password link
  static async getResetPasswordLink(req, res) {
    try {
      const token = req.query.token;
      const email = req.query.email;
      const user = await Users.findOne({ where: { email } });
      const verifyToken = jwt.verify(token, user.password);
      if (!verifyToken) {
        return onError(res, 401, "Unauthorized");
      }

      return res.redirect(
        `http://localhost:3000/reset-password?token=${token}&email=${email}`
      );
    } catch (error) {
      return onError(res, 500, "something went wrong, try again.");
    }
  }

  // reset password
  static async resetPassword(req, res) {
    try {
      const { email } = req.params;
      const foundUser = await Users.findOne({ where: { email } });
      const password = await encryptPassword(req.body.password);
      const { email: useremail } = verifyLink(
        req.params.token,
        foundUser.password
      );
      if (!useremail) return onError(res, 401, "Unauthorized");

      foundUser.password = password;
      foundUser.email = useremail;

      // update password
      await Users.update(
        { password: foundUser.password },
        { where: { id: foundUser.id } }
      );

      return onSuccess(
        res,
        200,
        "Password Changed Successfully now you can login!"
      );
    } catch (error) {
      return onError(res, 500, "something went wrong, try again.");
    }
  }
}
export default UserController;
