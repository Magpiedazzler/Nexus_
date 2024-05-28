import React, { useEffect, useState } from 'react';
import './LinuxApps.css';
import { fetchAllLinuxApps } from '../../../Services/adminApi';

export default function LinuxApps() {
  const [linuxApps, setLinuxApps] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchAllLinuxApps().then((value) => {
      if (value?.data?.status) {
        setLinuxApps(value?.data?.data);
      }
    });
  }, []);

  useEffect(() => {
    filterApps();
  }, [searchQuery, linuxApps]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filterApps = () => {
    let filtered = linuxApps;

    if (searchQuery) {
      filtered = filtered.filter((app) =>
        app.appName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    console.log("Filtered Apps:", filtered);
    setFilteredApps(filtered);
  };

  return (
    <div>
      <div id='div2'>
        <div id='anav1'>
          <input
            type="text"
            id='hsearch'
            onChange={handleSearchChange}
            placeholder='Search..'
          />
          <button id='hsearchicon'>
            <i className="bi bi-search" id='hsearch1'></i>
          </button>
        </div>
        <h2 id='th2'>Apps for Linux</h2>
        
        <table className="table table-striped table-hover" id='tlinux'>
          <thead>
            <tr>
              <th scope="col">SL.No</th>
              <th scope="col">Icon</th>
              <th scope="col">App Name</th>
              <th scope="col">Category</th>
            </tr>
          </thead>
          <tbody>
            {filteredApps.length > 0 ? (
              filteredApps.map((value, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <img
                      id='timg'
                      src={`http://localhost:4000/img/${value.appIcon}`}
                      alt="App icon"
                    />
                  </td>
                  <td>{value.appName}</td>
                  <td>{value.Category}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>Empty</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
