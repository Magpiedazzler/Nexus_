import React, { useEffect, useState } from 'react'
import "./Applications.css"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { appAddtoProfile, getBanner, getUtilityApps } from '../../../Services/userApi'

export default function Applications() {
    const [bannerImages, setBannerImages] = useState([]);
    const [utilityApp,setUtilityApp]=useState([])
    const [filteredApps,setFilteredApps]=useState([])
    const [selectedOS,setSelectedOS]=useState("")
    const [searchQuery,setSearchQuery]=useState("")
    const userId=useSelector((state)=>state?.user?.value?._id)
    const navigate=useNavigate()
    useEffect(()=>{
        getUtilityApps().then((value)=>{
            setUtilityApp(value?.data?.data)
            setFilteredApps(value?.data?.data)
        })
    },[]);

    useEffect(() => {
      getBanner().then((response) => {
          console.log(response.data.data,"!!!!!!!!!!!!!!!!!!!!!~~~~")
          if (response?.data?.status) {
           
              setBannerImages(response.data.data);
          }
      });
  }, []);

    useEffect(() => {
        filterGames();
      }, [selectedOS, searchQuery, utilityApp]);
    
      const handleOSChange = (e) => {
        console.log(e.target.value,"$$$$$$******$$$$$");
        setSelectedOS(e.target.value);
        console.log(selectedOS,"!!!!!");
      };
    
      const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
      };

      const filterGames = () => {
        let filtered = utilityApp;
    
        if (selectedOS) {
          filtered = filtered.filter((apps) => apps.OS === selectedOS);
        }
    
        if (searchQuery) {
          filtered = filtered.filter((app) =>
            app.appName.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
    
        console.log("Filtered Apps:", filtered);
        setFilteredApps(filtered);
      };

      const DownloadSelectedApp=(apkFile,appId)=>{
        appAddtoProfile(userId,appId).then((value)=>{
            console.log(value,"Data Downloaded")
        })
        const fileUrl = `http://localhost:4000/img/${apkFile}`;
        const link = document.createElement("a");
        link.href = fileUrl;
        link.setAttribute("download", "");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                    <input type="text" id='usearch' onChange={handleSearchChange} placeholder='Search..'/>
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
                    {filteredApps.length>0?(
                        filteredApps.map((value,index)=>(
                            <div class="card" id='hdiv' onClick={()=>navigate(`/install/${value?._id}`)} key={index}>
                            <img src={`http://localhost:4000/img/${value?.appIcon}`}id='himg' class="card-img-top" alt="..."/>
                            <div class="card-body">
                                <h5 class="card-title" id='hh'>{" "}{value?.appName}</h5><br />
                                <p class="card-text">{value?.Category}</p>
                                <button id='hb'><i class="bi bi-download" id='hi' onClick={()=>{DownloadSelectedApp(value?.apkFile, value?._id);}}></i>Download</button>
                            </div>
                            </div>
                        ))
                    ):(<p className="notAvailable">Utility Application not available</p>)}  
            </div>
        </div>
    </section>
        </div>
    </div>
  )
}
