//import { useState } from 'react'
import React, {useEffect, useState} from 'react'
import './AdminNotification.css'
import { sendNotification, userlist } from '../../../Services/adminApi';
import { toast } from 'react-toastify';

export default function AdminNotification() {

    const [selectedOption, setSelectedOption] = useState('');
    const [userList,setUserlist]=useState([])
    const [selectedUser,setSelectedUser]=useState("")
    const [message,setMessage]=useState("")
    const [error,setError]=useState("")

    useEffect(()=>{
        userlist().then((value)=>{
            console.log(value?.data)
            if(value?.data?.status){
                setUserlist(value?.data?.userlist)
            }
        })
    },[]);

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    }; 

    const handleUserChange = (e) => {
        setSelectedUser(e.target.value);
      };
    
      const handleMessageChange = (e) => {
        setMessage(e.target.value);
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        if (selectedOption === "byUserId" && !selectedUser) {
          setError("Please select a user.");
          return;
        }
    
        if (!message.trim()) {
          setError("Please enter a message.");
          return;
        }
    
        setError("");
    
        const notificationData = {
          type: selectedOption,
          userId: selectedOption === "byUserId" ? selectedUser : null,
          message: message.trim(),
        };
    
        console.log(notificationData,"#####");

        const sentNotification=(notificationData)=>{
            sendNotification(notificationData).then((value)=>{
                if(value.data.status){
                    toast.success(value.data.message)
                    setMessage("")
                    setSelectedUser("")
                    setUserlist("")
                    setSelectedOption("")
                }else{
                    toast.error(value.data.message)
                }
            })
        }
        sentNotification(notificationData)
    }
  return (
    <div id='addiv'>
        <h1 id='adt12'>Notification</h1><br /><br />
        <form onSubmit={handleSubmit} id="adform12">
            <div  id='adminnot'>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"
                    value="byUserId"
                    checked={selectedOption === 'byUserId'}
                    onChange={handleOptionChange}/>
                    <label class="form-check-label" for="flexRadioDefault1">By userID</label>
                </div>
                <div class="form-check" id='secondradio'>
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                    value="global"
                    checked={selectedOption === 'global'}
                    onChange={handleOptionChange}/>
                    <label class="form-check-label" for="flexRadioDefault2">Global</label>
                </div>
            </div>
            {selectedOption==="byUserId"&&(
                <div id="userIdInput">
                <select
                  id="admnnotif"
                  name="userId"
                  className="dropDown"
                  value={selectedUser}
                  onChange={handleUserChange}
                >
                  <option value="">Select User</option>
                  {userList.map((value, index) => (
                    <option
                      className="optionText"
                      key={index}
                      value={value?._id}
                    >
                      {value?.username}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
        <textarea name="msg" id="msg" placeholder='Enter the message...'
        value={message}
        onChange={handleMessageChange}/>
        <br />
        {error && <p className="error">{error}</p>}
        <br />
        <input type="submit" value={"Send"} id="adsubmit2"/><br/>
        </form>
    </div>
  )
}
