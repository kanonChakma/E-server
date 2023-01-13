const Category=require("../routes/category");
const { authCheck,adminCheck } = require("../middleware/authCheck");
const { create,read,list,update,remove,getSubs} = require("../controllers/categoryService");

jest.mock('express',()=>({
    Router:()=>({get:jest.fn(),post:jest.fn(),put:jest.fn(),delete:jest.fn()})
})) 

describe("Category",()=>{
    it('should find categories method',()=>{
        expect(Category.get).toHaveBeenCalledTimes(3);
        expect(Category.get).toHaveBeenCalledWith(
            '/categories',
            list  
        )
    })
    it('should find category/slug methods',()=>{
        expect(Category.get).toHaveBeenCalledTimes(3);
        expect(Category.get).toHaveBeenCalledWith(
            '/category/:slug',
            read
        )
    })
    it('should find category/subs method',()=>{
        expect(Category.get).toHaveBeenCalledTimes(3);
        expect(Category.get).toHaveBeenCalledWith(
            '/category/subs/:_id',
            getSubs  
        )
    })
    it('should find category method',()=>{
        expect(Category.post).toHaveBeenCalledTimes(1);
        expect(Category.post).toHaveBeenCalledWith(
            '/category',
            authCheck,
            adminCheck,
            create 
        )
    })
    it('should find category/slug method',()=>{
        expect(Category.put).toHaveBeenCalledTimes(1);
        expect(Category.put).toHaveBeenCalledWith(
            '/category/:slug',
            authCheck,
            adminCheck,
            update 
        )
    })
    it('should find category/slug method',()=>{
        expect(Category.delete).toHaveBeenCalledTimes(1);
        expect(Category.delete).toHaveBeenCalledWith(
            '/category/:slug',
            authCheck,
            adminCheck,
            remove 
        )
    })
})