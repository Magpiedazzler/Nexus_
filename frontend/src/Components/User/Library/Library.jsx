import React, { useEffect, useState } from 'react'
import './Library.css'
import { useSelector } from 'react-redux'
import { getUserInstalledApps, getWishlistApps } from '../../../Services/userApi'

export default function Library() {
    const [installedApp, setInstalledApp] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [filteredAllApps, setFilteredAllApps] = useState([]);
    const [selectedOS, setSelectedOS] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [view, setView] = useState('installed');
    const [selectedButton, setSelectedButton] = useState('ALL');
    const userId = useSelector((state) => state?.user?.value?._id);

    useEffect(() => {
        loadInstalledApps();
    }, []);

    useEffect(() => {
        filterApps();
    }, [selectedOS, searchQuery, view]);

    const loadInstalledApps = () => {
        getUserInstalledApps().then((value) => {
            console.log(value?.data);
            if (value?.data?.status) {
                setInstalledApp(value?.data?.apps);
                setFilteredAllApps(value?.data?.apps);
                setView("installed");
                setSelectedButton('ALL');
            }
        });
    };

    const loadWishlist = () => {
        getWishlistApps().then((value) => {
            console.log(value?.data);
            if (value?.data?.status) {
                setWishlist(value?.data?.data);
                setFilteredAllApps(value?.data?.data);
                setView("wishlist");
                setSelectedButton('Wishlist');
            }
        });
    };

    const handleOSChange = (e) => {
        console.log(e.target.value, "VAl !!!!");
        setSelectedOS(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filterApps = () => {
        let apps = view === "installed" ? installedApp : wishlist;

        if (selectedOS) {
            apps = apps.filter((app) => app.OS === selectedOS);
        }

        if (searchQuery) {
            apps = apps.filter((app) =>
                (app.appName || app.appDetails?.appName)
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
            );
        }

        setFilteredAllApps(apps);
    };

    return (
        <div>
            <div class="div2" id='div2'>
                <section>
                    <div class="container">
                        <div class="row">
                            <h2>Library</h2><br /><br />
                            <div id='homenav'>
                                <select name="" id="uosfilter" onChange={handleOSChange}>
                                    <option value="">Choose OS</option>
                                    <option value="Windows">Windows</option>
                                    <option value="Linux">Linux</option>
                                    <option value="Mac">Mac</option>
                                </select><br />
                                <input type="text" id='usearch' placeholder='Search..' onChange={handleSearchChange} />
                                <button id='usearchicon'><i class="bi bi-search" id='usearch1'></i></button>
                            </div>
                            <div>
                                <button type="button" class={`btn btn-outline-primary ${selectedButton === 'ALL' ? 'active-button' : ''}`} id='libb1' onClick={loadInstalledApps}>ALL</button>
                                <button type="button" class={`btn btn-outline-secondary ${selectedButton === 'Wishlist' ? 'active-button' : ''}`} id='libb2' onClick={loadWishlist}>Wishlist</button>
                            </div><br /><br />
                            {view === 'wishlist' ? (
                                filteredAllApps.length > 0 ? (
                                    filteredAllApps.map((value, index) => (
                                        <div class="card" id='ldiv' key={index}>
                                            <img src={`http://localhost:4000/img/${value?.appDetails?.appIcon}`} class="card-img-top" id='limg' alt="App Logo" />
                                            <div class="card-body">
                                                <h5 class="card-title" id='lh1'>{value?.appDetails?.appName}</h5>
                                                <a href="#" class="btn btn-primary" id='la'>Downloaded</a>
                                            </div>
                                        </div>
                                    ))
                                ) : (<p>Empty Wishlist</p>)
                            ) : view === 'installed' ? (
                                filteredAllApps.length > 0 ? (
                                    filteredAllApps.map((value, index) => (
                                        <div class="card" id='ldiv' key={index}>
                                            <img src={`http://localhost:4000/img/${value?.appIcon}`} class="card-img-top" id='limg' alt="App Logo" />
                                            <div class="card-body">
                                                <h5 class="card-title" id='lh1'>{value?.appName}</h5>
                                                <a href="#" class="btn btn-primary" id='la'>Downloaded</a>
                                            </div>
                                        </div>
                                    ))
                                ) : (<p>Empty Library</p>)
                            ) : null}

                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
