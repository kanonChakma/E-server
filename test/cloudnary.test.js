const Cloudnary=require("../routes/cloudnary");
const{authCheck,adminCheck}=require("../middleware/authCheck");
const{upload,remove}=require("../controllers/cloudnaryService");

jest.mock('express',()=>({
    Router:()=>({get:jest.fn(),post:jest.fn(),put:jest.fn(),delete:jest.fn()})
})) 
describe("cloudnary",()=>{
   
    it('should find uploadimages method',()=>{
        expect(Cloudnary.post).toHaveBeenCalledTimes(2);
        expect(Cloudnary.post).toHaveBeenCalledWith(
            '/uploadimages',
            authCheck,
            adminCheck,
            upload
        )
    })
    it('should find removeimages method',()=>{
        expect(Cloudnary.post).toHaveBeenCalledTimes(2);
        expect(Cloudnary.post).toHaveBeenCalledWith(
            '/removeimages',
            authCheck,
            adminCheck,
            remove
        )
    })
   
})