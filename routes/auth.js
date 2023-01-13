const express=require("express");

//import controllers
const { createOrUpdateuser,currentUser } = require("../controllers/authService");

//import middleware
const { authCheck, adminCheck } = require("../middleware/authCheck");

//import router
const router = express.Router();

router.post("/create-or-update-user",authCheck,createOrUpdateuser);
router.post("/current-user",authCheck,currentUser)
router.post("/current-admin",authCheck,adminCheck,currentUser)

module.exports=router;
