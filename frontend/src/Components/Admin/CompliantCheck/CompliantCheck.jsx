import React, { useEffect, useState } from 'react'
import './CompliantCheck.css'
import { viewCompliant } from '../../../Services/adminApi'
import { getSelectedAppsDetails } from '../../../Services/userApi'

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
        
        <div class="div2" id='div2'>
            <section>
                <div class="container">
                    <div class="row">
                            <h2>Compliants</h2>
                            {compliants.map((value,index)=>(
                                <div id='ccbox'>
                                
                                <input type="text" id='cct1' value={value?.userId?.email} readOnly/>
                                <input type="text" id='cct2' value={appNames[value?.appId]} readOnly/>
                                <input type="text" id='cct3' value={value?.reportCategory} readOnly/>
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" id='ccb1' aria-expanded="false" aria-controls="collapseOne">
                                    View<i class="bi bi-chevron-down" id='cci1'></i>
                                </button>
                                    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <p>{value?.reportMessage}</p>
                                    </div>
                                </div>
                            </div>
                            ))}
                            
                    </div>
                </div>
            </section>
        </div>
    </div>
  )
}
