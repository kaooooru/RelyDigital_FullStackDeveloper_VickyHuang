import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const createInfo = payload => api.post(`/`, payload)
export const getInfo = () => api.get(`/`)

const apis = {
    createInfo,
    getInfo,
}

export default apis