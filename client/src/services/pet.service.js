import axios from 'axios'

export default class PetServices {
    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_URL}/pet`,
            withCredentials: true
        })
    }
    createPet = petData => this.service.post('/new', petData).then(response => response.data)
    getOnePet = petId => this.service.get('/find/' + petId).then(response => response.data)
    deleteOnePet = petId => this.service.delete('/delete/' + petId).then(response => response.data)
}