import React from 'react'
import './SideBar.css'
import {Link} from 'react-router-dom'

export default function SideBar() {
  return (
    <div>
      <div class="div2">
            <section>
                <div class="container">
                    <div class="row">
                        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" id='sidebar'>
                        <Link to={'../home'}id='link'><button id="hm"><i class="bi bi-house"id='home'>Home</i><br /><br /></button></Link>
                            <Link to={'../apps'} id='link'><button id="appp"><i class="bi bi-app"id='app'>Apps</i><br /><br /></button></Link>
                            <Link to={'../games'} id='link'><button id="gmmm"><i class="bi bi-controller" id='game'>Games</i><br /><br /></button></Link>
                            <Link to={'../library'} id='link'><button id="lbbb"><i class="bi bi-collection"id='library'>Library</i><br /><br /></button></Link>
                            <div class="btn-group dropend">
                                <button id='hppp' type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="bi bi-three-dots" id='more'><br />More</i><br /><br />
                                </button>
                                <ul class="dropdown-menu" id='moremenu'>
                                <Link to={'../upload'} id='link'><li><i class="bi bi-upload" id='i1'></i>Upload Apps</li></Link>
                                <Link to={'../feedback'} id='link'><li><i class="bi bi-chat-fill" id='i1'></i>Feedback</li></Link>
                                <Link to={'../update'} id='link'><li><i class="bi bi-app-indicator" id='i1'></i>Published Apps</li></Link>
                                <Link to={'../about'} id='link'><li><i class="bi bi-person-raised-hand" id='i1'></i>About</li></Link>
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
