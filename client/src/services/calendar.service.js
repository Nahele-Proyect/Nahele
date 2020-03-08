import axios from "axios"

export default class Services {
    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_URL}/calendar`,
            withCredentials: true
        })
    }
    postCalendar = (calendar, id) => this.service.post(`/new/${id}`, calendar).then(response => response.data)
    deleteCalentar = id => this.service.delete(`/delete/${id}`, id).then(response => response.data)
}