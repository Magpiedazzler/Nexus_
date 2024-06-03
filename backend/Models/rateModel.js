const mongoose=require("mongoose")

const RatedApps=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    appId:{
        type:String,
        required:true,
    },
    ratingStatus:{
        type:String,
        required:true,
    },
    ratingMessage:{
        type:String,
        required:true,
    },
    // totalRating:{
    //     type:String,
    //     default:'0',
    // }
})

module.exports=new mongoose.model("appRating",RatedApps)