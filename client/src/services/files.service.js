import axios from 'axios'

export default class Services {

    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_URL}/files`,
            withCredentials: true
        })
    }
    handleUpload = theFile => this.service.post('/upload', theFile).then(response => response.data)
    uploadImage = img => this.service.post('/uploadImage', img).then(response => response.data)

}