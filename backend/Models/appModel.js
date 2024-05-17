const mongoose=require("mongoose")
const bcrypt =require("bcrypt")

const appSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    appName:{
        type:String,
        required:true,
    },
    appDescription:{
        type:String,
        required:true,
    },
    devName:{
        type:String,
        required:true,
    },
    publisherName:{
        type:String,
        required:true,
    },
    Category:{
        type:String,
        required:true,
    },
    OS:{
        type:String,
        required:true
    },
    appIcon:{
        type:String,
        required:true,
    },
    appScreenshot:{
        type:String,
        required:true,
    },
    apkFile:{
        type:String,
        required:true,
    },
    verified:{
        type:String,
        required:false,
    },
    date:{
        type:Date,
        default:Date.now,
    },
});

module.exports=new mongoose.model("app",appSchema);