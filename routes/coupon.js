const express=require("express");

const { create,remove,list} = require("../controllers/coupon");
const { authCheck } = require("../middleware/authCheck");
const router=express.Router();


router.post("/coupon",authCheck,create);

router.get("/coupons",list);

router.delete("/coupon/:couponId",authCheck,remove);


module.exports=router;