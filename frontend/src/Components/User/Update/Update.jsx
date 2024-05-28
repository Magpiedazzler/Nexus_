import React, { useEffect, useState } from 'react'
import './Update.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUploadApps, getUserInstalledApps } from '../../../Services/userApi'

export default function Update() {

    const userId=useSelector((state)=>state?.user?.value?._id)
    const [uploadedApp,SetUploadedApp]=useState("")

    useEffect(()=>{
        getUploadApps(userId).then((value)=>{
            console.log(value.data.data,"awffsfsa");

            if(value.data.status){

                SetUploadedApp(value?.data?.data)
            }
        })
    },[])



    const navigate=useNavigate()
    
  return (
    <div>
      <div class="div2" id='div2'>
    <section>
        <div class="container">
            <div class="row">
                <div id='homenav'>
                    <select name="" id="uosfilter" onChange="">
                        <option value="">Choose OS</option>
                        <option value="">Windows</option>
                        <option value="">Linux</option>
                        <option value="">Mac</option>
                    </select><br />
                    <input type="text" id='usearch' placeholder='Search..' onChange=""/>
                    <button id='usearchicon'><i class="bi bi-search" id='usearch1'></i></button>
                    </div>
                    <h2>Uploaded files</h2><br /><br />
                    {uploadedApp.length>0?(
                        uploadedApp.map((value,index)=>(
                            <div class="card" id='ldiv' onClick={()=>navigate(`/update_file/${value?._id}`)} key={index}>
                            <img src={`http://localhost:4000/img/${value?.appIcon}`} class="card-img-top" id='limg' alt="App Logo"/>
                            <div class="card-body">
                                <h5 class="card-title" id='lh1'>{value?.appName}</h5>
                                <Link to={'../update_file'}><button class="btn btn-primary" id='la'>Update</button></Link>
                            </div>
                        </div>
                        ))
                    ):(<p>Application not available</p>)}
                               
                            
            </div>
        </div>
    </section>
        </div>
    </div>
  )
}
