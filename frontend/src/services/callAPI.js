import axios from 'axios';

// const BASE_URL = 'https://link-manager-9p5o.onrender.com'
const BASE_URL = 'http://localhost:3000'

export async function callAPI(method, route, data) {
    const response = await axios({
        method,
        url: `${BASE_URL}/${route}`,
        data,
    })
    return response.data
}
