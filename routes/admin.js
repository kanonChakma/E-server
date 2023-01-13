const express = require("express");

const { getOrders, ordersStatus } = require("../controllers/adminService");
const { authCheck, adminCheck } = require("../middleware/authCheck");
const router = express.Router();

router.get("/admin/orders",authCheck,adminCheck,getOrders);
router.put("/admin/order-status",authCheck,adminCheck,ordersStatus);

module.exports = router;