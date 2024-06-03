const express=require("express")
const {userList, adminLogin, appAproval, appBlock, sendComments, adminHeader, fetchAllApps, viewComplaints, fetchFeeddetails, sendNotification, PieChartDetails, BarChartDetails, bannerUpload, appUploads, getUploadApps, appUpdates}=require("../Controllers/adminController")
const adminAuth = require("../Middleware/adminAuth")
const { FetchGames, UtilityApps, allWindowsApp, allLinuxApp, allMacApp, getUserFeedback } = require("../Controllers/appController")
const router=express.Router()
const createMulterInstance=require("../Middleware/multer")
const bannerDetails=createMulterInstance("bannerDetails")
const appDetails=createMulterInstance("AppDetails")
const appUpdateDetails=createMulterInstance("UpdateDetails")

router.post("/adminLogin",adminLogin)
router.post("/approveApp/:id",appAproval)
router.post("/blockApp/:id",appBlock)
router.post("/sendComments/:feedId",adminAuth,sendComments)
router.post("/sendNotification",adminAuth,sendNotification)
router.post("/Upload/",adminAuth,bannerDetails.fields([
    {name:"bannerFile",maxCount:1}
]),bannerUpload)
router.post("/upload_app/:userId",adminAuth,appDetails.fields([
    {name:"appfile",maxCount:1},
    {name:"appIcon",maxCount:1},
    {name:"appScreenshots",maxCount:1},
]),appUploads);
router.post('/updateFile/:appId',adminAuth,appUpdateDetails.fields([
    {name:"appFile",maxCount:1},
    {name:"appIcon",maxCount:1},
    {name:"appScreenshots",maxCount:1},
]),appUpdates);

router.get("/userlist",userList)
router.get("/adminHeader",adminAuth,adminHeader)
router.get("/allApp",adminAuth,fetchAllApps)
router.get("/viewComplaint",adminAuth,viewComplaints)
router.get("/allGameApp",adminAuth,FetchGames)
router.get("/allUtilityApps",adminAuth,UtilityApps)
router.get("/allWindowsApps",adminAuth,allWindowsApp)
router.get("/allLinuxApps",adminAuth,allLinuxApp)
router.get("/allMacsApps",adminAuth,allMacApp)
router.get("/fetchUserFeedback",adminAuth,getUserFeedback)
router.get("/fetchFeedback/:id",adminAuth,fetchFeeddetails)
router.get("/getPieChartDetails",adminAuth,PieChartDetails)
router.get("/getbarChartDetails",adminAuth,BarChartDetails)
router.get("/getuploadApps/:userId",adminAuth,getUploadApps)

module.exports=router