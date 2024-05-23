import React, { useEffect, useState } from 'react'
import './WindowsApps.css'
import { fetchAllWindowsApps } from '../../../Services/adminApi'

export default function WindowsApps() {
  const [windowsApp,setWindowsApp]=useState([])
  useEffect(()=>{
    fetchAllWindowsApps.then((value)=>{
      console.log(value.data,"windows")
      if(value?.data?.status){
        setWindowsApp(value?.data?.data)
      }
    })
  },[])

  return (
    <div>
      <div id='div2'>
      {/* <div id='anav1'>
                    <input type="text" id='hsearch' placeholder='Search..'/>
                    <button id='hsearchicon'><i class="bi bi-search" id='hsearch1'></i></button>
            </div> */}
            <h2 id='th2'>Apps for Windows</h2>
            <table class="table table-striped table-hover" id='twindows'>
                <thead>
                    <tr>
                    <th scope="col">SL.No</th>
                    <th scope="col">Icon</th>
                    <th scope="col">App Name</th>
                    <th scope="col">Category</th>
                    </tr>
                </thead>
                <tbody>
                  {windowsApp.length>0?(windowsApp.map((value,index)=>(
                    <tr>
                    <th scope="row">{index+1}</th>
                    <td><img id='timg' src={`http://localhost:4000/img/${value.appIcon}`} alt="App icon" /></td>
                    <td>{value?.appName}</td>
                    <td>{value?.Category}</td>
                    </tr>
                  ))
                ):(<p>Empty</p>)}
                    
                </tbody>
            </table>
        </div>
    </div>
  )
}
