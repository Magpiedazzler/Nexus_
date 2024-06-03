import React from 'react'
import './AdminUpdateAppFile.css'
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as Yup from "yup"
import { appupdated } from '../../../Services/adminApi';

export default function AdminUpdateAppFile() {
  const supportedExtentionRegex=/\.(exe|dmg|app|apk|deb|rpm|msi)$/i;
  const supportedImageExtentionRegex=/\.(jpg|jpeg|png|avif)$/i;
  const userIdentity=useSelector((state)=>state?.admin?.value?._id);
  const appId=useParams().id
  
  const initialValues={
    appIcon:null,
    appScreenshots:null,
    appFile:null
  };

  const validationSchema=Yup.object({
    appIcon:Yup.mixed()
      .required("* This field is required")
      .test("fileType", "Unsupported file type", (value)=>{
        if(!value) return false;
        return supportedImageExtentionRegex.test(value.name);
      }),
    appFile:Yup.mixed()
      .required("* This field is required")
      .test("fileType", "Unsupported file type", (value)=>{
        if(!value)  return false;
        return supportedExtentionRegex.test(value.name);
      }),
    appScreenshots:Yup.mixed()
      .required("* This field is required")
      .test("fileType", "Unsupported file type", (value)=>{
        if(!value) return false;
        return supportedImageExtentionRegex.test(value.name);
    }),
  });

  const onSubmit=async(values,{resetForm})=>{
    const {data}=await appupdated(values,appId);
    console.log(data,"6546654654")
    console.log(data?.status,"resetform")
    if(data?.status){
      console.log("hai data.syuas");
      resetForm();
      const appApk=document.getElementById("upbtn3");
      const appShots=document.getElementById("upbtn2");
      const appIcon=document.getElementById("upbtn1");
      if(appApk && appShots && appIcon){
        appApk.value="";
        appShots.value="";
        appIcon.value="";
      }
      toast.success(data?.message);
    }else{
      toast.error(data?.message);
    }
  }

  const formik=useFormik({
    initialValues,
    onSubmit,
    validationSchema
  })
  return (
    <div>
      <div class="div2" id='div2'>
    <section>
        <div class="container">
            <div class="row">
                    <h4 id='uh'>Update APPLICATION</h4>
                    <form onSubmit={formik.handleSubmit} id='form3'>
                    <div className="container">
                          <h3>Upload files</h3><br /><br />
                          <label id='upbtn-label1'>Upload app icon </label><br />
                          <div className="uploadButtons">
                            <input type="file"  name='appIcon' id='upbtn1'
                            onBlur={formik.handleBlur}
                            onChange={(event)=>formik.setFieldValue("appIcon",event.currentTarget.files[0])}/><br /><br />
                            {formik.touched.appFile && formik.errors.appFile ?(
                                <p className='text-danger errorMsg' style={{fontSize:"12px",margin:"0px",position:"relative",top:"0px"}}>
                                  {formik.errors.appFile}
                                </p>
                              ):null}
                          </div><br />
                          <label id='upbtn-label1'>upload sample screenshots</label><br />
                          <div className='uploadButtons'>
                            <input type="file" name='appScreenshots' id='upbtn2'
                            onChange={(event)=>formik.setFieldValue("appScreenshots",event.currentTarget.files[0])}
                            onBlur={formik.handleBlur}/><br /><br />
                            {formik.touched.appScreenshots && formik.errors.appScreenshots ?(
                                <p className='text-danger errorMsg' style={{fontSize:"12px",margin:"0px",position:"relative",top:"0px"}}>
                                  {formik.errors.appScreenshots}
                                </p>
                              ):null}
                          </div><br />
                          <label id='upbtn-label1'>Choose app file</label><br />
                          <div className='uploadButtons'>
                            <input type="file" name='appfile' id='upbtn3'
                            onChange={(event)=>formik.setFieldValue("appFile",event.currentTarget.files[0])}
                            onBlur={formik.handleBlur}/><br /><br />
                            {formik.touched.appFile && formik.errors.appFile ?(
                                <p className='text-danger errorMsg' style={{fontSize:"12px",margin:"0px",position:"relative",top:"0px"}}>
                                  {formik.errors.appFile}
                                </p>
                              ):null}
                          </div>
                    </div>
                    <button type="submit" id="subbtn">Submit</button>
                    </form>
            </div>
        </div>
    </section>
        </div>
    </div>
  )
}
