const Coupon=require('../models/coupon');

exports.create =async(req,res)=>{
    console.log(req.body);
  const {name,expiry,discount}=req.body;
 try{
    res.json( await new Coupon({name,expiry,discount}).save());
  }catch(err){
      res.json({status:400,message:err.message});
   }
}

exports.remove =async(req,res)=>{
    try{
     res.json(await Coupon.findByIdAndRemove(req.params.couponId).exec());
    }catch(err){
        res.json({status:404,message:"failed to delete"});
    }
}

exports.list =async(req,res)=>{
  try{
      const coupons= await Coupon.find({}).sort({createdAt:-1}).exec();
      res.json(coupons);
  }catch(err){
      res.json({status:403,message:"failed to load list"});
    }     
}
