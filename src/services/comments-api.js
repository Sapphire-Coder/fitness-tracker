import axios from 'axios'
import authHeader from './auth-header'

const URL = 'http://localhost:3001/comments/'

export const getComments = id => {
    return axios.get(`${URL}${id}`, { headers: authHeader() })
}

export const getComment = id => {
    return axios.get(`${URL}${id}`, { headers: authHeader() })
}

export const deleteComment = id => {
    return axios.delete(`${URL}${id}`, { headers: authHeader() })
}

export const createComment = createdComment => {
    return axios.post(`${URL}`, createdComment, { headers: authHeader() })
}

export const updateComment = (id, updatedComment) => {
    return axios.put(`${URL}${id}`, updatedComment, { headers: authHeader() })
}