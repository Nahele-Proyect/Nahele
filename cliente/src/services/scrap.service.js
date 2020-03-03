import axios from 'axios'

export default class Services {
    constructor() {
        this.service = new axios.create({
            baseURL: "http://localhost:5000/api/scrap",
            withCredentials: true
        })
    }
    getAll = () => this.service.get('/').then(response => response.data)
    getDetails = endpoint => this.service.get('/details/' + endpoint).then(response => response.data)
}