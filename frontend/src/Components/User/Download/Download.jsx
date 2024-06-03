import React, { useEffect, useState } from 'react'
import './Download.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { addToWishlist, appAddtoProfile, getSelectedAppsDetails } from '../../../Services/userApi'
import { toast } from 'react-toastify'

export default function Download() {
    const appId = useParams().id
    console.log(appId,"++++++++++++++++")
    const [selectedData, setSelectedData] = useState([])
    const userId = useSelector((state) => state?.user?.value?._id)
    const navigate = useNavigate()
    const DownloadSelectedApp = (apkFile, appId) => {
        appAddtoProfile(userId, appId).then((value) => {
            console.log(value, "Data Downloaded");
        });
        const fileUrl = `http://localhost:4000/img/${apkFile}`
        const link = document.createElement("a")
        link.href = fileUrl
        link.setAttribute("download", "")
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    };

    const addToWishlistFun = (userId, Data) => {
        addToWishlist(userId, Data).then((value) => {
            if (value?.data?.status) {
                toast.success(value?.data?.message)
            } else {
                toast.error(value?.data?.message)
            }
        })
    }

    useEffect(() => {
        getSelectedAppsDetails(appId).then((value) => {
            console.log(value,"//////////////////")
            if (value?.data?.status) {
                setSelectedData(value?.data?.appData)
            }
        })
    }, []);
    return (
        <div>
            <div class="div2" id='div2'>
                <section>
                    <div className="container">
                        <div className="row">
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" id='second_div'>
                                <div align='center'>
                                    <img src={`http://localhost:4000/img/${selectedData?.appIcon}`} alt="Sample app icon" id='img111' />
                                </div><br />
                                <h3 id='head1' align='center'>{selectedData?.appName}</h3><br />
                                <h6 id='head2' align='center'>{selectedData?.publisherName}</h6><br />
                                <div className="appLogo" align="center">
                                    <button
                                        type="button"
                                        name=""
                                        id="btn2"
                                        onClick={() =>
                                            DownloadSelectedApp(
                                                selectedData?.apkFile,
                                                selectedData?._id
                                            )
                                        }
                                    >
                                        Download
                                    </button>

                                </div>
                                <div align='center' id='downloadcate'>
                                    <label htmlFor="" id='lab3' align='center'>{selectedData?.Category}</label>
                                </div>
                                <div align='center'>
                                    <button id='btn333' align='center'  onClick={() => navigate(`/report/${selectedData?._id}`)}><i class="bi bi-flag" id='flag'></i>Report app</button>
                                    <button id='btn4444' align='center' onClick={() => addToWishlistFun(userId, selectedData)}><i class="bi bi-heart" id='flag'></i>Add to wishlist</button>
                                </div>
                                <div align="center">
                                    <button id='btn555' align='center' onClick={() => navigate(`/rating/${selectedData?._id}`)}><i class="bi bi-award" id='flag'></i>Rate</button>
                                </div>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" id='third_div'>
                                <div align='center' id='subdiv2'>
                                    <h4 id='divh'>Screen Shots</h4><br /><hr id='imghr' /><br />
                                    <img src={`http://localhost:4000/img/${selectedData?.appScreenshot}`} alt="Sample screen shots" id='img2' />
                                </div>
                                <div align='center' id='subdiv3'>
                                    <h4 id='divh'>Description</h4><br /><hr id='deschr' /><br />
                                    <p>{selectedData?.appDescription}</p>
                                </div>
                                <div id='subdiv4'>
                                    <h4 id='divh1' align='center'>System Requirements</h4><br /><hr id='srhr' /><br />
                                    <ul>
                                        <li>Available on : {selectedData?.OS} OS</li>
                                        <li>Architecture : 64x</li>
                                        <li>Keyboard : yes</li>
                                        <li>Mouse : yes</li>
                                        <li>RAM : min 4 GB</li>
                                        <li>Storage Space : min 10 GB free</li>
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
