import { adminInstance } from "../Axios/axiosinstance";

export const adminLogin=(values)=>{
    return adminInstance.post("/adminLogin",{...values})
}

export const userBlock=(userId)=>{
    return adminInstance.post(`/userblock/${userId}`)
}

export const approveApp=(appId)=>{
    return adminInstance.post(`/approveApp/${appId}`)
}

export const blockApp=(appId)=>{
    return adminInstance.post(`/blockApp/${appId}`)
}

export const sendComments=(value,feedId,userId)=>{
    return adminInstance.post(`/sendComments/${feedId}`,{value,userId})
}

export const sendNotification=(data)=>{
    return adminInstance.post("/sendNotification",{...data})
}

export const bannerUpload=(values)=>{
    return adminInstance.post(`/upload/`,{...values},{headers:{"Content-Type":"multipart/form-data"}})
}

export const appregistration=(values,userID)=>{
    console.log(values,"8888888888888888 ")
    return adminInstance.post(`/upload_app/${userID}`,{...values},{headers:{"content-Type":"multipart/form-data"}})
}

export const appupdated=(values,appId)=>{
    console.log(values,"jghjgajhgjgasjhdgjh")
    return adminInstance.post(`//update_appfile/${appId}`,{...values},{headers:{"content-Type":"multipart/form-data"}})
}


//GET METHODS


export const userlist=()=>{
    return adminInstance.get("/userlist")
}

export const adminHeader=()=>{
    return adminInstance.get("/adminHeader")
}

export const totalApplications=()=>{
    return adminInstance.get("/allApp")
}

export const viewCompliant=()=>{
    return adminInstance.get("/viewComplaint")
}

export const fetchAllGames=()=>{
    return adminInstance.get("/allGameApp")
}

export const fetchAllUtilityApps=()=>{
    return adminInstance.get("/allUtilityApps")
}

export const fetchAllWindowsApps=()=>{
    return adminInstance.get("/allwindowsApps")
}

export const fetchAllLinuxApps=()=>{
    return adminInstance.get("/allLinuxApps")
}

export const fetchAllMacApps=()=>{
    return adminInstance.get("/allMacsApps")
}

export const fetchUserFeedback=()=>{
    return adminInstance.get("/fetchUserFeedback")
}

export const fetchFeedDetails=(id)=>{
    console.log(id,"^^^^^");
    return adminInstance.get(`/fetchFeedback/${id}`)
}

export const getPieChartDetails=()=>{
    return adminInstance.get("/getPieChartDetails")
}

export const getBarChartDetails=()=>{
    return adminInstance.get("/getbarChartDetails")
}

export const getadminUploadApps=(userId)=>{
    return adminInstance.get(`/getuploadapps/${userId}`)
}


