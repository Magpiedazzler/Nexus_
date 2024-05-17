import React from 'react'
import "./Applications.css"
import { Link } from 'react-router-dom'

export default function Applications() {
  return (
    <div>
        
        <div class="div2" id='div2'>
    <section>
        <div class="container">
            <div class="row">
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
                    <div id="carouselExampleIndicators" class="carousel slide">
                        <div class="carousel-indicators" id=''>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div class="carousel-inner" id='sub'>
                            <div class="carousel-item active">
                            <img src="" class="d-block w-100" alt="First"/>
                            </div>
                            <div class="carousel-item">
                            <img src="" class="d-block w-100" alt="Second"/>
                            </div>
                            <div class="carousel-item">
                            <img src="" class="d-block w-100" alt="Third"/>
                            </div>
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
                    <div class="card" id='hdiv'>
                        <img src="" id='himg' class="card-img-top" alt="..."/>
                        <Link to='../install'><div class="card-body">
                            <h5 class="card-title" id='hh'>App Name</h5><br />
                            <p class="card-text">ratings</p>
                            <button id='hb'><i class="bi bi-download" id='hi'></i>Download</button>
                        </div></Link>
                    </div>
            </div>
        </div>
    </section>
        </div>
    </div>
  )
}
