import fetch from "../../../mod.cjs";
import { PaymentPlan, Users, Trial } from "../../database/models";
import { onSuccess, onError } from "../../utils/response";
import { createSubscriptionPlan, initiatePayment } from "../../payment/payment";
import generator from "generate-password";
import bcrypt from "bcryptjs";
import { paymentConfirmationTemplate } from "../../helpers";

const { SUBSCRIPTION_PAYMENT_URL, SECRET_KEY, TRANSACTION_URL } = process.env;

class PaymentController {
  // create payment plan
  static async createPaymentPlan(req, res) {
    try {
      const { amount, name, interval, currency } = req.body;
      const data = await createSubscriptionPlan({
        name,
        amount,
        interval,
        currency,
      });
      await PaymentPlan.create({
        name: data.data.name,
        amount: data.data.amount,
        interval: data.data.interval,
        status: data.data.status,
        planId: data.data.id,
      });
      return onSuccess(res, 201, "Payment plan created successfully", data);
    } catch (error) {
      return onError(res, 500, "something went wrong. try again");
    }
  }

  // get all payment plans
  static async getAllPaymentPlans(req, res) {
    try {
      const response = await fetch(SUBSCRIPTION_PAYMENT_URL, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SECRET_KEY}`,
        },
      });
      const data = await response.json();
      return onSuccess(
        res,
        200,
        "Payment plans retrieved successfully",
        data.data
      );
    } catch (error) {
      return onError(res, 500, "something went wrong. try again");
    }
  }
  // get all TRANSACTIONS
  static async getAllPaymentTransaction(req, res) {
    try {
      const response = await fetch(TRANSACTION_URL, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SECRET_KEY}`,
        },
      });
      const data = await response.json();
      return onSuccess(
        res,
        200,
        "Transactions fetched successfully",
        data.data
      );
    } catch (error) {
      return onError(res, 500, "something went wrong. try again");
    }
  }

  // get payment plan by id
  static async getPaymentPlanById(req, res) {
    try {
      const { id } = req.params;
      const paymentPlan = await PaymentPlan.findOne({ where: { planId: id } });
      if (!paymentPlan) {
        return onError(res, 404, "Payment plan not found");
      }
      const response = await fetch(`${SUBSCRIPTION_PAYMENT_URL}/${id}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SECRET_KEY}`,
        },
      });
      const data = await response.json();

      return onSuccess(
        res,
        200,
        "Payment plan retrieved successfully",
        data.data
      );
    } catch (error) {
      return onError(res, 500, "something went wrong. try again");
    }
  }

  // update payment plan
  static async updatePaymentPlan(req, res) {
    try {
      const { id } = req.params;
      const { name, status } = req.body;
      const paymentPlan = await PaymentPlan.findOne({ where: { planId: id } });
      if (!paymentPlan) {
        return onError(res, 404, "Payment plan not found");
      }

      const editedName = name ? name : paymentPlan.name;
      const response = await fetch(`${SUBSCRIPTION_PAYMENT_URL}/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          status,
          name: editedName,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SECRET_KEY}`,
        },
      });
      const data = await response.json();
      // update payment plan in db
      await paymentPlan.update({
        name: editedName,
        status,
      });
      return onSuccess(
        res,
        200,
        "Payment plan updated successfully",
        data.data
      );
    } catch (error) {
      return onError(res, 500, "something went wrong. try again");
    }
  }

  // cancel payment plan
  static async cancelPaymentPlan(req, res) {
    try {
      const { id } = req.params;
      const paymentPlan = await PaymentPlan.findOne({ where: { planId: id } });
      if (!paymentPlan) {
        return onError(res, 404, "Payment plan not found");
      }
      const response = await fetch(`${SUBSCRIPTION_PAYMENT_URL}/${id}/cancel`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SECRET_KEY}`,
        },
      });
      const data = await response.json();
      // update payment plan in db
      await paymentPlan.update({ status: "cancelled" });
      return onSuccess(
        res,
        200,
        "Payment plan cancelled successfully",
        data.data
      );
    } catch (error) {
      return onError(res, 500, "something went wrong. try again");
    }
  }

  // create payment
  static async createPayment(req, res) {
    try {
      const { name, email, company, planId, amount, currency } = req.body;
      const data = await initiatePayment(
        { name, email, company },
        planId,
        amount,
        currency
      );
      return onSuccess(res, 201, "Payment created successfully", data);
    } catch (error) {
      return onError(res, 500, "something went wrong. try again");
    }
  }

  // success payment
  static async successPayment(req, res) {
    try {
      const transaction_id = req.query.transaction_id;

      const result = await fetch(
        `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${SECRET_KEY}`,
          },
        }
      );
      const data = await result.json();

      // if success redirect to payment success page
      if (data.data !== null && data.data.status === "successful") {
        const customers = data?.data?.customer;
        const { email, name, company } = customers;
        const userExist = await Users.findOne({ where: { email } });
        if (!userExist) {
          // Hash passwords

          const password = generator.generate({ length: 10, numbers: true });

          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);

          const newuser = await Users.create({
            isConfirmed: true,
            name,
            email,
            company,
            password: hashedPassword,
          });
          // send email to user
          const url = "https://dsee.netlify.app/#/login";
          paymentConfirmationTemplate(
            newuser,
            url,
            `Hi ${name}, Thank you for subscribing to DSESTIMATION. Your password is ${password} Please click on the link below to login`
          );

          return res.redirect(`${url}`);
        }
        if (userExist) {
          const url = "https://dsee.netlify.app/#/login";
          paymentConfirmationTemplate(
            userExist,
            url,
            `Hi ${name}, Thank you for subscribing to DSESTIMATION. Please click on the link below to login`
          );
          await Trial.update(
            { isTrial: false },
            { where: { userId: userExist.id } }
          );
          return res.redirect(`${url}`);
        }
      } else if (data.data === null) {
        return res.redirect("http://localhost:3006/#/500");
      } else {
        return res.redirect("http://localhost:3006/#/403");
      }
    } catch (error) {
      return res.redirect("http://localhost:3006/#/500");
    }
  }
}
export default PaymentController;
