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
        <div className = 'container-fluid' id = 'userShow'>
            <Navbar />
            <h1>Your Workouts</h1>
            <div className = 'row justify-content-around' id = 'userContainer'>
                {
                    data.map((workout, i) => {
                        return (
                            <div key = {i} className = 'col-4 shExercises rounded'>
                                <h2>Routine</h2>
                                {
                                    workout.exercises.map((exercise, j) => {
                                        return (
                                            <div key = {j}>
                                                <h4 className = 'col-8'>Exercise: {exercise.name}</h4>
                                                <h4 className = 'col-8'>Reps: {exercise.reps}</h4>
                                                <h4 className = 'col-8'>Sets: {exercise.sets}</h4>
                                            </div>
                                        )
                                    })
                                }
                                <h4 className = 'col-8'>Calories: {workout.calories}</h4>
                                <div className = 'row justify-content-around'>
                                    <div>
                                        <button onClick = {() => {
                                        setLoading(true)
                                        deleteWorkout(workout._id).then(() => setLoading(false))
                                        }} className = 'btn btn-info'>Delete Workout</button>
                                    </div>
                                    <div>
                                        <button onClick = {() => navigate(`/edit/${workout._id}`)} className = 'btn btn-info'>Edit Workout</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}