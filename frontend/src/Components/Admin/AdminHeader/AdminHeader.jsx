import React, { useEffect, useState } from 'react'
import './AdminHeader.css'
import icon from './Designer 1.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAdminDetails } from '../../../Features/setAdmin'
import { adminHeader } from '../../../Services/adminApi'

export default function AdminHeader() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [adminData, setAdminData] = useState({})

  const userLogOut = () => {
    localStorage.removeItem("adminJWT")
    dispatch(setAdminDetails(""))
    navigate("/admin")
  };

  useEffect(() => {
    adminHeader().then((value) => {
      if (value.data.admin) {
        console.log(value.data.admin, "$$$$")
        setAdminData(value.data.admin)
        dispatch(setAdminDetails(value.data.admin))
      }
    })
  }, []);

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <img src={icon} alt="" id='nexusIcon' />
          <h2 id='t2'>Nexus</h2>

          <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul class="navbar-nav">
              <li class="nav-item dropdown">
                <button onClick={() => navigate("/admin/notification")} class="btn btn-dark" id='notification'>
                  <i class="bi bi-bell" id='notify'></i>
                </button>
              </li>
            </ul>
          </div>
          <div class="dropdown" id='animation'>
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id='profileicon'>
              <i class="bi bi-person-circle" id='profile'></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-dark" id='profile_details'>
              <li><p class="dropdown-item active" >Admin</p></li>
              <li><a class="dropdown-item">{adminData.email}</a></li>
              <li><button class="dropdown-item" onClick={() => { userLogOut() }}>Sign out</button></li>
              <li><hr class="dropdown-divider" id='underline' /></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
