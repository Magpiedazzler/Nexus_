import React from 'react'
import './Upload.css'
//import {Link,useNavigate} from "react-router-dom"
import * as Yup from 'yup'
import {useFormik} from 'formik'
import { appreg } from '../../../Services/userApi'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export default function Upload() {

  const supportedExtentionRegex=/\.(exe|dmg|app|apk|deb|rpm|msi)$/i;
  const supportedImageExtentionRegex=/\.(jpg|jpeg|png|avif)$/i;
  const userIdentity=useSelector((state)=>state?.user?.value?._id);

  const initialValues={
    appName:"",
    appDescription:"",
    developerName:"",
    publisherName:"",
    Category:"",
    OS:"",
    appIcon:null,
    appScreenshots:null,
    appfile:null,
  };

  const validationSchema=Yup.object({
    appName:Yup.string()
      .min(3,"* Name must be atleast 3 charecters long")
      .matches(/^[A-Za-z]+$/,"* Name must only contain charecters")
      .required("* This field is required"),
    appDescription:Yup.string()
      .min(15,"* Description must be atleast 10 charecters long")
      .required("* This field is required"),
    developerName:Yup.string()
      .required("* This field is required")
      .min(3,"* Name must be atleast 3 charecters long"),
      //.matches(/^[A-Za-z]+$/,"* Name must only contain charecters"),
    publisherName:Yup.string()
      .required("* This field is required")
      .min(3,"* Name must be atleast 3 charecters long"),
      //.matches(/^[A-Za-z]+$/,"* Name must only contain charecters"),
    Category:Yup.string()
      .required("* This field is required"),
    OS:Yup.string()
      .required("This field is required"),
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
  });

  const onSubmit=async(values,{resetForm})=>{
    console.log(values,"1212121212")
    const {data}=await appreg(values,userIdentity);
    if(data?.status){
      resetForm();
      const appApk=document.getElementById("appfile");
      const appShots=document.getElementById("screenshots");
      const appIcon=document.getElementById("appicon");
      if(appApk && appShots && appIcon){
        appApk.value="";
        appShots.value="";
        appIcon.value="";
      }
      toast.success(data?.message);
    }else{
      toast.error(data?.message);
    }
  };

  const formik =useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div>

        <div class="div2" id='div2'>
    <section>
        <div class="container">
            <div class="row">
                    <h4 id='uh'>UPLOAD YOUR APPLICATION</h4>
                    <form onSubmit={formik.handleSubmit} id='form3'>
                    <div className="container">
                      <div className="row">
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" id='basic'>
                          <h3>Basic Details</h3><br /><br />
                          <input type="text" name='appName' id='appname' placeholder='Application Name' 
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.appName}/>
                          <br /><hr id='hr1_1'/><br />
                          {formik.touched.appName && formik.errors.appName ?(
                            <p className='text-danger errorMsg' style={{fontSize:"12px",margin:"0px",position:"relative",top:"-50px"}}>
                              {formik.errors.appName}
                            </p>
                          ):null}
                          <textarea name="appDescription" id="desc" cols="30" rows="10" placeholder='Description of the Application'
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.appDescription}></textarea>
                          <br /><hr id='hr2'/><br />
                          {formik.touched.appDescription && formik.errors.appDescription ?(
                            <p className='text-danger errorMsg' style={{fontSize:"12px",margin:"0px",position:"relative",top:"-75px"}}>
                              {formik.errors.appDescription}
                            </p>
                          ):null}
                          <input type="text" name="developerName" id="devname" placeholder='Developer name'
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.developerName}/>
                          <br /><hr id='hr1'/><br />
                          {formik.touched.developerName && formik.errors.developerName ?(
                            <p className='text-danger errorMsg' style={{fontSize:"12px",margin:"0px",position:"relative",top:"-90px"}}>
                              {formik.errors.developerName}
                            </p>
                          ):null}
                          <input type="text" name="publisherName" id="publname" placeholder='Publisher name'
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.publisherName}/>
                          <br /><hr id='hr1'/><br />
                          {formik.touched.publisherName && formik.errors.publisherName ?(
                            <p className='text-danger errorMsg' style={{fontSize:"12px",margin:"0px",position:"relative",top:"-90px"}}>
                              {formik.errors.publisherName}
                            </p>
                          ):null}
                          <select name="Category" id="category"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.Category}>
                          <option value="">Choose category</option>
                            <option value="Productivity">Productivity</option>
                            <option value="Social Networking">Social Networking</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Communication">Communication</option>
                            <option value="Education">Education</option>
                            <option value="Health and Fitness">Health and Fitness</option>
                            <option value="Travel">Travel</option>
                            <option value="Finance">Finance</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Game">Game</option>
                            <option value="Utilities">Utilities</option></select><br /><hr id='hr1'/><br />
                            {formik.touched.Category && formik.errors.Category ?(
                              <p className='text-danger errorMsg' style={{fontSize:"12px",margin:"0px",position:"relative",top:"-90px"}}>
                                {formik.errors.Category}
                              </p>
                            ):null}
                            <select name="OS" id="os"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.OS}>
                          <option value="">Choose OS</option>
                            <option value="Windows">Windows</option>
                            <option value="Linux">Linux</option>
                            <option value="MAC">MAC</option></select><br /><hr id='hr1'/><br />
                            {formik.touched.OS && formik.errors.OS ?(
                              <p className='text-danger errorMsg' style={{fontSize:"12px",margin:"0px",position:"relative",top:"-90px"}}>
                                {formik.errors.OS}
                              </p>
                            ):null}
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" id='basic1'>
                          <h3>Upload files</h3><br /><br />
                          <label id='upbtn-label1'>Upload app icon </label><br />
                          <div className="uploadButtons">
                            <input type="file"  name='appIcon' id='upbtn1'
                            onChange={(event)=>formik.setFieldValue("appIcon",event.currentTarget.files[0])}
                            onBlur={formik.handleBlur}/><br /><br />
                            {formik.touched.appIcon && formik.errors.appIcon ?(
                                <p className='text-danger errorMsg' style={{fontSize:"12px",margin:"0px",position:"relative",top:"0px"}}>
                                  {formik.errors.appIcon}
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
                            onChange={(event)=>formik.setFieldValue("appfile",event.currentTarget.files[0])}
                            onBlur={formik.handleBlur}/><br /><br />
                            
                            {formik.touched.appfile && formik.errors.appfile ?(
                                <p className='text-danger errorMsg' style={{fontSize:"12px",margin:"0px",position:"relative",top:"0px"}}>
                                  {formik.errors.appfile}
                                </p>
                              ):null}
                            </div>
                        </div>
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
