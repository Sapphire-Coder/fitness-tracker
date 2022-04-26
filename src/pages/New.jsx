import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createWorkout } from '../services/workouts-api'

export default function New() {

    const navigate = useNavigate()

    useEffect(() => {
        if(!localStorage.isAuth || JSON.parse(localStorage.isAuth) == false) navigate('/login')
    }, [])

    const newWorkout = e => {
        e.preventDefault()
        const workout = {
            exercises: [{
                name: e.target.name.value,
                reps: e.target.reps.value,
                sets: e.target.sets.value
            }], 
            calories: e.target.calories.value 
        }
        createWorkout(workout)
        navigate('/')
    }

    return (
        <div className = 'main'>
            <div>
                <form id = 'userWorkout' onSubmit = {newWorkout}>
                    <label>Exercise: </label>
                    <input type = 'text' name = 'name'/>
                    <input type = 'number' name = 'reps' min = '0'/>
                    <input type = 'number' name = 'sets' min = '0'/>
                    <label>Calories:</label>
                    <input type = 'number' name = 'calories' min = '0'/>
                    <input type = 'submit' />
                </form>
            </div>
        </div>
    )
}