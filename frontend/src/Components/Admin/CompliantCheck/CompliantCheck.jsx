import React, { useEffect, useState } from 'react';
import './CompliantCheck.css';
import { viewCompliant } from '../../../Services/adminApi';
import { getSelectedAppsDetails } from '../../../Services/userApi';

export default function CompliantCheck() {
    const [compliants, setCompliants] = useState([]);
    const [appNames, setAppNames] = useState({});

    useEffect(() => {
        viewCompliant().then((value) => {
            if (value?.data?.status) {
                const complaints = value.data.complaintDetails;
                setCompliants(complaints);
                const appIds = [...new Set(complaints.map(complaint => complaint.appId))];
                const fetchAppNames = async () => {
                    const appNamesMap = {};
                    for (const appId of appIds) {
                        const response = await getSelectedAppsDetails(appId);
                        if (response?.data?.appData) {
                            appNamesMap[appId] = response.data.appData.appName;
                        }
                    }
                    setAppNames(appNamesMap);
                };

                fetchAppNames();
            }
        });
    }, []);

    return (
        <div>
            <div className="div2" id='div2'>
                <section>
                    <div className="container">
                        <div className="row">
                            <h2>Compliants</h2>
                            {compliants.map((value, index) => {
                                const collapseId = `collapse${index}`;
                                return (
                                    <div id='ccbox' key={index}>
                                        <input type="text" id='cct1' value={value?.userId?.email} readOnly />
                                        <input type="text" id='cct2' value={appNames[value?.appId]} readOnly />
                                        <input type="text" id='cct3' value={value?.reportCategory} readOnly />
                                        <button
                                            className="accordion-button"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#${collapseId}`}
                                            id='ccb1'
                                            aria-expanded="false"
                                            aria-controls={collapseId}
                                        >
                                            View<i className="bi bi-chevron-down" id='cci1'></i>
                                        </button>
                                        <div
                                            id={collapseId}
                                            className="accordion-collapse collapse"
                                        >
                                            <div className="accordion-body">
                                                <p>{value?.reportMessage}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
