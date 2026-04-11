import axios from 'axios'


const api = axios.create({
    baseURLhttp:'http://localhost:3333/api',
    withCredentials: true
})

export default api