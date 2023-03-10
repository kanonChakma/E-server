const cloudinary = require('cloudinary');

cloudinary.config({ 
    cloud_name: process.env.CLOUNARY_CLOUD_NAME, 
    api_key: process.env.CLOUNARY_API_KEY, 
    api_secret: process.env.CLOUNARY_API_SCRET,
 });

exports.upload=async (req,res)=>{
  const result=await cloudinary.uploader.upload(req.body.image,{
    public_id: `${Date.now()}`,
    resource_type:"auto"
   })
   res.json({
       public_id:result.public_id,
       url:result.secure_url,
    });
};

exports.remove=(req,res)=>{
    let image_id=req.body.public_id;
    cloudinary.uploader.destroy(image_id,(err,result)=>{
        if(err) return res.json({success:false,err});
        res.json("ok")              
    })
 }
