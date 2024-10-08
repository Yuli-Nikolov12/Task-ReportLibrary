import * as request from './requester'

const REPORTS_FORMATS_URL = 'https://demos.telerik.com/reporting/api/reports/formats';

export const allAvailableFormats = async () => {
    const result = await request.get(REPORTS_FORMATS_URL);

    return result;
}

export default { allAvailableFormats };