const express=require("express");

const {addCashpayment,addWhishList,getWhisList,updateWhisList,userCart,userGetCart,removeCart,saveAdress,applyCoupon,createOrder,getOrder } = require("../controllers/userService");
const { authCheck } = require("../middleware/authCheck");
const router=express.Router();


router.post("/user/cart",authCheck,userCart);
router.get("/user/cart",authCheck,userGetCart);
router.delete("/user/cart",authCheck,removeCart);
router.post("/user/address",authCheck,saveAdress);

router.post("/user/cart/coupon",authCheck,applyCoupon);
router.post("/user/order",authCheck,createOrder);
router.get("/user/order",authCheck,getOrder);

router.post("/user/wishList",authCheck,addWhishList);
router.get("/user/wishList",authCheck,getWhisList);
router.put("/user/whisList/:productId",authCheck,updateWhisList);

router.post("/user/cash-payment",authCheck,addCashpayment);
module.exports=router;