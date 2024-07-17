import React, { useEffect, useState } from 'react';
import "./Applications.css";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { appAddtoProfile, getBanner, getUtilityApps } from '../../../Services/userApi';

export default function Applications() {
    const [bannerImages, setBannerImages] = useState([]);
    const [utilityApp, setUtilityApp] = useState([]);
    const [filteredApps, setFilteredApps] = useState([]);
    const [selectedOS, setSelectedOS] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const userId = useSelector((state) => state?.user?.value?._id);
    const navigate = useNavigate();

    useEffect(() => {
        getUtilityApps().then((value) => {
            setUtilityApp(value?.data?.data);
            setFilteredApps(value?.data?.data);
        });
    }, []);

    useEffect(() => {
        getBanner().then((response) => {
            if (response?.data?.status) {
                setBannerImages(response.data.data);
            }
        });
    }, []);

    useEffect(() => {
        filterApps();
    }, [selectedOS, searchQuery, utilityApp]);

    const handleOSChange = (e) => {
        setSelectedOS(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filterApps = () => {
        let filtered = utilityApp;

        if (selectedOS) {
            filtered = filtered.filter((app) => app.OS === selectedOS);
        }

        if (searchQuery) {
            filtered = filtered.filter((app) =>
                app.appName.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredApps(filtered);
    };

    const DownloadSelectedApp = (apkFile, appId) => {
        appAddtoProfile(userId, appId).then((value) => {
            console.log(value, "Data Downloaded");
        });
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
            <div className="div2" id='div2'>
                <section>
                    <div className="container">
                        <div className="row">
                            <div id='homenav'>
                                <select name="" id="uosfilter" onChange={handleOSChange}>
                                    <option value="">Choose OS</option>
                                    <option value="Windows">Windows</option>
                                    <option value="Linux">Linux</option>
                                    <option value="Mac">Mac</option>
                                </select><br />
                                <input type="text" id='usearch' onChange={handleSearchChange} placeholder='Search..'/>
                                <button id='usearchicon'><i className="bi bi-search" id='usearch1'></i></button>
                            </div>
                            <div id="carouselExampleIndicators" className="carousel slide">
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
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                            {filteredApps.length > 0 ? (
                                filteredApps.map((value, index) => (
                                    <div className="card" id='hdiv' onClick={() => navigate(`/install/${value?._id}`)} key={index}>
                                        <img src={`http://localhost:4000/img/${value?.appIcon}`} id='himg' className="card-img-top" alt="..."/>
                                        <div className="card-body">
                                            <h5 className="card-title" id='hh'>{value?.appName}</h5><br />
                                            <p className="card-text">{value?.Category}</p>
                                            <button id='hb' onClick={(e) => {
                                                e.stopPropagation();
                                                DownloadSelectedApp(value?.apkFile, value?._id);
                                            }}>
                                                <i className="bi bi-download" id='hi'></i>Download</button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="notAvailable">Utility Application not available</p>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
