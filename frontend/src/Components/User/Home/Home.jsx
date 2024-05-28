import React, { useEffect, useState } from 'react'
import imageOne from "./12.jpg"
import './Home.css'
import { appAddtoProfile, getBanner, getUploadedApps, userHeader } from '../../../Services/userApi'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Home() {

    const [appDetails,setAppDetails]=useState([])
    const [filteredAllApps, setFilteredAllApps] = useState([]);
    const [selectedOS, setSelectedOS] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const userId=useSelector((state)=>state?.user?.value?._id)
    const navigate=useNavigate()
    const [bannerImage, setBannerImage] = useState();

    useEffect(() => {
        getBanner().then((value) => {
            console.log(value?.data?.data,"frontend")
            setBannerImage(value?.data?.data?.bannerDetails);
        });
    }, []);

    const banner=async ()=>{
        try{
            const value = await getBanner()
            console.log(value?.data,"00000000")
            if(value?.data?.status){
                
                setBannerImage(value?.data?.admin?.bannerDetails);   
            }
        }catch(error){
            console.log("Error in fetching banner")
        }
    };

    const DownloadSelectedApp=(apkFile,appId)=>{
        appAddtoProfile(userId,appId).then((value)=>{})

        const fileUrl=`http://localhost:4000/img/${apkFile}`
        const link=document.createElement('a')
        link.href=fileUrl
        link.setAttribute('download','')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    };

    useEffect(()=>{
        getUploadedApps().then((value)=>{
            console.log(value?.data?.data,"$$$")
            setAppDetails(value?.data?.data)
            setFilteredAllApps(value?.data?.data)
        });
    },[]);

    useEffect(()=>{
        filterGames()
    },[selectedOS,searchQuery,appDetails])

    const handleOSChange = (e) => {
        console.log(e.target.value,"$$$$$$******$$$$$");
        setSelectedOS(e.target.value);
        console.log(selectedOS,"!!!!!");
      };
    
      const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
      };
    
    
      const filterGames = () => {
        let filtered = appDetails;
    
        if (selectedOS) {
          filtered = filtered.filter((apps) => apps.OS === selectedOS);
        }
    
        if (searchQuery) {
          filtered = filtered.filter((app) =>
            app.appName.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
    
        console.log("Filtered Apps:", filtered);
        setFilteredAllApps(filtered);
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
                                <div class="carousel-indicators" id=''>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                </div>
                                    
                                        <div class="carousel-inner" id='sub'>
                                            <div class="carousel-item active">
                                            <img src={`http://localhost:4000/img/`} class="d-block w-100" alt="First"/>
                                            </div>
                                            {/* <div class="carousel-item">
                                            <img src={imageOne} class="d-block w-100" alt="Second"/>
                                            </div>
                                            <div class="carousel-item">
                                            <img src={imageOne} class="d-block w-100" alt="Third"/>
                                            </div> */}
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
                            {filteredAllApps.length>0 ?(
                                filteredAllApps.map((value,id)=>(
                            <div class="card" id='hdiv' onClick={()=>navigate(`/install/$(value?._id)`)} key={id}>
                                <img src={`http://localhost:4000/img/${value?.appIcon}`} id='himg' class="card-img-top" alt="..."/>
                                <div class="card-body">
                                    <h5 class="card-title" id='hh'>{value?.appName}</h5><br />
                                    <p class="card-text">{value?.category}</p>
                                    <button id='hb' onClick={()=>DownloadSelectedApp(value?.apkFile,value?._id)}><i class="bi bi-download" id='hi'></i>Download</button>
                                </div>
                            </div>
                                ))
                            ):(
                                <p>Application not available</p>
                            )}
                    </div>
                </div>
            </section>
        </div>
    </div>
  );
}
