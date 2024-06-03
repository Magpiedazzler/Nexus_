import React, { useEffect, useState } from 'react'
import './Games.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { appAddtoProfile, getBanner, getGameApps } from '../../../Services/userApi'

export default function Games() {
    const [games,setGames]=useState([])
    const [filteredGames,setFilteredGames]=useState([])
    const [selectedOS,setSelectedOS]=useState("")
    const [searchQuery,setSearchQuery]=useState("")
    const userId=useSelector((state)=>state?.user?.value?._id)
    const [bannerImages, setBannerImages] = useState([]);
    const navigate=useNavigate()

    useEffect(()=>{
        getGameApps().then((value)=>{
            if(value.data.status){
                setGames(value.data.data)
                setFilteredGames(value.data.data)
            }
        });
    },[]);

    useEffect(() => {
        getBanner().then((response) => {
            console.log(response.data.data,"!!!!!!!!!!!!!!!!!!!!!~~~~")
            if (response?.data?.status) {
             
                setBannerImages(response.data.data);
            }
        });
    }, []);

    useEffect(()=>{
        filterGames();
    },[selectedOS,searchQuery,games]);

    const handleOSChange=(e)=>{
        setSelectedOS(e.target.value)
    };

    const handleSearchChange=(e)=>{
        setSearchQuery(e.target.value)
    };

    const filterGames=()=>{
        let filtered=games;
        if(selectedOS){
            filtered=filtered.filter((game)=>game.OS===selectedOS)
        }
        if(searchQuery){
            filtered=filtered.filter((game)=>game.appName.toLowerCase().includes(searchQuery.toLowerCase()))
        }
        console.log("Filtered Games: ",filtered)
        setFilteredGames(filtered)
    };

    const DownloadSelectedApp=(apkFile,appId)=>{
        appAddtoProfile(userId,appId).then((value)=>{})
        const fileUrl=`http://localhost:4000/img/${apkFile}`
        const link=document.createElement("a")
        link.href=fileUrl
        link.setAttribute("download","")
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    };

  return (
    <div>
        <div class="div2" id='div2'>
    <section>
        <div class="container">
            <div class="row">
            <div id='homenav'>
                    <select name="" id="uosfilter" onChange={handleOSChange}>
                        <option value="">Choose OS</option>
                        <option value="">Windows</option>
                        <option value="">Linux</option>
                        <option value="">Mac</option>
                    </select><br />
                    <input type="text" id='usearch' placeholder='Search..' onChange={handleSearchChange}/>
                    <button id='usearchicon'><i class="bi bi-search" id='usearch1'></i></button>
                    </div>
                    <div id="carouselExampleIndicators" class="carousel slide">
                    <div className="carousel-indicators">
                                    {bannerImages.map((_, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            data-bs-target="#carouselExampleIndicators"
                                            data-bs-slide-to={index}
                                            className={index === 0 ? "active" : ""}
                                            aria-current={index === 0 ? "true" : ""}
                                            aria-label={`Slide ${index + 1}`}
                                        ></button>
                                    ))}
                                </div>
                                <div className="carousel-inner" id="sub">
                                    {bannerImages.map((value, index) => (
                                        <div
                                            className={`carousel-item ${index === 0 ? "active" : ""}`}
                                            key={index}
                                        >
                                            <img
                                                src={`http://localhost:4000/img/${value?.bannerFile}`}
                                                className="d-block w-100"
                                                alt={`Slide ${index + 1}`}
                                            />
                                        </div>
                                    ))}
                                </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                    {filterGames.length>0?(
                        filterGames.map((value,index)=>(
                            <div class="card" id='hdiv' onClick={()=>navigate(`/install/${value?._id}`)} key={index}>
                                <img src={`http://localhost:4000/img/${value?.appIcon}`} id='himg' class="card-img-top" alt="..."/>
                                <div class="card-body">
                                    <h5 class="card-title" id='hh'>{value?.appName}</h5><br />
                                    <p class="card-text">{value?.Category}</p>
                                    <button id='hb' onClick={(e)=>{
                                        e.stopPropagation()
                                        DownloadSelectedApp(value?.apkFile,value?._id)
                                    }}>
                                        <i class="bi bi-download" id='hi'></i>Download</button>
                                </div>
                            </div>
                        ))
                    ):(
                        <p className="notAvailable">Games not available</p>
                    )}  
            </div>
        </div>
    </section>
        </div>
    </div>
  );
}
