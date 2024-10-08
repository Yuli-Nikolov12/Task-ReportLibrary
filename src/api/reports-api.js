export const allReports = async () => {
    const options = {};
    options.method = 'GET';

    const htmlElementResult = await fetch('https://demos.telerik.com/reporting', options);
    const result = await htmlElementResult.text();

    return result;
}

export default { allReports };
