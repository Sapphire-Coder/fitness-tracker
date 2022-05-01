import { useEffect, useState } from 'react'
import { getWorkouts } from '../services/workouts-api'
import { useNavigate } from 'react-router-dom'
import { deleteWorkout } from '../services/workouts-api'
import Navbar from '../components/Navbar'

export default function UserWorkouts() {

    const navigate = useNavigate()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(!localStorage.isAuth || JSON.parse(localStorage.isAuth) == false) navigate('/login')
        getWorkouts().then(res => setData(res.data))
    }, [loading])

    return (
        <div className = 'container'>
            <Navbar />
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
                                <button onClick = {() => {
                                    setLoading(true)
                                    deleteWorkout(workout._id).then(() => setLoading(false))
                                    }}>Delete Workout</button>
                                <button onClick = {() => navigate(`/edit/${workout._id}`)}>Edit Workout</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}