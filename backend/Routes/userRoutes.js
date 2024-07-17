const {Header, register, login, appUpload, userFeedback, updateProfile, appAddtoUser, fetchUserInstalledApps, getNotification, getUploadApps, getBanner, appUpdate, forgotpswd}=require("../Controllers/userController")
const userAuth=require("../Middleware/userAuth")
const createMulterInstance=require("../Middleware/multer")
const userProfileImage = createMulterInstance("UserProfileImages");
const express=require("express")
const router=express.Router()
const appDetails=createMulterInstance("AppDetails")
const appUpdateDetails=createMulterInstance("UpdateDetails")
const multer =require("multer")
const {showAllApps, getWishlistApp, appReport, addToWishlist, UtilityApps, GameApps, selectedApps, appRating, review} =require("../Controllers/appController")
const { fetchFeedComment } = require("../Controllers/adminController")

router.post('/register',register)
router.post('/forgotpswd',forgotpswd)
router.post('/login',login)
router.post("/upload/:userId",userAuth,appDetails.fields([
    {name:"appfile",maxCount:1},
    {name:"appIcon",maxCount:1},
    {name:"appScreenshots",maxCount:1},
]),appUpload);

router.post('/updateFile/:appId',userAuth,appUpdateDetails.fields([
    {name:"appFile",maxCount:1},
    {name:"appIcon",maxCount:1},
    {name:"appScreenshots",maxCount:1},
]),appUpdate);

router.post('/feedback/:userId',userAuth,userFeedback)
router.post("/profileUpdation/:userId",
    userAuth,
    userProfileImage.single("profileImage"),
    updateProfile
)
router.post("/addApptoUser",userAuth,appAddtoUser)
router.post("/report",userAuth,appReport)
router.post("/rating",userAuth,appRating)
router.post("/addToWishist/:userId",userAuth,addToWishlist)

router.get("/header",userAuth,Header)
router.get("/showApp",showAllApps)
router.get("/getUtilityApp",UtilityApps)
router.get("/getGamesApp",GameApps)
router.get("/userInstalledApp",userAuth,fetchUserInstalledApps)
router.get("/selectedAppDetails/:appId",userAuth,selectedApps)
router.get("/reviewDetails/:appId",userAuth,review)
router.get("/getWishlistApps",userAuth,getWishlistApp)
router.get("/getfeedComment/:userId",userAuth,fetchFeedComment)
router.get("/getnotification/:userId", userAuth, getNotification);
router.get("/getuploadApps/:userId",userAuth,getUploadApps)
router.get("/getbanner",getBanner)

module.exports=router