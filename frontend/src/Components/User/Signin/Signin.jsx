import React from 'react'
import './Signin.css'
import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { login, userRegister } from '../../../Services/userApi'
import { setUserDetails } from '../../../Features/setUser'
import { useDispatch } from 'react-redux';
import coverImage from './Designer.png';


export default function Signin() {

  const dispatch = useDispatch();

  const navigate = useNavigate()

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .email("* Invalid username")
      .required("* This field is required"),
    password: Yup.string()
      .min(6, "* Password must be atleast 6 charecters long")
      .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\/,.<>/?]).*$/,
        "* Password must be atleast one capital letter and one special charecter")
      .required("* This field is required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      console.log("on Login Submit!! ", values);
      const { data } = await login(values);
      console.log(data, "USER RETURN DATA!!!");
      if (data.status) {
        localStorage.setItem("jwt", data?.token);
        dispatch(setUserDetails(data?.user));
        toast.success(data.message, { position: "top-right" });
        resetForm()
        navigate("/home")
      } else {
        toast.error(data.message, { position: "top-right" });
      }
    } catch (error) {
      console.log(error);
    }

  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div>

      <form onSubmit={formik.handleSubmit} id="form1">
        <div className="container">
          <div className="row">
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <img src={coverImage} alt="Cover image" id='coverimage' />
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <div id='loginzz'>
                <h1 id='t1'>Sign in</h1><br /><br />
                <input type="text" name="username" id="username" placeholder='Username'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.username} />
                <br /><hr id='line' /><br />
                {formik.touched.username && formik.errors.username ? (
                  <p className='text-danger errorMsg' style={{ fontSize: "12px", margin: "0px", position: "relative", left: "95px", top: "-10px" }}>
                    {formik.errors.username}
                  </p>
                ) : null}
                <input type="password" name="password" id="pswd" placeholder='Password'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password} />
                <br /><hr id='line' /><br />
                {formik.touched.password && formik.errors.password ? (
                  <p className='text-danger errorMsg' style={{ fontSize: "12px", margin: "0px", position: "relative", left: "95px", top: "-10px" }}>
                    {formik.errors.password}
                  </p>
                ) : null}
                <input type="submit" value={"Login"} id="submit" /><br />
                <Link to={'../forgot_pswd'}><a href="./forgot_pswd" id='fcrt'>Forgot Password</a></Link>
                <Link to={'../register'}><a href="./register" id='ffcrt'>New User</a></Link>
              </div>
            </div>
          </div>
        </div>
      </form>


    </div>
  )
}
