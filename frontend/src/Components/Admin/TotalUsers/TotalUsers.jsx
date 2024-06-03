import React, { useEffect, useState } from 'react'
import './TotalUsers.css'
import { userlist } from '../../../Services/adminApi';

export default function TotalUsers() {
    const [userDetails,setUserDeatils]=useState([])
    useEffect(()=>{
        userlist().then((value)=>{
            console.log(value.data,"$$$$$")
            setUserDeatils(value?.data?.userlist)
        });
    },[])
  return (
    <div>
        <div id='div2'>
        <div id='anav1'>
                    <input type="text" id='hsearch' placeholder='Search..'/>
                    <button id='hsearchicon'><i class="bi bi-search" id='hsearch1'></i></button>
            </div>
            <h2 id='th2'>User Details</h2>
            <table class="table table-striped table-hover" id='tuser'>
                <thead>
                    <tr>
                    <th scope="col">SL.No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Contact No</th>
                    <th scope="col">Email ID</th>
                    </tr>
                </thead>
                <tbody>
                    {userDetails.length>0?(userDetails.map((value,index)=>(
                        <tr>
                            <th scope="row">{index+1}</th>
                            <td>{value.username}</td>
                            <td>{value.contactNo}</td>
                            <td>{value.email}</td>
                        </tr>
                    ))):(<tr>
                        <td colSpan="4" style={{ textAlign: 'center' }}>No users found</td>
                      </tr>)}
                    
                </tbody>
            </table>
        </div>
    </div>
  )
}
