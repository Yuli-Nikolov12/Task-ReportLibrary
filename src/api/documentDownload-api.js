import * as request from './requester'

const BASE_CLIENT_URL = "https://demos.telerik.com/reporting/api/reports/clients";

export const getDocumentID = async (clientID, instanceID, format) => {
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

    return { statusInfo }
}

export const getReportPreview = async (clientID, instanceID, docID) => {
    const reportPreview = await request.get(`${BASE_CLIENT_URL}/${clientID}/instances/${instanceID}/documents/${docID}/pages/1`);

    return { reportPreview }
}

export const downloadDocument = async (clientID, instanceID, docID) => {
    const options = {};
    options.method = 'GET';

    const downloadStatus = await fetch(`${BASE_CLIENT_URL}/${clientID}/instances/${instanceID}/documents/${docID}?response-content-disposition=attachment`, options);
    
    if(downloadStatus.status === 200) {
        window.location.href = downloadStatus.url;
    }
}

export default { getDocumentID, getDocuementInfo, downloadDocument, getReportPreview };