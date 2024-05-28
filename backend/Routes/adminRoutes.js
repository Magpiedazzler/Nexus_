const express=require("express")
const {userList, adminLogin, appAproval, appBlock, sendComments, adminHeader, fetchAllApps, viewComplaints, fetchFeeddetails, sendNotification, PieChartDetails, BarChartDetails, bannerUpload}=require("../Controllers/adminController")
const adminAuth = require("../Middleware/adminAuth")
const { FetchGames, UtilityApps, allWindowsApp, allLinuxApp, allMacApp, getUserFeedback } = require("../Controllers/appController")
const router=express.Router()
const createMulterInstance=require("../Middleware/multer")
const bannerDetails=createMulterInstance("bannerDetails")

router.post("/adminLogin",adminLogin)
router.post("/approveApp/:id",appAproval)
router.post("/blockApp/:id",appBlock)
router.post("/sendComments/:feedId",adminAuth,sendComments)
router.post("/sendNotification",adminAuth,sendNotification)
router.post("/Upload/",adminAuth,bannerDetails.fields([
    {name:"bannerFile",maxCount:1}
]),bannerUpload)

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

module.exports=router