import React, { useState } from 'react'
import './UpdateFile.css'
import { useSelector } from 'react-redux';
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';

export default function UpdateFile() {

  const supportedExtentionRegex=/\.(exe|dmg|app|apk|deb|rpm|msi)$/i;
  const supportedImageExtentionRegex=/\.(jpg|jpeg|png|avif)$/i;
  const userIdentity=useSelector((state)=>state?.user?.value?._id);
  const appId=useParams().id
  console.log(appId,"bjcasbjcbj")
  
  const initialValues={
    appIcon:null,
    appScreenshots:null,
    appFile:null
  };

  const validationSchema={
    appIcon:Yup.mixed()
      .required("* This field is required")
      .test("fileType", "Unsupported file type", (value)=>{
        if(!value) return false;
        return supportedImageExtentionRegex.test(value.name);
      }),
    appfile:Yup.mixed()
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
  };

  const onSubmit=async(values,{resetForm})=>{
    
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
                    <form onSubmit="" id='form3'>
                    <div className="container">
                          <h3>Upload files</h3><br /><br />
                          <label id='upbtn-label1'>Upload app icon </label><br />
                          <div className="uploadButtons">
                            <input type="file"  name='appIcon' id='upbtn1'/><br /><br />
                          </div><br />
                          <label id='upbtn-label1'>upload sample screenshots</label><br />
                          <div className='uploadButtons'>
                            <input type="file" name='appScreenshots' id='upbtn2'/><br /><br />
                          </div><br />
                          <label id='upbtn-label1'>Choose app file</label><br />
                          <div className='uploadButtons'>
                            <input type="file" name='appfile' id='upbtn3'/><br /><br />
                          </div>
                    </div>
                    <input type="submit" id="subbtn" />
                    </form>
            </div>
        </div>
    </section>
        </div>
    </div>
  )
}
