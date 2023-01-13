const express=require("express");


const{authCheck,adminCheck}=require("../middleware/authCheck");
const{searchFilters,update,create,listAll,remove,read,list,totalProduct, starProduct, listRelated}=require("../controllers/productService");

const router=express.Router();

router.post('/product',authCheck,adminCheck,create);
router.get('/product/total',totalProduct);

router.get('/products/:count',listAll);
router.delete('/product/:slug', authCheck,adminCheck,remove);
router.get('/product/:slug',read);
router.put('/product/:slug',authCheck,adminCheck,update);
router.post('/products',list);

//------for ratting-------
router.put('/product/star/:productId',authCheck,starProduct);

//------for related Product----
router.get('/product/related/:productId',listRelated)

//for searching
router.post('/search/filters',searchFilters)
module.exports=router;
