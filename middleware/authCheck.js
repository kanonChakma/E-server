const { firestore } = require('firebase-admin');
const admin=require('../firebase');
const User=require('../models/user');

exports.authCheck=async (req,res,next)=>{ 
   try{
       const firebaseUser=await admin.auth().verifyIdToken(req.headers.authtoken);
       req.user=firebaseUser;
       next();
   }catch(err){
     res.status(401).json({err:"invalid or expired token"})
    }    
};

exports.adminCheck=async (req,res,next) => {
 const {email}=req.user;
 const adminUser=await User.findOne({email:email}).exec();
 if(adminUser.role!=='admin'){
     res.status(403).json({
       err:"Admin Resource,access denaied"
     })
   }else{
     next();
   }   
}



