import axios from 'axios'

export default class Services {
    constructor() {
        this.service = new axios.create({
            baseURL: "http://localhost:5000/api/scrap",
            withCredentials: true
        })
        this.axiosCancelSource = axios.CancelToken.source()
    }
    getAll = () => this.service.get('/', { cancelToken: this.axiosCancelSource.token }).then(response => response.data)
    getDetails = endpoint => this.service.get('/details/' + endpoint, { cancelToken: this.axiosCancelSource.token }).then(response => response.data)
    cancelAll = () => this.axiosCancelSource.cancel('Component unmounted.')
}