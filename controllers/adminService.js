const Order=require("../models/order");
const User = require("../models/user");

exports.getOrders=async(req,res)=>{
  const orders=await Order.find({})
   .sort("-createdAt")
   .populate("products.product")
   .exec()
   
   res.json(orders)
}
exports.ordersStatus=async(req,res)=>{
    const{orderId,orderStatus}=req.body;
    const updated=await Order.findByIdAndUpdate(orderId,{orderStatus},{new:true}).exec(); 
    res.json(updated);
}