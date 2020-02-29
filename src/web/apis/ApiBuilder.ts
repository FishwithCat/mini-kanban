import axios from 'axios';

export const Request = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    timeout: 10000,
    baseURL: '/api'
})
