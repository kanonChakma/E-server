const Product=require("../models/product");
const User= require("../models/user");

const Slugify=require('slugify');
const { default: slugify } = require("slugify");



exports.create= async(req,res)=>{
    try{
     req.body.slug=Slugify(req.body.title);
     const newProduct= await new Product(req.body).save();
     res.json(newProduct);
     }catch(err){
        res.status(400).json({err:err.message});
     }
 }

 exports.listAll= async(req,res)=>{
    try{
        const newProduct= await Product.find({})
        .limit(parseInt(req.params.count))
        .populate("category")
        .populate("subs")
        .sort([["createdAt","desc"]])
        .exec();
        res.json(newProduct);
        }catch(err){
           res.status(400).json({err:err.message});
      }
 }

 exports.remove=async(req,res)=>{
  try{
      const deleted=await Product.findOneAndRemove({
         slug:req.params.slug
      }).exec();
      res.json(deleted);
   }catch(err){
      console.log(err);
      return res.status(400).send("Product deleted failed");
     }
 }

 exports.read=async(req,res)=>{
     let product= await Product.findOne({slug:req.params.slug})
    .populate('category')
    .populate('subs')
    .exec();
    res.json(product)
 }

 exports.update=async(req,res)=>{
   try{
      //it will update slug
      // if(req.body.title){
      //    req.body.slug=Slugify(req.body.title);
      // }
      const updated=await Product.findOneAndUpdate(
         {slug:req.body.slug},
          req.body,
         {new:true}  //For returning updated data
      ).exec();
      res.json(updated);
   }catch(err){
      res.status(400).json({
         err:err.message,
      })
   }
}

//-------------WITH OUT PAGINATION-------
// exports.list=async(req,res)=>{
//    try{
//       const {sort,order,limit}=req.body;
//       const products=await Product.find({})
//       .populate('category')
//       .populate('subs')
//       .sort([[sort,order]])
//       .limit(limit)
//       .exec()
//       res.json(products);
//    }catch(err){
//      console.log(err);
//    }
// }
//---------WITH PAGINATION-------
exports.list=async(req,res)=>{
   try{
      const {sort,order,page}=req.body;
      const currentPage= page|| 1;
      const perPage=4;

      const products=await Product.find({})
      .skip((currentPage-1)*perPage)
      .populate('category')
      .populate('subs')
      .sort([[sort,order]])
      .limit(perPage)
      .exec()
      res.json(products);
   }catch(err){
     console.table(err);
   }
}

exports.totalProduct=async(req,res)=>{
  try{
     const total=await Product.find({})
     .estimatedDocumentCount()
     .exec()
     res.json(total);
  }catch(err){
     console.log(err);
   }
}

exports.starProduct=async(req,res)=>{     
    
  try{
       const product=await Product.findById(req.params.productId).exec();
       const user=await User.findOne({email:req.user.email}).exec();
       const {star}=req.body;
       
       const matchRatting=product.ratings.find((r)=>(
          r.postedBy.toString() === user._id.toString()
       ))

       if(matchRatting === undefined){
            const addRating= await Product.findByIdAndUpdate(
               product._id,
              {
                $push: { ratings:{star,postedBy:user._id}}
              },
            {new:true}  
            ).exec();
            res.json(addRating);
       }else{
         const updateRatting= await Product.updateOne(
            {
              ratings:{$elemMatch:matchRatting},
            },
            {
             $set:{"ratings.$.star":star}
            }
         ).exec() 
         res.json(updateRatting)    
       }
  }catch(err){
     console.log(err);
   }
}

exports.listRelated=async(req,res)=>{
   const product=await Product.findById(req.params.productId).exec();
   const related=await Product.find({
      _id:{$ne: product._id},
      category:product.category,
   })
   .limit(3)
   .populate("category")
   .populate("subs")
   .populate("postedBy")
   .exec()
  res.json(related);
}
//------Searching Product------
const handleQuery=async(req,res,query)=>{
  const product= await Product.find({$text:{$search: query}})
  .populate('category','_id name')
  .populate('subs','_id name')
  .exec()
  res.json(product);
}
//search with price range
const handlePrice=async(req,res,price)=>{
  try{
   const product=await Product.find({
      price:{
         $gte:price[0],
         $lte:price[1]
      },
   })
  .populate('category','_id name')
  .populate('subs','_id name')
  .populate('postedBy',"_id name")
  .exec()
   res.json(product);
  }catch(err){
     console.log(err);
  }
}
const hadnleCategory=async(req,res,category)=>{
   try{
      const produts=await Product.find({category})
      .populate('category','_id name')
      .populate('subs','_id name')
      .populate('postedBy',"_id name")
      .exec()
      res.json(produts);
   }catch(err){
      console.log(err);
   }
}
const handleStar=async(req,res,stars)=>{
   console.log(stars);
    Product.aggregate([
       {
         $project:{
           document:"$$ROOT",
           floorAverage:{
              $floor: {$avg:"$ratings.star"} 
            },
          },
       },
       {$match: {floorAverage: stars}}
    ])
    .limit(12)
    .exec((err,aggregates)=>{
       if(err) console.log(err);
       Product.find({_id:aggregates})
      .populate('category','_id name')
      .populate('subs','_id name')
      .populate('postedBy',"_id name")
      .exec((err,products)=>{
         if(err) console.log("PRODUCT AGGEREGATE Error",err);
         console.log({products})
         res.json(products);
       });
    });
}
const handleSub=async(req,res,sub)=>{
   try{
      const produts=await Product.find({subs:sub})
      .populate('category','_id name')
      .populate('subs','_id name')
      .populate('postedBy',"_id name")
      .exec()
      res.json(produts);
   }catch(err){
      console.log(err);
   }
}
const handleShiping=async(req,res,shipping)=>{
   const produts=await Product.find({shipping})
   .populate('category','_id name')
   .populate('subs','_id name')
   .populate('postedBy',"_id name")
   .exec()
   res.json(produts);
}
const handleBrand=async(req,res,brand)=>{
   const produts=await Product.find({brand})
   .populate('category','_id name')
   .populate('subs','_id name')
   .populate('postedBy',"_id name")
   .exec()
   res.json(produts);
}
const handleColor=async(req,res,color)=>{
   const produts=await Product.find({color})
   .populate('category','_id name')
   .populate('subs','_id name')
   .populate('postedBy',"_id name")
   .exec()
   res.json(produts);
}
exports.searchFilters=async(req,res)=>{
   const{query,price,category,star,sub,shipping,brand,color}=req.body;
   if(query){
      await handleQuery(req,res,query)
   }
   if(price !== undefined){
      await handlePrice(req,res,price)  
    }
   if(category){
     await hadnleCategory(req,res,category)  
   }
   if(star){
      await handleStar(req,res,star)
   }
   if(sub){
      await handleSub(req,res,sub)
   }
   if(shipping){
      await handleShiping(req,res,shipping)
   }
   if(brand){
      await handleBrand(req,res,brand)
   }
   if(color){
      await handleColor(req,res,color)
   }
}