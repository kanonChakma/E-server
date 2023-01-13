const Product=require("../models/product");
const User=require("../models/user");
const Cart=require("../models/cart");
const Coupon=require("../models/coupon");
const Stripe=require("stripe")(process.env.STRIPE_SECRET)

exports.createPaymentIntent=async(req,res)=>{
 try{
    const{coupon}=req.body;
    const user= await User.findOne({email:req.user.email}).exec();
    const {cartTotal,totalAfterDiscount}= await Cart.findOne({orderedBy:user._id}).exec();
   
    let paymentTotal=0;
    if(coupon && totalAfterDiscount){
      paymentTotal=totalAfterDiscount*100;
    }
    else{
        paymentTotal=cartTotal*100;
    }

    const paymentIntent= await Stripe.paymentIntents.create({
        amount:paymentTotal,
        currency:"usd"
    })
    res.send({
        clientSecret:paymentIntent.client_secret,
        cartTotal,
        totalAfterDiscount,
        paymentTotal
    })
 }catch(err){
   console.log(err);
   }
}