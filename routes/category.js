const express=require("express");

const { authCheck,adminCheck } = require("../middleware/authCheck");

const { create,read,list,update,remove,getSubs} = require("../controllers/categoryService");

const router=express.Router();

router.get('/categories',list);
router.post('/category',authCheck,adminCheck,create);
router.get('/category/:slug',read);
router.put('/category/:slug',authCheck,adminCheck,update);
router.delete('/category/:slug',authCheck,adminCheck,remove);
router.get('/category/subs/:_id',getSubs);
module.exports=router;


