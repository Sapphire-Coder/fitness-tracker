import axios from 'axios'

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