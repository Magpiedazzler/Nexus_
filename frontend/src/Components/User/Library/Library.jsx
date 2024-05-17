import React from 'react'
import './Library.css'
import imageOne from "./12.jpg"

export default function Library() {
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
                <button type="button" class="btn btn-outline-primary" id='libb1'>ALL</button>
                <button type="button" class="btn btn-outline-secondary" id='libb2'>Wishlist</button>
                </div><br /><br />
                    <div class="card" id='ldiv'>
                        <img src={imageOne} class="card-img-top" id='limg' alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title" id='lh1'>App Name</h5>
                            <a href="#" class="btn btn-primary" id='la'>Update</a>
                        </div>
                    </div>
            </div>
        </div>
    </section>
        </div>
    </div>
  )
}
