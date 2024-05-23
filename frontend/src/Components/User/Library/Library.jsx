import React, { useEffect, useState } from 'react'
import './Library.css'
import { useSelector } from 'react-redux'
import { getUserInstalledApps, getWishlistApps } from '../../../Services/userApi'

export default function Library() {
    const [installedApp,setInstalledApp]=useState([])
    const [Wishlist,setWishlist]=useState([])
    const [view,setView]=useState('installed')
    const userId=useSelector((state)=>state?.user?.value?._id)

    useEffect(()=>{
        allApps()
    },[]);

    const allApps=()=>{
        getUserInstalledApps().then((value)=>{
            console.log(value?.data)
            if(value?.data?.status){
                setInstalledApp(value?.data?.apps)
                setView('installed')
                console.log(view,"View in installed apps")
            }
        });
    }

    const getWishlist=()=>{
        getWishlistApps().then((value)=>{
            console.log(value?.data,"66666^^^^^6666");
            if(value?.data?.status){
                setWishlist(value?.data?.data)
                setView('wishlist');
                console.log(view,"View in wish apps");
            }
        })
    }

  return (
    <div>
      <div class="div2" id='div2'>
    <section>
        <div class="container">
            <div class="row">
                <h2>Library</h2><br /><br />
                <div id='homenav'>
                    <select name="" id="uosfilter">
                        <option value="">Choose OS</option>
                        <option value="">Windows</option>
                        <option value="">Linux</option>
                        <option value="">Mac</option>
                    </select><br />
                    <input type="text" id='usearch' placeholder='Search..'/>
                    <button id='usearchicon'><i class="bi bi-search" id='usearch1'></i></button>
                    </div>
                <div>
                <button type="button" class="btn btn-outline-primary" id='libb1' onClick={()=>allApps()}>ALL</button>
                <button type="button" class="btn btn-outline-secondary" id='libb2' onClick={()=>Wishlist(userId)}>Wishlist</button>
                </div><br /><br />
                {view==='wishlist'?(
                    Wishlist.length>0?(
                        Wishlist.map((value,index)=>(
                            <div class="card" id='ldiv' key={index}>
                            <img src={`http://localhost:4000/img/${value?.appDetails?.appIcon}`} class="card-img-top" id='limg' alt="App Logo"/>
                            <div class="card-body">
                                <h5 class="card-title" id='lh1'>{value?.appDetails?.appName}</h5>
                                <a href="#" class="btn btn-primary" id='la'>Downloaded</a>
                            </div>
                        </div>
                        ))
                    ):(<p>Empty Wishlist</p>)
                ):view==='installed'?(
                    installedApp.length > 0 ?(
                        installedApp.map((value,index)=>(
                            <div class="card" id='ldiv' key={index}>
                            <img src={`http://localhost:4000/img/${value?.appIcon}`} class="card-img-top" id='limg' alt="App Logo"/>
                            <div class="card-body">
                                <h5 class="card-title" id='lh1'>{value?.appName}</h5>
                                <a href="#" class="btn btn-primary" id='la'>Downloaded</a>
                            </div>
                        </div>
                        ))
                    ):(<p>Empty Library</p>)
                ):null}
                    
            </div>
        </div>
    </section>
        </div>
    </div>
  );
}
