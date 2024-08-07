import React, { useEffect, useState } from 'react'
import './AppManagement.css'
import { approveApp, blockApp, totalApplications } from '../../../Services/adminApi'
import { toast } from 'react-toastify'

export default function AppManagement() {
    const [appDetails, setAppDetails] = useState([])
    useEffect(() => {
        totalApplications().then((value) => {
            setAppDetails(value.data.Data)
        })
    }, [])

    const testApplication = (apkFile) => {
        const fileUrl = `http://localhost:4000/img/${apkFile}`;
        const link = document.createElement("a");
        link.href = fileUrl;
        link.setAttribute("download", "");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const approveApplication = (appId) => {
        approveApp(appId).then((value) => {
            console.log(value.verified, "ascsdaccsacass")
            if (value?.data?.status) {
                toast.success(value?.data?.message);
            } else {
                toast.error("Unable to approve")
            }
        })
    };
    const applicationBlock = (appId) => {
        blockApp(appId).then((value) => {
            console.log(value?.data?.appDetails);
            console.log(value.verified, "ascsdacs")
            if (value?.data?.status) {
                toast.success(value?.data?.message);
            } else {
                toast.error("Unable to block application");
            }
        })
    };

    return (
        <div>

            <div class="div2" id='div2'>
                <section>
                    <div class="container">
                        <div class="row">
                            <h2>App Management</h2>
                            {appDetails.map((value, index) => (
                                <div id='ambox' key={index}>
                                    <input type="text" id='amt1' value={value?.appName} readOnly />
                                    <input type="text" id='amt2' value={value?.devName} readOnly />
                                    <input type="text" id='amt3' value={value?.userId?.email} readOnly />
                                    <button id='amb1'><i class="bi bi-file-earmark-break" id='ami1'></i>Test</button>
                                    {value.verified ? (
                                        <span className="bi bi-clipboard-check approved" id="amb2">
                                            Approved
                                        </span>
                                    ) : (
                                        <button id='amb23' onClick={() => { approveApplication(value?._id); }}><i class="bi bi-clipboard-check" id='ami1'></i>Approve</button>
                                    )}

                                    <button id='amb3' onClick={() => applicationBlock(value?._id)}><i class="bi bi-ban" id='ami1'></i>Block</button>
                                </div>
                            ))}

                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}