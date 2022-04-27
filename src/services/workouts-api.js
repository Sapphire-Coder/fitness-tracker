import authHeader from './auth-header'
import axios from 'axios'

const URL = 'http://localhost:3001/workouts/'

export const getWorkouts = () => {
    return axios.get(URL, { headers: authHeader() })
}

export const getWorkout = id => {
    return axios.get(`${URL}${id}`, { headers: authHeader() })
}

export const deleteWorkout = id => {
    return axios.delete(`${URL}${id}`, { headers: authHeader() })
}

export const createWorkout = createdWorkout => {
    return axios.post(URL, createdWorkout, { headers: authHeader() })
}

export const updateWorkout = (id, updatedWorkout) => {
    return axios.put(`${URL}${id}`, updatedWorkout, { headers: authHeader() })
}