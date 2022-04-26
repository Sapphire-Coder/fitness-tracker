import axios from 'axios'
import authHeader from './auth-header'

const URL = 'http://localhost:3001/posts/'

export const getPosts = () => {
    return axios.get(URL, { headers: authHeader() })
}

export const getPost = id => {
    return axios.get(`${URL}${id}`, { headers: authHeader() })
}

export const deletePost = id => {
    return axios.delete(`${URL}${id}`, { headers: authHeader() })
}

export const createPost = createdPost => {
    return axios.post(`${URL}`, createdPost, { headers: authHeader() })
}

export const updatePost = (id, updatedPost) => {
    return axios.put(`${URL}${id}`, updatedPost, { headers: authHeader() })
}