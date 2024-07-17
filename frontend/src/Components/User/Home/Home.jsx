import React, { useEffect, useState } from 'react';
import imageOne from "./12.jpg";
import './Home.css';
import { appAddtoProfile, getBanner, getUploadedApps } from '../../../Services/userApi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Home() {
    const [appDetails, setAppDetails] = useState([]);
    const [filteredAllApps, setFilteredAllApps] = useState([]);
    const [selectedOS, setSelectedOS] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const userId = useSelector((state) => state?.user?.value?._id);
    const navigate = useNavigate();
    const [bannerImages, setBannerImages] = useState([]);

    useEffect(() => {
        getBanner().then((response) => {
            console.log(response.data.data, "!!!!!!!!!!!!!!!!!!!!!~~~~")
            if (response?.data?.status) {

                setBannerImages(response.data.data);
            }
        });
    }, []);

    const handleDownloadApp = (apkFile, appId) => {
        appAddtoProfile(userId, appId).then(() => { });

        const fileUrl = `http://localhost:4000/img/${apkFile}`;
        const link = document.createElement('a');
        link.href = fileUrl;
        link.setAttribute('download', '');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        getUploadedApps().then((response) => {
            const apps = response?.data?.data || [];
            setAppDetails(apps);
            setFilteredAllApps(apps);
        });
    }, []);

    useEffect(() => {
        filterApps();
    }, [selectedOS, searchQuery, appDetails]);

    const handleOSChange = (e) => {
        setSelectedOS(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filterApps = () => {
        let filtered = appDetails;

        if (selectedOS) {
            filtered = filtered.filter((app) => app.OS === selectedOS);
        }

        if (searchQuery) {
            filtered = filtered.filter((app) =>
                app.appName.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredAllApps(filtered);
    };

    return (
        <div>
            <div className="div2" id="div2">
                <section>
                    <div className="container">
                        <div className="row">
                            <div id="homenav">
                                <select id="uosfilter" onChange={handleOSChange}>
                                    <option value="">Choose OS</option>
                                    <option value="Windows">Windows</option>
                                    <option value="Linux">Linux</option>
                                    <option value="Mac">Mac</option>
                                </select>
                                <br />
                                <input
                                    type="text"
                                    id="usearch"
                                    placeholder="Search.."
                                    onChange={handleSearchChange}
                                />
                                <button id="usearchicon">
                                    <i className="bi bi-search" id="usearch1"></i>
                                </button>
                            </div>
                            <div
                                id="carouselExampleIndicators"
                                className="carousel slide"
                            >
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
                                <button
                                    className="carousel-control-prev"
                                    type="button"
                                    data-bs-target="#carouselExampleIndicators"
                                    data-bs-slide="prev"
                                >
                                    <span
                                        className="carousel-control-prev-icon"
                                        aria-hidden="true"
                                    ></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button
                                    className="carousel-control-next"
                                    type="button"
                                    data-bs-target="#carouselExampleIndicators"
                                    data-bs-slide="next"
                                >
                                    <span
                                        className="carousel-control-next-icon"
                                        aria-hidden="true"
                                    ></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                            {filteredAllApps.length > 0 ? (
                                filteredAllApps.map((value, id) => (
                                    <div
                                        className="card"
                                        id="hdiv"
                                        onClick={() => navigate(`/install/${value?._id}`)}
                                        key={id}
                                    >
                                        <img
                                            src={`http://localhost:4000/img/${value?.appIcon}`}
                                            id="himg"
                                            className="card-img-top"
                                            alt={value?.appName}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title" id="hh">
                                                {value?.appName}
                                            </h5>
                                            <br />
                                            <p className="card-text">{value?.category}</p>
                                            <button
                                                id="hb"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDownloadApp(value?.apkFile, value?._id);
                                                }}
                                            >
                                                <i className="bi bi-download" id="hi"></i>
                                                Download
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Application not available</p>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
