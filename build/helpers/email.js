"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paymentConfirmationTemplate = exports.passwordResetURL = exports.forgotPasswordTemplate = exports.emailVerifytURL = exports.emailVerifytStaffURL = exports.confirmUserTemplate = exports.confirmStaffTemplate = void 0;
var _mail = _interopRequireDefault(require("@sendgrid/mail"));
var _mailgen = _interopRequireDefault(require("mailgen"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_dotenv.default.config();
const template = new _mailgen.default({
  theme: "default",
  product: {
    name: "DS ESTIMATION",
    link: "https://dsestimation.com/",
    logo: "https://dsee.netlify.app/static/media/logo.b9e6193aa50d5147f203.jpeg"
  }
});
_mail.default.setApiKey(process.env.SENDGRID_API_KEY);
const host = process.env.APP_URL;
const passwordResetURL = (user, token) => `${host}/api/user/reset-password/url?token=${token}&email=${user.email}`;
exports.passwordResetURL = passwordResetURL;
const emailVerifytURL = token => `${host}/api/user/verify/signup?token=${token}`;
exports.emailVerifytURL = emailVerifytURL;
const emailVerifytStaffURL = token => `${host}/api/user/staff/accept/verify?token=${token}`;
exports.emailVerifytStaffURL = emailVerifytStaffURL;
const generateEmail = (name, instructions, link) => ({
  body: {
    name,
    intro: "We're very excited to have you on board.",
    action: {
      instructions,
      button: {
        color: "#22BC66",
        // Optional action button color
        text: "Confirm your account",
        link
      }
    },
    outro: "Need help, or have questions? Just reply to this email, we'd love to help."
  }
});
const generateInvitationEmail = (name, instructions, link) => ({
  body: {
    name,
    intro: "We're very excited to have you on board.",
    action: {
      instructions,
      button: {
        color: "#22BC66",
        // Optional action button color
        text: "Accept Invitation",
        link
      }
    },
    outro: "Need help, or have questions? Just reply to this email, we'd love to help."
  }
});
const generateforgotPasswordEmail = (name, instructions, link) => ({
  body: {
    name,
    action: {
      instructions,
      button: {
        color: "#FF0000",
        // Optional action button color
        text: "Change Password",
        link
      }
    }
  }
});

// payment email
const paymentConfirmationEmail = (name, instructions, link) => ({
  body: {
    name,
    intro: "We're very excited to have you on board.",
    action: {
      instructions,
      button: {
        color: "#22BC66",
        text: "Login",
        link
      }
    },
    outro: "Need help, or have questions? Just reply to this email, we'd love to help."
  }
});

// payment email
const paymentConfirmationTemplate = async (user, url, message) => {
  const email = paymentConfirmationEmail(user.name, message, url);
  const emailBody = template.generate(email);
  const msg = {
    to: user.email,
    from: "ndatigilbert@gmail.com",
    subject: "Payment Confirmation",
    html: emailBody
  };
  try {
    await _mail.default.send(msg);
  } catch (error) {
    return "Internal server error";
  }
};
exports.paymentConfirmationTemplate = paymentConfirmationTemplate;
const confirmUserTemplate = async (user, url, message) => {
  const emailBody = generateEmail(`${user.name}!`, message, `${url}`);
  const emailTemplate = template.generate(emailBody);
  const msg = {
    to: user.email,
    from: "ndatigilbert@gmail.com",
    subject: "Verify Your Email",
    html: emailTemplate
  };
  try {
    await _mail.default.send(msg);
  } catch (error) {
    return "Internal server error";
  }
};
exports.confirmUserTemplate = confirmUserTemplate;
const confirmStaffTemplate = async (user, url, message) => {
  const emailBody = generateInvitationEmail(`${user.name}!`, message, `${url}`);
  const emailTemplate = template.generate(emailBody);
  const msg = {
    to: user.email,
    from: "ndatigilbert@gmail.com",
    subject: "Accept Invitation",
    html: emailTemplate
  };
  try {
    await _mail.default.send(msg);
  } catch (error) {
    return "Internal server error";
  }
};
exports.confirmStaffTemplate = confirmStaffTemplate;
const forgotPasswordTemplate = async (user, url, message) => {
  const emailBody = generateforgotPasswordEmail(`${user.name}! You have requested to change your password`, message, `${url}`);
  const emailTemplate = template.generate(emailBody);
  const msg = {
    to: user.email,
    from: "ndatigilbert@gmail.com",
    subject: "Change Password Request",
    html: emailTemplate
  };
  try {
    await _mail.default.send(msg);
  } catch (error) {
    return "Internal server error";
  }
};
exports.forgotPasswordTemplate = forgotPasswordTemplate;