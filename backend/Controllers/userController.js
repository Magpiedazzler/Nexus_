const appModel = require("../Models/appModel")
const userModel=require("../Models/userModel")
const path=require("path")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const userFeedbackModel = require("../Models/userFeedbackModel")
const notificationModel = require("../Models/adminNotificationModel")
const { profile } = require("console")
const { use } = require("../Routes/userRoutes")
const bannerModel = require("../Models/bannerModel")
const { stat } = require("fs")
const maxAge=24*60*60

const createToken=(id)=>{
    return jwt.sign({id},"JWT",{
        expiresIn:maxAge,
    });
};

module.exports.register=async(req,res)=>{
    console.log(req.body,"!!!!!");
    try{
        const{email,password,username,contactNo,secretQuestion,answer}=req.body;

        const emailExist =await userModel.findOne({email:email});
        const contactExist = await userModel.findOne({contactNo:contactNo});
        if(emailExist && contactExist){
            return res.json({message:"Email or contact number already exists", status:false});
        }
        const newUser=new userModel({
            username:username,
            email:email,
            password:password,
            contactNo:contactNo,
            secretQuestion:secretQuestion,
            answer:answer,
        });
        const userDetails = await newUser.save();
        const token = createToken(userModel._id);
        return res.json({
            message:"Account created successfully",
            status:true,
            token,
        });
    }catch(error){
        console.log(error);
        return res.json({message:"Internal server in sign up", status:false});
    }
};

module.exports.forgotpswd = async (req, res) => {
  try {
    const { email, password, secretQuestion, answer } = req.body;

    const user = await userModel.findOne({ email: email });

    if (user) {
      // Check if the secret question and answer match for the same user
      if (user.secretQuestion === secretQuestion && user.answer === answer) {
        const salt = await bcrypt.genSalt();
        const newPassword = await bcrypt.hash(password, salt);
        const updatedUser = await userModel.findOneAndUpdate(
          { email: email },
          { $set: { password: newPassword } },
          { new: true }
        );

        if (updatedUser) {
          return res.json({ message: "Password changed successfully", status: true, data: updatedUser });
        } else {
          return res.json({ message: "Password changing failed", status: false });
        }
      } else {
        return res.json({ message: "Secret question or answer is incorrect!", status: false });
      }
    } else {
      return res.json({ message: "Invalid email address!", status: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", status: false });
  }
};


module.exports.login=async(req,res)=>{
    try{
        console.log(req.body);
        const{username,password}=req.body;

        const emailExist=await userModel.findOne({email:username});
        console.log(emailExist);
        if(emailExist){
            const passwordExist=await bcrypt.compare(password,emailExist.password);
            if(passwordExist){
                const token = createToken(emailExist._id);
                return res.json({
                    user:emailExist,
                    message:"Successfully logged in",
                    status:true,
                    token,
                });
            }else{
                return res.json({message:"Incorrect Password", status:false});
            }
        }else{
            return res.json({message:"Username not found",status:false});
        }  
    }catch(error){
        console.log(error);
    }
};

module.exports.appUpload=async(req,res)=>{
    try {
        const userId=req?.params?.userId
        const extractImageUrl = (fullPath) => {
          const relativePath = path.relative("public/images", fullPath);
          const imageUrl = relativePath.replace(/\\/g, "/");
          return imageUrl;
        };
        const appFile=req.files.appfile.map(file => file.path)
        const appIcon=req.files.appIcon.map(file => file.path)
        const appScreenshots=req.files.appScreenshots.map(file => file.path)
    
        
        const applicationDetails=new appModel({
            userId:userId,
            appName:req.body.appName,
            appDescription:req.body.appDescription,
            apkFile:extractImageUrl(appFile[0]),
            devName:req.body.developerName,
            publisherName:req.body.publisherName,
            Category:req.body.Category,
            OS:req.body.OS,
            appScreenshot:extractImageUrl(appScreenshots[0]),
            appIcon:extractImageUrl(appIcon[0]),
        })
        
        const data=await applicationDetails.save()
        return res.json({message:"App uploaded successfully",status:true,data})
        
      } catch (error) {
        console.log(error);
        return res.json({message:"App uploaded Failed",status:false})
      }
};


module.exports.appUpdate = async (req, res) => {
    try {
      const appId = req.params.appId;
      const extractImageUrl = (fullPath) => {
        const relativePath = path.relative("public/images", fullPath);
        const imageUrl = relativePath.replace(/\\/g, "/");
        return imageUrl;
        };
      // Ensure each file type exists before mapping
      const appFile =  req.files.appFile.map(file => (file.path))
    const appIcon = req.files.appIcon.map(file => (file.path)) 
    const appScreenshots = req.files.appScreenshots.map(file => (file.path))

  
      // Debug log to ensure paths are correct
      console.log({ appFile, appIcon, appScreenshots },"Types");
  
      const updatedApp = await appModel.findOneAndUpdate(
        { _id: appId },
        {
          $set: {
            apkFile: extractImageUrl(appFile[0]),
            appIcon: extractImageUrl(appIcon[0]),
            appScreenshot: extractImageUrl(appScreenshots[0]),
          }
        },
        { new: true }
      );
  console.log(updatedApp,"77777777777777");
      if (updatedApp) {
        return res.json({ message: "App updated successfully", status: true, data: updatedApp });
      } else {
        return res.json({ message: "App updation failed", status: false });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error", status: false });
    }
  };
  

module.exports.Header=async(req,res)=>{
    try{
        const userDetails=req.user;
        return res.json({status:true,user:userDetails});
    }catch(error){
        console.log(error);
        return res.json({message:"Internal server error", status:false});
    }
};

module.exports.userFeedback=async(req,res)=>{
    try{
        const feedbackExists=await userFeedbackModel.findOne({userId:req.params.userId})
        if(feedbackExists){
            return res.json({message:"Your feedback already exists",status:false})
        }else{
            const userFeedback=new userFeedbackModel({
                userId:req.params.userId,
                feedbackStatus:req.body.feedStatus,
                category:req.body.category,
                feedbackComment:req.body.comments.comments,
            });
            const data=await userFeedback.save()
            return res.json({message:"Thank you for your valuable feedback",status:true})
        }
    }catch(error){
        console.log(error)
        return res.json({message:"Unable to send", status:false})
    }
}

module.exports.updateProfile=async(req,res,next)=>{
    try{
        const extractImageUrl=(fullPath)=>{
            const relativePath=path.relative("public/images",fullPath)
            const imageUrl=relativePath.replace(/\\/g,"/")
            return imageUrl
        };
        const userId=req.params.userId
        const updatedUser=await userModel.findOneAndUpdate(
            {_id:userId},
            {
                $set:{
                    username:req.body.epname,
                    contactNo:req.body.epcno,
                    email:req.body.epmail,
                    profileImage:req.file? extractImageUrl(req.file.path):undefined,
                }
            },
            {new:true}
        );
        console.log(updatedUser,"Updated User")
        if(updatedUser){
            res.json({message:"Profile updated successfully",status:true,user:updatedUser})
        }else{
            res.json({message:"No user found or unable to update profile",status:false})
        }
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error",status:false})
    }
};

module.exports.appAddtoUser=async(req,res)=>{
    try{
        const userId=req.body.userId
        const appId=req.body.appId
        const user=await userModel.findOneAndUpdate(
            {_id:userId,downloadedAppsId:{$ne:appId}},
            {$push:{downloadedAppsId:appId}},
            {new:true}
        );
        if(user){
            res.json({message:"App added to user successfully",status:true,user:user})
        }else{
            res.json({message:"App already exists in user's downloaded apps",status:true,user:null})
        }
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error",status:false})
    }
};

module.exports.fetchUserInstalledApps=async(req,res)=>{
    try{
        const downloadedAppsIds=req.user.downloadedAppsId
        console.log(downloadedAppsIds,"fetchUserInstalledApps")
        if(!Array.isArray(downloadedAppsIds)||downloadedAppsIds.length===0){
            return res.json({message:"User has no installed apps",status:true,apps:[]})
        }
        const appIds=downloadedAppsIds.map(appId=>appId.toString())
        const installedApps=await appModel.find({_id:{$in:appIds}})
        res.json({message:"User installed apps fetched successfully",status:true,apps:installedApps})
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"Internal server error",status:false})
    }
}

module.exports.getNotification = async (req, res) => {
  try {
    console.log(req.params.userId, "$$$$$!");
    const userId = req.params.userId;
    const data = await notificationModel.find({
      $or: [{ ReceiverId: userId }, { ReceiverId: null }],
    });
    if (data) {
      return res.json({ message: "Success", data, status: true });
    } else {
      return res.json({
        message: "Unable to fetch notification",
        status: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error", status: false });
  }
};

module.exports.getUploadApps=async(req,res)=>{
    try{
        const userId=req.params.userId;
        const data =await  appModel.find({userId})
        console.log(data,"app data")
        if(data){
            return res.json({message:"success",data,status:true})
        }else{
            return res.json({
                message:"Unable to find apps", status:false,
            });
        }
    }catch(error){
        console.log(error);
        return res.json({ message: "Internal server error", status: false }); 
    }
}

module.exports.getBanner=async(req,res)=>{
    try{
        const data =await bannerModel.find()
        console.log(data,"backendssss")
        if(data){
            return res.json({message:"success",data,status:true})
        }else{
            return res.json({message:"Unable to find banner",status:false})
        }
    }catch(error){
        console.log(error)
        return res.json({message:"Internal server error",status:false})
    }
}



