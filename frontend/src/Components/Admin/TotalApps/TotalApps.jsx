import React, { useEffect, useState } from 'react';
import './TotalApps.css';
import { totalApplications } from '../../../Services/adminApi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { appAddtoProfile } from '../../../Services/userApi';

export default function TotalApps() {
  const [appDetails, setAppDetails] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [selectedOS, setSelectedOS] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const userId = useSelector((state) => state?.user?.value?._id);

  useEffect(() => {
    totalApplications().then((value) => {
      setAppDetails(value.data.Data);
    });
  }, []);

  useEffect(() => {
    filterGames();
  }, [selectedOS, searchQuery, appDetails]);

  const handleOSChange = (e) => {
    setSelectedOS(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filterGames = () => {
    let filtered = appDetails;

    if (selectedOS) {
      filtered = filtered.filter((apps) => apps.OS === selectedOS);
    }

    if (searchQuery) {
      filtered = filtered.filter((app) =>
        app.appName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    console.log("Filtered Apps:", filtered);
    setFilteredApps(filtered);
  };

  const handleDownloadApp = (apkFile, appId) => {
    appAddtoProfile(userId, appId).then(() => {});

    const fileUrl = `http://localhost:4000/img/${apkFile}`;
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div id='div2'>
        <div id='anav'>
          <select name="" id="hosfilter" onChange={handleOSChange}>
            <option value="">Choose OS</option>
            <option value="Windows">Windows</option>
            <option value="Linux">Linux</option>
            <option value="Mac">Mac</option>
          </select><br /><hr id='hhrfilter' />
          <input type="text" id='hsearch' onChange={handleSearchChange} placeholder='Search..' />
          <button id='hsearchicon'><i className="bi bi-search" id='hsearch1'></i></button>
        </div>
        <h2 id='th2'>Apps Details</h2>
        <table className="table table-striped table-hover" id='tapps'>
          <thead>
            <tr>
              <th scope="col">SL.No</th>
              <th scope="col">Icon</th>
              <th scope="col">App Name</th>
              <th scope="col">Category</th>
              <th scope="col">OS</th>
              <th scope="col">Download</th>
            </tr>
          </thead>
          <tbody>
            {filteredApps.map((value, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td><img id='timg' src={`http://localhost:4000/img/${value.appIcon}`} alt="App icon" /></td>
                <td>{value?.appName}</td>
                <td>{value?.Category}</td>
                <td>{value?.OS}</td>
                <td><i className="bi bi-download" id='dwnld' onClick={() => navigate(`../admin_install/${value?._id}`)}></i></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
