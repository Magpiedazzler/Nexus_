import React from 'react'
import './AdminUpdateApp.css'
import { Link } from 'react-router-dom'

export default function AdminUpdateApp() {
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
                    <h2>Uploaded files</h2><br /><br />
                            <div class="card" id='ldiv'>
                            <img src="" class="card-img-top" id='limg' alt="App Logo"/>
                            <div class="card-body">
                                <h5 class="card-title" id='lh1'>App Name</h5>
                                <Link to={'../update_appfile'}><button class="btn btn-primary" id='la'>Update</button></Link>
                            </div>
                        </div>
            </div>
        </div>
    </section>
        </div>
    </div>
  )
}
