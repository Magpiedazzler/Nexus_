const mongoose=require("mongoose")
const bcrypt=require("bcrypt")

const bannerSchema=new mongoose.Schema({
    bannerFile:{
        type:String,
        required:true
    },
})

module.exports=new mongoose.model("bannerDetails",bannerSchema)