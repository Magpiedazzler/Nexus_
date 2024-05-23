import React,{useEffect,useState} from 'react'
import './Header.css'
import {Link} from 'react-router-dom'
//import {userHeader} from '../../../Services/userApi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUserDetails } from '../../../Features/setUser'
import { getAdminFeedComment, userHeader } from '../../../Services/userApi'


export default function Header() {

    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [data,setData]=useState({})
    const [feedComment,setFeedComment]=useState({})
    const [seen,setSeen]=useState(false)

    const AdminFeedNotification=(userId)=>{
        setData(true)
        if(userId){
            getAdminFeedComment(userId).then((value)=>{
                if(value?.data?.status){
                    setFeedComment(value?.data?.data)
                }
            });
        }
    };

    const userLogOut=()=>{
        localStorage.removeItem("jwt")
        dispatch(setUserDetails(""));
        navigate("/login");
    };

    const userIdentity = useSelector((state) => state?.user?.value?._id);

    useEffect(()=>{
        userHeader().then((response)=>{
            if(response.data.status){
                setData(response.data.user)
                dispatch(setUserDetails(response.data.user));
            }
        });
        AdminFeedNotification(userIdentity)
    },[dispatch,userIdentity]);

    const handleLoginClick=()=>{
        navigate("/login");
    };

    const handleSignupClick=()=>{
        navigate("/signup");
    };
  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <h2 id='t2'>Nexus</h2>
                    
                    <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
                        <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                        <button class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" id='unotification'
                        onClick={()=>AdminFeedNotification(userIdentity)}>
                        <i class="bi bi-bell" id='notify'></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-dark" id='notification_list'>
                            <h5 className="notificationHead">Notifications</h5>
                            {feedComment.length > 0 ?(
                                feedComment.map((value,index)=>(
                                    <li className='dropli' key={index}>
                                        <p className="dropdown-item">
                                        {!value?.viewed && (
                                            <span className="new-label">New</span>
                                        )}
                                        <p>Reply of "{value?.feedId?.feedbackComment}"</p>
                                        {value?.message}
                                        </p></li>
                                ))
                            ):(
                                <li>
                                <p>No Notification</p>
                                </li>
                            )}
                            
                        </ul>
                        </li>
                        </ul>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id='profileicon'>
                        <i class="bi bi-person-circle" id='profile'></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-dark" id='profile_details'>
                            <li><a class="dropdown-item active" href="#">{data?.username}</a></li>
                            <li><a class="dropdown-item" href="#">{data?.email}</a></li>
                            <li><button class="dropdown-item" onClick={()=>userLogOut()}>Sign out</button></li>
                            <li><hr class="dropdown-divider" id='underline'/></li>
                            <Link to='../profile'id='link'><li><a class="dropdown-item" href="#">View Profile</a></li></Link>
                        </ul>
                    </div>
            </div>
        </nav>
    </div>
  );
}
