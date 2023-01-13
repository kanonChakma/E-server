const Coupon=require("../routes/coupon");
const { create,remove,list} = require("../controllers/coupon");
const { authCheck } = require("../middleware/authCheck");

jest.mock('express',()=>({
    Router:()=>({get:jest.fn(),post:jest.fn(),put:jest.fn(),delete:jest.fn()})
})) 
describe("Coupon",()=>{
   
    it('should find coupon method',()=>{
        expect(Coupon.post).toHaveBeenCalledTimes(1);
        expect(Coupon.post).toHaveBeenCalledWith(
            "/coupon",
            authCheck,
            create
        )
    })
    it('should find coupons method',()=>{
        expect(Coupon.get).toHaveBeenCalledTimes(1);
        expect(Coupon.get).toHaveBeenCalledWith(
            "/coupons",
            list
        )
    })
    it('should find coupons/couponId method',()=>{
        expect(Coupon.delete).toHaveBeenCalledTimes(1);
        expect(Coupon.delete).toHaveBeenCalledWith(
            "/coupon/:couponId",
            authCheck,
            remove
        )
    })
})