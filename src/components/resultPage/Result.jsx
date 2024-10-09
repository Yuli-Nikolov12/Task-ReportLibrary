import './Result.css'

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import documentDownloadApi from '../../api/documentDownload-api';

export default function Result() {
    const location = useLocation();
    const [disableButton, setDisableButton] = useState(false);

    const { clientID, instanceID, selecteFormat } = location.state;


    if(Object.values(selecteFormat)[0] === "" || Object.values(selecteFormat)[0] === '--Select--'){
        if(disableButton === false) {
            setDisableButton(true);
        }
    }

    const handleClick = async () => {
        const { documentID } = await documentDownloadApi.getDocumentID(Object.values(clientID), Object.values(instanceID), Object.values(selecteFormat));
        console.log(documentID);
          
        await documentDownloadApi.getDocuementInfo(Object.values(clientID), Object.values(instanceID), Object.values(documentID));
        
        await documentDownloadApi.downloadDocument(Object.values(clientID), Object.values(instanceID), Object.values(documentID));
    }

    const getTheCurrentClientIdAndInstanceId = () => {
        //const CLIENT_URL = "https://demos.telerik.com/reporting/api/reports/clients" // POST only
        //const INSTANCE_URL = "https://demos.telerik.com/reporting/api/reports/clients/:clinetID/instances" // POST and Body (in body {"report":"Dashboard.trdx"})
  
        const DOCID_URL = "https://demos.telerik.com/reporting/api/reports/clients/:clinetID/instances/:instanceId/documents" // POST and Body with the format
  
        const CHECK_RESPONCE_BEFORE_DOWNLOAD_URL = "https://demos.telerik.com/reporting/api/reports/clients/:clinetID/instances/:instanceId/documents/:docID/info" // wait the responce become 200 and then execute download
        
        const DOWNLOAD_URL = "https://demos.telerik.com/reporting/api/reports/clients/:clinetID/instances/:instanceId/documents/:docID?response-content-disposition=attachment" // GET
      }

    return (
        <>
            <h2>Client ID: {Object.values(clientID)}</h2>
            <p></p>
            <h2>Instance ID: {Object.values(instanceID)}</h2>
            <p></p>
            <h2>Selected Format: {Object.values(selecteFormat)}</h2>
            {disableButton && <p className="disableText">Please, navigate back and select a Format to be able to Download!</p>}
            <button disabled={disableButton} onClick={handleClick}>Downolad</button>
        </>
    )
}