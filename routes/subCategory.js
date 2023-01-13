const express=require("express");

const { authCheck,adminCheck } = require("../middleware/authCheck");

const { create,read,list,update,remove} = require("../controllers/subCategoryService");

const router=express.Router();

router.get('/subs',list);
router.post('/sub',authCheck,adminCheck,create);
router.get('/sub/:slug',read);
router.put('/sub/:slug',authCheck,adminCheck,update);
router.delete('/sub/:slug',authCheck,adminCheck,remove);

module.exports=router;


