import React from 'react'
import './AdminHeader.css'
import { Link } from 'react-router-dom'

export default function AdminHeader() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <h2 id='t2'>Nexus</h2>
                    
                    <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
                        <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                        <Link to='../notification'><button class="btn btn-dark" id='notification'>
                        <i class="bi bi-bell" id='notify'></i>
                        </button></Link>
                        </li>
                        </ul>
                    </div>
                    <div class="dropdown" id='animation'>
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id='profileicon'>
                        <i class="bi bi-person-circle" id='profile'></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-dark" id='profile_details'>
                            <li><a class="dropdown-item active" href="#">Name</a></li>
                            <li><a class="dropdown-item" href="#">Email</a></li>
                            <li><a class="dropdown-item" href="#">Sign out</a></li>
                            <li><hr class="dropdown-divider" id='underline'/></li>
                            <li><a class="dropdown-item" href="#">View Profile</a></li>
                        </ul>
                    </div>
            </div>
        </nav>
    </div>
  )
}
