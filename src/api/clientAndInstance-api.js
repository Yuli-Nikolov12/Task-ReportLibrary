import * as request from './requester'

const CLIENT_URL = "https://demos.telerik.com/reporting/api/reports/clients" // POST only
// For Instance POST and Body (in body {"report":"Dashboard.trdx"})

export const clientIDAndInstanceID = async (report) => {
    const clientID = await request.post(CLIENT_URL);

    const instnaceID = await request.post(`${CLIENT_URL}/${Object.values(clientID)}/instances`, {report});

    return {clientID, instnaceID};
}


export default { clientIDAndInstanceID };