async function requester(method, url, data) {
    const options = {};

    if(method !== 'GET') {
        options.method = method;
    }

    if(data) {
        options.headers = {
            'Content-Type': 'application/json',
        };

        options.body = JSON.stringify(data);
    }
    console.log(data)
    console.log(options.body)
    const response = await fetch(url, options);
    
    if (response.status === 202 && method === 'GET') {
        return response;
    }
    
    const result = await response.json();
    
    if(!response.ok){
        throw new Error (result.message);
    }

    return result;
}

export const get = requester.bind(null,'GET');
export const post = requester.bind(null,'POST');