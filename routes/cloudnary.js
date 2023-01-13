const express=require("express");


const{authCheck,adminCheck}=require("../middleware/authCheck");
const{upload,remove}=require("../controllers/cloudnaryService")

const router=express.Router();

router.post('/uploadimages',authCheck,adminCheck,upload);
router.post('/removeimages', authCheck,adminCheck,remove);
module.exports=router;