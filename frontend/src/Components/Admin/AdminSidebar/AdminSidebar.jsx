import React from 'react'
import './AdminSidebar.css'
import {Link} from 'react-router-dom'

export default function AdminSidebar() {
  return (
    <div>
      <div class="div2">
            <section>
                <div class="container">
                    <div class="row">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" id='sidebar'>
                            <Link to={'../home'} id='link'><button id="hm"><i class="bi bi-house"id='home'>Home</i><br /><br /></button></Link>
                            <div class="btn-group dropend">
                                <button id='hp' type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="bi bi-three-dots" id='more'><br />More</i><br /><br />
                                </button>
                                <ul class="dropdown-menu" id='admsidemenu'>
                                <Link to={'../app_management'} id='link'><li><i class="bi bi-gear-wide-connected" id='i1'></i>App Hub</li></Link>
                                <Link to={'../upload_app'} id='link'><li><i class="bi bi-upload" id='i1'></i>Upload App</li></Link>
                                <Link to={'../update_app'} id='link'><li><i class="bi bi-app-indicator" id='i1'></i>Update App</li></Link>
                                <Link to={'../feedback_view'} id='link'><li><i class="bi bi-chat-fill" id='i1'></i>Feedback</li></Link>
                                <Link to={'../compliant'} id='link'><li><i class="bi bi-shield-fill-exclamation" id='i1'></i>Compliant</li></Link>
                                <Link to={'../banner'} id='link'><li><i class="bi bi-file-earmark-arrow-up" id='i1'></i>Upload Banner</li></Link>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
  )
}
