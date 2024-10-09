import { useLocation } from "react-router-dom";

export default function Result() {
    const location = useLocation();

    const { clientID, instanceID, selecteValue } = location.state;
    const getTheCurrentClientIdAndInstanceId = () => {
        const CLIENT_URL = "https://demos.telerik.com/reporting/api/reports/clients" // POST only
        const INSTANCE_URL = "https://demos.telerik.com/reporting/api/reports/clients/:clinetID/instances" // POST and Body (in body {"report":"Dashboard.trdx"})
  
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
            <h2>Selected Format: {Object.values(selecteValue)}</h2>
        </>
    )
}