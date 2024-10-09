import * as request from './requester'

const BASE_CLIENT_URL = "https://demos.telerik.com/reporting/api/reports/clients" // POST and Body with the format
  
const CHECK_RESPONCE_BEFORE_DOWNLOAD_URL = "https://demos.telerik.com/reporting/api/reports/clients/:clinetID/instances/:instanceId/documents/:docID/info" // GET wait the responce become 200 and then execute download
        
const DOWNLOAD_URL = "https://demos.telerik.com/reporting/api/reports/clients/:clinetID/instances/:instanceId/documents/:docID?response-content-disposition=attachment" // GET

export const getDocumentID = async (clientID, instanceID, format) => {
    console.log(clientID, instanceID, format);

    const documentID = await request.post(`${BASE_CLIENT_URL}/${clientID}/instances/${instanceID}/documents`, {format: Object.values(format)[0], useCache: true, deviceInfo: {BasePath: '/reporting/api/reports',enableSearch: true}});

    return {documentID};
}

export const getDocuementInfo = async (clientID, instanceID, docID) => {
    const retryCodes = [202];
    const options = {};
    options.method = 'GET';

    const statusInfo = await fetch(`${BASE_CLIENT_URL}/${clientID}/instances/${instanceID}/documents/${docID}/info`, options)
    .then(res => {
        if (res.ok && res.status === 200) return res;

        if (retryCodes.includes(res.status)) {
            return getDocuementInfo(clientID, instanceID, docID)
        }
    })
    //await request.get(`${BASE_CLIENT_URL}/${clientID}/instances/${instanceID}/documents/${docID}/info`);

    return { statusInfo }
}

export const downloadDocument = async (clientID, instanceID, docID) => {
    const options = {};
    options.method = 'GET';
    options.headers = {
        'Sec-Fetch-Dest': 'document',
    }

    await fetch(`${BASE_CLIENT_URL}/${clientID}/instances/${instanceID}/documents/${docID}?response-content-disposition=attachment`, options);
}


export default { getDocumentID, getDocuementInfo, downloadDocument };