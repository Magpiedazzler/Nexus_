import React, { useEffect, useState } from 'react';
import './TotalUsers.css';
import { userlist } from '../../../Services/adminApi';

export default function TotalUsers() {
    const [userDetails, setUserDetails] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        userlist().then((value) => {
            console.log(value.data, "$$$$$");
            setUserDetails(value?.data?.userlist);
            setFilteredUsers(value?.data?.userlist);
        });
    }, []);

    useEffect(() => {
        filterUsers();
    }, [searchQuery, userDetails]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filterUsers = () => {
        const filtered = userDetails.filter((user) => 
            user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.contactNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    return (
        <div>
            <div id='div2'>
                <div id='anav1'>
                    <input 
                        type="text" 
                        id='hsearch' 
                        placeholder='Search..' 
                        onChange={handleSearchChange}
                    />
                    <button id='hsearchicon'>
                        <i className="bi bi-search" id='hsearch1'></i>
                    </button>
                </div>
                <h2 id='th2'>User Details</h2>
                <table className="table table-striped table-hover" id='tuser'>
                    <thead>
                        <tr>
                            <th scope="col">SL.No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Contact No</th>
                            <th scope="col">Email ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((value, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{value.username}</td>
                                    <td>{value.contactNo}</td>
                                    <td>{value.email}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center' }}>No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
