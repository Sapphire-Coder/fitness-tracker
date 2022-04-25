import axios from 'axios'
import authHeader from './auth-header'

const URL = 'http://localhost:3001/users/'

export const createAccount = createdUser => {
    return axios.post(URL, createdUser)
}

export const loginUser = loginAttempt => {
    return axios.post(`${URL}login`, loginAttempt).then(res => {
        if(res.data.accessToken){
            localStorage.setItem('user', JSON.stringify(res.data))
            localStorage.setItem('isAuth', true)
        }
        return res.data
    })    
}

export const findUser = () => {
    return axios.get(`${URL}user`, { headers: authHeader() })
}