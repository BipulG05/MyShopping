const express = require("express");
const router = express.Router();
const {isAuthenticateduser} = require("../middlware/auth");
const { processPayment, sendStripeApiKey } = require("../controllers/paymentController");


router.route("/payment/process").post(isAuthenticateduser,processPayment);
router.route("/stripeApiKey").get(isAuthenticateduser,sendStripeApiKey);

module.exports = router;