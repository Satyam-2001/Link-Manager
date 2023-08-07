import axios from 'axios';

const BASE_URL = 'https://link-manager-9p5o.onrender.com'
// const BASE_URL = 'http://localhost:3000'

export async function callAPI(method, route, data) {
    const options = {
        method,
        url: `${BASE_URL}/${route}`,
        data,
    }
    if (method != 'get') {
        const token = localStorage.getItem('token')
        options.headers = { 'Authorization': `Bearer ${token}` }
    }
    try {
        const response = await axios(options)
        return response.data
    } catch (e) {
        if (e.response.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.replace('/login');
        }
        throw e
    }
}
