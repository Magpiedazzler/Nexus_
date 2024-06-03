import React from 'react'
import './ForgotPassword.css'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import { forgotpswd } from '../../../Services/userApi'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'

export default function ForgotPassword() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const initialValues={
    email:"",
    secretQuestion:"",
    answer:"",
    password:"",
    confirmPassword:"",
  }

  const validationSchema=Yup.object({
    email:Yup.string()
    .email("* Invalid email format")
    .required("* This fiels id required"),
  secretQuestion:Yup.string()
    .notOneOf(["Choose Question"],"* This field is required")
    .required("* This filed is required"),
  answer:Yup.string()
    .required("* This field is required"),
  password:Yup.string()
    .min(6,"* Password must be atleast 6 charecters long")
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\/,.<>/?]).*$/,
    "* Password must be atleast one capital letter and one special charecter")
    .required("* This field is required"),
  confirmPassword:Yup.string()
    .oneOf([Yup.ref("password"),null],"* Passwords must match")
    .required("* This field is required"),
  })

  const onSubmit=async(values,{resetForm})=>{
    try{
      const data=await forgotpswd(values)
      if(data.data.status){
        toast.success("Password changed successfully")
        resetForm()
        navigate("/login")
      }else{
        toast.error("Invalid user")
      }
    }catch(error){
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  }

  const formik=useFormik({
    initialValues,
    onSubmit,
    validationSchema
  })
  return (
    <div>
      <form onSubmit={formik.handleSubmit} id="fform1">
      <h1 id='fpt1'>Forgot Password</h1><br /><br />
      <input type="text" name="email" id="username" placeholder='email'
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
      value={formik.values.email}/>
      <br /><hr id='line'/><br />
      {formik.touched.email && formik.errors.email ?(
        <p className='text-danger errorMsg' style={{fontSize:"12px",margin:"0px",position:"relative",left:"95px",top:"5px"}}>
          {formik.errors.email}
        </p>
      ):null}
      <select name="secretQuestion" id="qsn" placeholder='Secret Question'
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
      value={formik.values.secretQuestion}>
      <option value="Choose Question">Choose Question</option>
        <option value="Who was your childhood hero?">Who was your childhood hero?</option>
        <option value="What was your first job?">What was your first job?</option>
        <option value="What was the name of your first pet?">What was the name of your first pet?</option>
        <option value="What was your Birth place?">What was your Birth place?</option>
      </select>
      <br /><hr id='line'/><br />
      {formik.touched.secretQuestion && formik.errors.secretQuestion ?(
        <p className='text-danger errorMsg' style={{fontSize:"12px",margin:"0px",position:"relative",left:"95px",top:"5px"}}>
          {formik.errors.secretQuestion}
        </p>
      ):null}
      <input type="text" name="answer" id="ans" placeholder='Answer'
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
      value={formik.values.answer}/>
      <br /><hr id='line'/><br />
      {formik.touched.answer && formik.errors.answer ?(
        <p className='text-danger errorMsg' style={{fontSize:"12px",margin:"0px",position:"relative",left:"95px",top:"5px"}}>
          {formik.errors.answer}
        </p>
      ):null}
      <input type="password" name="password" id="pswd" placeholder='Password'
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
      value={formik.values.password}/>
      <br /><hr id='line'/><br />
      {formik.touched.password && formik.errors.password ?(
        <p className='text-danger errorMsg' style={{fontSize:"12px",margin:"0px",position:"relative",left:"95px",top:"5px"}}>
          {formik.errors.password}
        </p>
      ):null}
      <input type="password" name="confirmPassword" id="cpswd" placeholder='Confirm Password'
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
      value={formik.values.confirmPassword}/>
      <br /><hr id='line'/><br />
      {formik.touched.confirmPassword && formik.errors.confirmPassword ?(
        <p className='text-danger errorMsg' style={{fontSize:"12px",margin:"0px",position:"relative",left:"95px",top:"5px"}}>
          {formik.errors.confirmPassword}
        </p>
      ):null}
      <button id="submit">Submit</button><br/>
      </form>
    </div>
  )
}
