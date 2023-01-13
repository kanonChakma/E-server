const Product=require("../routes/product");

const{authCheck,adminCheck}=require("../middleware/authCheck");
const{searchFilters,update,create,listAll,remove,read,list,totalProduct, starProduct, listRelated}=require("../controllers/productService");

jest.mock('express',()=>({
    Router:()=>({get:jest.fn(),post:jest.fn(),put:jest.fn(),delete:jest.fn()})
})) 
describe("Product",()=>{
   
    it('should find product method',()=>{
        expect(Product.post).toHaveBeenCalledTimes(3);
        expect(Product.post).toHaveBeenCalledWith(
            '/product',
            authCheck,
            adminCheck,
            create
        )
    })
    it('should find product/total method',()=>{
        expect(Product.get).toHaveBeenCalledTimes(4);
        expect(Product.get).toHaveBeenCalledWith(
            '/product/total',
            totalProduct
        )
    })
    it('should find product/count method',()=>{
        expect(Product.get).toHaveBeenCalledTimes(4);
        expect(Product.get).toHaveBeenCalledWith(
            '/products/:count',
            listAll
        )
    })
    it('should find product/slug method',()=>{
        expect(Product.delete).toHaveBeenCalledTimes(1);
        expect(Product.delete).toHaveBeenCalledWith(
            '/product/:slug', 
            authCheck,
            adminCheck,
            remove
        )
    })
    it('should find product/slug method',()=>{
        expect(Product.get).toHaveBeenCalledTimes(4);
        expect(Product.get).toHaveBeenCalledWith(
            '/product/:slug', 
            read
        )
    })
    it('should find product/slug method',()=>{
        expect(Product.put).toHaveBeenCalledTimes(2);
        expect(Product.put).toHaveBeenCalledWith(
            '/product/:slug',
            authCheck,
            adminCheck,
            update
        )
    })
    it('should find products method',()=>{
        expect(Product.post).toHaveBeenCalledTimes(3);
        expect(Product.post).toHaveBeenCalledWith(
            '/products',
             list
        )
    })
    it('should find /product/star/:productId method',()=>{
        expect(Product.put).toHaveBeenCalledTimes(2);
        expect(Product.put).toHaveBeenCalledWith(
            '/product/star/:productId',
            authCheck,
            starProduct
        )
    })
    it('should find /product/star/:productId method',()=>{
        expect(Product.get).toHaveBeenCalledTimes(4);
        expect(Product.get).toHaveBeenCalledWith(
            '/product/related/:productId',
            listRelated
        )
    })
    it('should find /search/filters method',()=>{
        expect(Product.post).toHaveBeenCalledTimes(3);
        expect(Product.post).toHaveBeenCalledWith(
            '/search/filters',searchFilters
        )
    })
})