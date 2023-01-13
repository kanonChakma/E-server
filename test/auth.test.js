const authRoutes=require("../routes/auth")
const { createOrUpdateuser,currentUser } = require("../controllers/authService");
const { authCheck, adminCheck } = require("../middleware/authCheck");

jest.mock('express',()=>({
    Router:()=>({get:jest.fn(),post:jest.fn(),put:jest.fn()})
}))

describe("/authentication",()=>{
    it("should find create-or-update-user",()=>{
        expect(authRoutes.post).toHaveBeenCalledTimes(3);
        expect(authRoutes.post).toHaveBeenCalledWith(
         "/create-or-update-user",
         authCheck,
         createOrUpdateuser 
        ) 
    })
    it("should find current-user",()=>{
        expect(authRoutes.post).toHaveBeenCalledTimes(3);
        expect(authRoutes.post).toHaveBeenCalledWith(
            "/current-user",
             authCheck,
             currentUser  
        )
    })
    it("should find current-admin",()=>{
        expect(authRoutes.post).toHaveBeenCalledTimes(3);
        expect(authRoutes.post).toHaveBeenCalledWith(
            "/current-admin",
            authCheck,
            adminCheck,
            currentUser 
        )
    })
})