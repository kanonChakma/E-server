const express=require("express");

const {createPaymentIntent} = require("../controllers/stripeService");
const { authCheck } = require("../middleware/authCheck");
const router = express.Router();


router.post("/create-payment-intent",authCheck,createPaymentIntent);
module.exports=router;