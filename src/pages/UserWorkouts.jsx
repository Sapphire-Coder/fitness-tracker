import { useEffect, useState } from 'react'
import { getWorkouts } from '../services/workouts-api'
import { useNavigate } from 'react-router-dom'
import { deleteWorkout } from '../services/workouts-api'

export default function UserWorkouts() {

    const navigate = useNavigate()

    const [data, setData] = useState([])

    useEffect(() => {
        if(!localStorage.isAuth || JSON.parse(localStorage.isAuth) == false) navigate('/login')
        getWorkouts().then(res => setData(res.data))
    }, [])

    return (
        <div className = 'main'>
            <div id = 'userContainer'>
                {
                    data.map((workout, i) => {
                        return (
                            <div key = {i}>
                                <h2>Workout {i + 1}</h2>
                                {
                                    workout.exercises.map((exercise, j) => {
                                        return (
                                            <div key = {j}>
                                                <h3>Exercise: {exercise.name}</h3>
                                                <h3>Reps: {exercise.reps}</h3>
                                                <h3>Sets: {exercise.sets}</h3>
                                            </div>
                                        )

                                    })
                                }
                                <h3>Calories: {workout.calories}</h3>
                                <button onClick = {() => deleteWorkout(workout._id)}>Delete Workout</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}