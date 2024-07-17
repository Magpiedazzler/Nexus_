import React, { useEffect, useState } from 'react'
import './AdminHome.css'
import { Link } from 'react-router-dom'
import PiChart from '../PieChart/PieChart'
import Chart from '../Chart/Chart'
import { getBanner } from '../../../Services/userApi'

export default function AdminHome() {
    const [bannerImages, setBannerImages] = useState([]);
    useEffect(() => {
        getBanner().then((response) => {
            console.log(response.data.data, "!!!!!!!!!!!!!!!!!!!!!~~~~")
            if (response?.data?.status) {

                setBannerImages(response.data.data);
            }
        });
    }, []);
    return (
        <div>
            <div class="div2" id='div2'>
                <div id='anav'>
                    <select name="" id="hosfilter">
                        <option value="">Choose OS</option>
                        <option value="">Windows</option>
                        <option value="">Linux</option>
                        <option value="">Mac</option>
                    </select><br /><hr id='hhrfilter' />
                    <input type="text" id='hsearch' placeholder='Search..' />
                    <button id='hsearchicon'><i class="bi bi-search" id='hsearch1'></i></button>
                </div>
                <section>
                    <div id="carouselExampleIndicators" class="carousel slide">
                        <div class="carousel-indicators" id=''>
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
                        <div class="carousel-inner" id='subbb'>
                            {bannerImages.map((value, index) => (
                                <div
                                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                                    key={index}>
                                    <img
                                        src={`http://localhost:4000/img/${value?.bannerFile}`}
                                        className="d-block w-100"
                                        alt={`Slide ${index + 1}`} />
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
                </section>

                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                <h1><PiChart /></h1>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                <h2><Chart /></h2>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="container" id='homedetails'>
                        <div className="row">
                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                <div class="card text-center">
                                    <div class="card-body">
                                        <h5 class="card-title"><i class="bi bi-box"></i></h5>
                                        <p class="card-text">All apps</p>
                                        <Link to={'../app_details'} id='link'><a href="#" class="btn btn-primary">View</a></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                <div class="card text-center">
                                    <div class="card-body">
                                        <h5 class="card-title"><i class="bi bi-controller"></i></h5>
                                        <p class="card-text">Gaming apps</p>
                                        <Link to={'../game_details'} id='link'><a href="#" class="btn btn-primary">View</a></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                <div class="card text-center">
                                    <div class="card-body">
                                        <h5 class="card-title"><i class="bi bi-app"></i></h5>
                                        <p class="card-text">Utility apps</p>
                                        <Link to={'../utilityapp_details'} id='link'><a href="#" class="btn btn-primary">View</a></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                <div class="card text-center">
                                    <div class="card-body">
                                        <h5 class="card-title"><i class="bi bi-people"></i></h5>
                                        <p class="card-text">Total number of users</p>
                                        <Link to={'../user_details'} id='link'><a href="#" class="btn btn-primary">View</a></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="container" id='homedetails'>
                        <div className="row">
                            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                <div class="card text-center">
                                    <div class="card-body">
                                        <h5 class="card-title"><i class="bi bi-windows"></i></h5>
                                        <p class="card-text">Windows apps</p>
                                        <Link to={'../windowsapp_details'} id='link'><a href="#" class="btn btn-primary">View</a></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                <div class="card text-center">
                                    <div class="card-body">
                                        <h5 class="card-title"><i class="bi bi-ubuntu"></i></h5>
                                        <p class="card-text">Linux apps</p>
                                        <Link to={'../linuxapp_details'} id='link'><a href="#" class="btn btn-primary">View</a></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                <div class="card text-center">
                                    <div class="card-body">
                                        <h5 class="card-title"><i class="bi bi-apple"></i></h5>
                                        <p class="card-text">MAC apps</p>
                                        <Link to={'../macapp_details'} id='link'><a href="#" class="btn btn-primary">View</a></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
