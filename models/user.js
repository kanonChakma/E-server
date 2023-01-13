const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema;

const userShema=new mongoose.Schema({
    name:String,
    email:{
        type:String,
        required: true,
        index:true
    },
    role:{
        type:String,
        default: "user"
    },
    cart:{
        type:Array,
        default: []
     },
    address:String,
    wishList:[{
        type:ObjectId,
        ref:"Product"
    }],
 },
{timestamps: true}
);

module.exports=mongoose.model("User",userShema);

