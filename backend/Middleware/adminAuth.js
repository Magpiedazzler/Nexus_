const jwt=require("jsonwebtoken")
const adminModel=require("../Models/adminModel")

module.exports=async (req,res,next)=>{
    try{
        const authHeader=req.headers.authorization
        const authToken=authHeader.replace(/^Bearer\s+/i,"")
        if(!authToken)
            return res.json({
                loginfail:true,
                status:false,
                message:"No auth token",
            });
        const decoded=jwt.verify(authToken,"adminJWT")
        const admin=await adminModel.findOne({_id:decoded.id})
        if(!admin)
            return res.json({
            loginfail:true,
            status:false,
            message:"Unauthorized token",
            });
        req.admin=admin
        next()
    }catch(error){
        return res.json({
            message:"Unauthorized access",
            status:false,
            loginfail:true,
        });
    }
};