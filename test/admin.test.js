const Admin=require("../routes/admin");

const { getOrders, ordersStatus } = require("../controllers/adminService");
const { authCheck, adminCheck } = require("../middleware/authCheck");

jest.mock('express',()=>({
  Router:()=>({get:jest.fn(),post:jest.fn(),put:jest.fn()})
}))
  
  describe('/admin', () => {
    it('should find get methods', () => {
      expect(Admin.get).toHaveBeenCalledTimes(1);
      expect(Admin.get).toHaveBeenCalledWith(
        '/admin/orders',
         authCheck,
         adminCheck,
         getOrders
      );
    })
    it('should find put method',()=>{
        expect(Admin.put).toHaveBeenCalledTimes(1);
        expect(Admin.put).toHaveBeenCalledWith(
            "/admin/order-status",
            authCheck,
            adminCheck,
            ordersStatus
        )
     })
  }) 