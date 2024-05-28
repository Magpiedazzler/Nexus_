import { userInstance } from "../Axios/axiosinstance";

export const userRegister=(values)=>{
    console.log(values,"service")
    return userInstance.post("/register",{...values})
}

export const login=(values)=>{
    console.log(values,"8888888888888s    LOGIJN")
    return userInstance.post("/login",{...values})
}

export const appreg=(values,userID)=>{
    console.log(values,"8888888888888888 ")
    return userInstance.post(`/upload/${userID}`,{...values},{headers:{"content-Type":"multipart/form-data"}})
}

export const sendFeedback=(feedStatus,category,comments,userId)=>{
    console.log(feedStatus,category,comments,userId)
    return userInstance.post(`/feedback/${userId}`,{feedStatus,category,comments})
}

export const updateUserProfile=(values,userId)=>{
    return userInstance.post(`/profileUpdation/${userId}`,{...values},{headers:{"content-Type":"multipart/form-data"}})
}

export const appAddtoProfile = (userId, appId) => {
    return userInstance.post('/addApptoUser',{userId,appId});
  }
  
export const appReport=(userId,appId,values)=>{
    return userInstance.post('/report',{userId,appId,...values})
}

export const addToWishlist=(userId,values)=>{
    return userInstance.post(`/addToWishist/${userId}`,{...values})
}

export const userHeader=()=>{
    return userInstance.get("/header")
}

export const getUploadedApps=()=>{
    return userInstance.get("/showApp")
}

export const getUtilityApps=()=>{
    return userInstance.get("/getUtilityApp")
}

export const getGameApps=()=>{
    return userInstance.get("/getGamesApp")
}

export const getUserDetails=()=>{
    return userInstance.get("/header")
}

export const getUserInstalledApps=()=>{
    return userInstance.get("/userInstalledApp")
}

export const getSelectedAppsDetails=(appId)=>{
    return userInstance.get(`/selectedAppDetails/${appId}`)
}

export const getWishlistApps=()=>{
    return userInstance.get('/getWishlistApps')
}

export const getAdminFeedComment=(userId)=>{
    return userInstance.get(`/getfeedComment/${userId}`)
}

export const getNotification=(userId)=>{
    return userInstance.get(`/getnotification/${userId}`)
}

export const getUploadApps=(userId)=>{
    return userInstance.get(`/getuploadapps/${userId}`)
}

export const getBanner=()=>{
    return userInstance.get(`/getbanner`)
}