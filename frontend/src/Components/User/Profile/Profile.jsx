import React, { useEffect, useState } from 'react'
import './Profile.css'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { userHeader } from '../../../Services/userApi'

export default function Profile() {
  const [userDeatils,setUserDetails]=useState({})
  const [image,setImage]=useState()
  const userId=useSelector((state)=>state?.user?.value?._id)

  useEffect(()=>{
    userHeader().then((value)=>{
      setUserDetails(value?.data?.user)
      setImage(value?.data?.profileImage)
    })
  },[]);

  const date=new Date(userDeatils?.date)

  return (
    <div>
    <div class="main main-raised" >
		<div class="profile-content" id='pdiv'>
            <div class="container">
                <div class="row">
	                <div class="col-md-6 ml-auto mr-auto">
        	           <div class="profile">
	                        <div class="avatar">
	                            <img src={(image?`http://localhost:4000/img/${image}`:"")} alt="Circle Image" class="img-raised rounded-circle img-fluid"/><br /><br />
                                <input type="text" id='pname' value={userDeatils?.username} readOnly/><br /><br />
                                <Link to='../edit_profile' id='link'><button class="pbtn"><i class="bi bi-pencil-square"></i>Edit Profile</button></Link>
	                        </div>
	                        <div class="name">
								                <input type="text" id='pmail' value={userDeatils?.email} readOnly/><br /><br />
                                <input type="text" id='pcno' value={userDeatils?.contactNo} maxLength={'10'} readOnly/><br /><br />
	                        </div>
	                    </div>
    	            </div>
                </div>
                <div class="description text-center">
                    <label id='joinKey'>Joined on</label><br /><br /><br />
                    <input type="text" value={date.toLocaleDateString("en-US")} readOnly/>
                </div>
            </div>
            </div>
        </div>
	</div>
  )
}
