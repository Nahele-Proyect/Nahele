import axios from 'axios'

export default class PetServices {
    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_URL}/pet`,
            withCredentials: true
        })
    }
    getAllPets = () => this.service.get('/getAllPets').then(response => response.data)
    createPet = petData => this.service.post('/new', petData).then(response => response.data)
    newScraped = scrapedPet => this.service.post('/newScraped', scrapedPet).then(response => response.data)
    getOnePet = petId => this.service.get('/find/' + petId).then(response => response.data)
    deleteOnePet = petId => this.service.delete('/delete/' + petId).then(response => response.data)
    addRequest = (id, requestInfo) => this.service.post('/addRequest/' + id, requestInfo).then(response => response.data)
}