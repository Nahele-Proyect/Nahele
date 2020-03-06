import axios from 'axios'

export default class PetServices {
    constructor() {
        this.service = axios.create({
            baseURL: 'http://localhost:5000/api/pet',
            withCredentials: true
        })
    }
    createPet = petData => this.service.post('/new', petData).then(response => response.data)
}