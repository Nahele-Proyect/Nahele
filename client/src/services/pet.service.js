import axios from 'axios'
import { ResponsiveBreakpoints } from '@amcharts/amcharts4/core'

export default class PetServices {
    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_URL}/pet`,
            withCredentials: true
        })
    }
    createPet = petData => this.service.post('/new', petData).then(response => response.data)
    getOnePet = petId => this.service.get('/find/' + petId).then(response => response.data)
}