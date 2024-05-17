import { userInstance } from "../Axios/axiosinstance";

export const userRegister=(values)=>{
    console.log(values)
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

export const userHeader=()=>{
    return userInstance.get("/header")
}

export const getUploadedApps=()=>{
    return userInstance.get("/showApp")
}