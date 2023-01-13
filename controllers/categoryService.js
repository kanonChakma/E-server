const Category=require('../models/category');
const SubCategory=require('../models/subCategory');
const Slugify=require('slugify');
const Product = require('../models/product');

exports.create =async(req,res) => {
  const {name, images}=req.body;
 try{
    const category= await new Category({name,images,slug:Slugify(name)}).save();
    res.json(category);
  }catch(err){
      res.json({status:400,message:err.message});
   }
}

exports.read =async(req,res)=>{
  try{
    const category=await Category.findOne({slug:req.params.slug}).exec();
    const product=await Product.find({category:category})
    .populate('category')
    .exec();
    res.json({category,product});
  }catch(err){
      res.json({status:403,message:"failed to load data"})
   }
}

exports.update =async(req,res) => {
    try{
        const {name, images}=req.body;
        const category=await Category.findOneAndUpdate(
            {slug:req.params.slug},
            {name,images,slug:Slugify(name)},
            {new: true}).exec();
        res.json(category);
       }catch(err){
           res.json({status:404,message:"failed to update data"});
    }
}

exports.remove =async(req,res) => {
    try{
     const category=await Category.findOneAndDelete({slug:req.params.slug}).exec();
     res.json(category);
    }catch(err){
        res.json({status:404,message:"failed to delete"});
    }
}

exports.list =async(req,res) => {
  try{
      console.log("request find brother");
      const category= await Category.find({}).sort({createdAt:-1}).exec();
      res.json(category);
  }catch(err){
      res.json({status:403,message:"failed to load list"});
   }       
}
//--------------------For SubCategories------------------
exports.getSubs =async(req,res)=>{
    SubCategory.find({parent:req.params._id}).exec((err,subs)=>{
        if(err) console.log(err);
        res.json(subs);
    })
}
