const mongoose=require("mongoose")

const RatedApps=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    appId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    username:{
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
})

module.exports=new mongoose.model("appRating",RatedApps)