import React, { useEffect } from 'react'
import './AdminLogin.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from "yup"
import { adminLogin } from '../../../Services/adminApi'
import { setAdminDetails } from '../../../Features/setAdmin'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import coverImage from './Designer.png';

export default function AdminLogin() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const admin=useSelector((state)=>state.admin.value)

  useEffect(()=>{
    if(admin){
      navigate("/admin/home")
    }
  })

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("* Invaild email format")
      .required("* This field is required")
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "* Invalid email address"
      ),
    password: Yup.string().required("* This field is required"),
  });

  const onSubmit=async (values)=>{
    const {data}=await adminLogin(values)
    console.log(data.adminDetails)
    if(data.status){
      dispatch(setAdminDetails(data?.adminDetails))
      localStorage.setItem("adminJWT",data.token)
      toast.success(data.message)
      navigate("admin/home")
    }else{
      toast.error(data.message)
    }
    try{}catch(error){}
  };

  const formik=useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} id="adform1">
      <div className="container">
        <div className="row">
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
          <img src={coverImage} alt="Cover image" id='coverimage'/>
          </div>
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <div id='loginzz'>
          <h1 id='adt1'>Admin Login</h1><br /><br />
      <input type="text" name="email" id="adusername" placeholder='Username'
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.email}/>
      {formik.touched.email && formik.errors.email ? (
          <p className="text-danger" style={{ fontSize: "12px", margin: "0px" }}>
            {formik.errors.email}
          </p>
        ) : null}
      <br /><hr id='adline'/><br />
      <input type="password" name="password" id="adpswd" placeholder='Password'
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.password}/>
      {formik.touched.password && formik.errors.password ? (
          <p className="text-danger" style={{ fontSize: "12px", margin: "0px" }}>
            {formik.errors.password}
          </p>
        ) : null}
      <br /><hr id='line'/><br />
      <button type="submit" id="adsubmit">Login</button><br/>
      </div>
          </div>
        </div>
      </div>
      
      </form>
    </div>
  )
}
