const {Header, register, login, appUpload, userFeedback}=require("../Controllers/userController")
const userAuth=require("../Middleware/userAuth")
const createMulterInstance=require("../Middleware/multer")
const express=require("express")
const router=express.Router()
const appDetails=createMulterInstance("AppDetails")
const multer =require("multer")
const {showAllApps} =require("../Controllers/appController")

router.post('/register',register)

router.post('/login',login)

router.post("/upload/:userId",userAuth,appDetails.fields([
    {name:"appfile",maxCount:1},
    {name:"appIcon",maxCount:1},
    {name:"appScreenshots",maxCount:1},
]),appUpload);

router.post('/feedback/:userId',userAuth,userFeedback)

router.get("/header",userAuth,Header)
router.get("/showApp",showAllApps)

module.exports=router