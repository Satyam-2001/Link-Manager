import axios from 'axios';

const BASE_URL = 'https://link-manager-9p5o.onrender.com'

export async function callAPI(method, route, data) {
    const response = await axios({
        method,
        url: `${BASE_URL}/${route}`,
        data,
    })
    return response.data
}
