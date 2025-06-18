"use strict";

var _mod = _interopRequireDefault(require("../../mod.cjs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  SUBSCRIPTION_PAYMENT_URL,
  SECRET_KEY,
  APP_URL: BACKEND_URL,
  PAYMENT_URL
} = process.env;
const createSubscriptionPlan = async ({
  name,
  amount,
  interval,
  currency
}) => {
  const body = {
    name: name,
    amount,
    interval: interval,
    currency
  };
  const res = await (0, _mod.default)(SUBSCRIPTION_PAYMENT_URL, {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SECRET_KEY}`
    }
  });
  const data = await res.json();
  return data;
};
const initiatePayment = async (customer, planId, amount, currency) => {
  const body = {
    customer,
    amount,
    currency,
    tx_ref: Date.now(),
    payment_options: "card, ussd, mobilemoneyghana, banktransfer, mobilemoneyghana, mobilemoneyfranco, mobilemoneyuganda, mobilemoneyrwanda, mobilemoneyzambia",
    redirect_url: `${BACKEND_URL}/api/payment/success`,
    payment_plan: planId
  };
  const res = await (0, _mod.default)(PAYMENT_URL, {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SECRET_KEY}`
    }
  });
  const data = await res.json();
  return data;
};
module.exports = {
  createSubscriptionPlan,
  initiatePayment
};