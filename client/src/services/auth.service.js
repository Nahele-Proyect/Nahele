import axios from 'axios'

export default class Services {

    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_URL}/auth`,
            withCredentials: true
        })
    }

    signup = ({ username, password, confirmPassword, email }) => this.service.post('/signup', { username, password, confirmPassword, email }).then(response => response.data)
    login = ({ username, password }) => this.service.post('/login', { username, password }).then(response => response.data)
    logout = () => this.service.post('/logout').then(response => response.data)
    loggedin = () => this.service.get('/loggedin').then(response => response.data)
    updateUsername = ({ username }) => this.service.put('/updateUsername', { username }).then(response => response.data)
    updatePassword = ({ password, confirmPassword }) => this.service.put('/updatePassword', { password, confirmPassword }).then(response => response.data)
    updateEmail = ({ newEmail, oldEmail }) => this.service.put('/updateEmail', { newEmail, oldEmail }).then(response => response.data)
    updateImg = ({ img }) => this.service.put('/updateImg', { img }).then(response => response.data)

}