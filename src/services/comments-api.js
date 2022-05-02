import axios from 'axios'
import authHeader from './auth-header'

const URL = 'https://jmfitness-api.herokuapp.com/comments/'

export const getComments = id => {
    return axios.get(`${URL}${id}`, { headers: authHeader() })
}

export const deleteComment = id => {
    return axios.delete(`${URL}${id}`, { headers: authHeader() })
}

export const createComment = createdComment => {
    return axios.post(`${URL}`, createdComment, { headers: authHeader() })
}