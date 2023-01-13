const User = require("../models/user");

exports.createOrUpdateuser=async(req,res) => {
   const {name,email,picture}=req.user;
   const user = await User.findOneAndUpdate({email},{name:email.split('@')[0],email},{new: true})
   
   if(user) {
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name:email.split('@')[0],
      picture
    },{}).save();
    res.json(newUser);
   }
}

exports.currentUser = async(req,res) => {
  const user = await User.findOne({email:req.user.email}).exec((err,user) => {
    if(err) throw new Error(err)
    res.json(user);
    })
}
